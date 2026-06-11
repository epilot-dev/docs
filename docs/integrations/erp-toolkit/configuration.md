---
sidebar_position: 3
title: Configuration
description: Configure integrations and use cases
---

# Configuration

This guide covers how to configure integrations, use cases, and manage your ERP Toolkit setup.

## Integration Management

### Integration Types

Integrations support two types:

| Type | Description |
|------|-------------|
| `erp` (default) | Standard ERP integration with inbound/outbound use cases |
| `connector` | Complex proxy integration with external APIs using managed calls |

### Creating an Integration

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/integrations' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "SAP Integration",
    "description": "Main ERP integration for customer and contract data"
  }'
```

**Creating a Connector Integration:**

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/integrations' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Partner API Connector",
    "description": "Connector for partner API calls",
    "integration_type": "connector",
    "connector_config": {
      "base_url": "https://api.partner.com",
      "auth": {
        "type": "oauth2_client_credentials",
        "token_url": "{{env.PARTNER_TOKEN_URL}}",
        "client_id": "{{env.PARTNER_CLIENT_ID}}",
        "client_secret": "{{env.PARTNER_CLIENT_SECRET}}",
        "scope": "api:read api:write"
      }
    }
  }'
```

### Integration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name |
| `description` | string | No | Human-readable description |
| `integration_type` | string | No | `erp` (default) or `connector` |
| `connector_config` | object | No | Shared config for connector-type integrations (base URL, auth) |
| `protected` | boolean | No | When `true`, prevents deletion and restricts modifications to admin users |

### Listing Integrations

```bash
curl -X GET 'https://erp-integration.sls.epilot.io/v2/integrations' \
  -H 'Authorization: Bearer <token>'
```

### Updating an Integration

```bash
curl -X PUT 'https://erp-integration.sls.epilot.io/v2/integrations/{integrationId}' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "SAP Production Integration",
    "description": "Updated description"
  }'
```

### Deleting an Integration

:::warning
Deleting an integration also removes all associated use cases.
:::

```bash
curl -X DELETE 'https://erp-integration.sls.epilot.io/v2/integrations/{integrationId}' \
  -H 'Authorization: Bearer <token>'
```

## Use Case Configuration

### Creating a Use Case

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer Sync",
    "type": "inbound",
    "enabled": true,
    "configuration": {
      "entities": [...]
    }
  }'
```

### Use Case Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name for the use case |
| `type` | string | Yes | `inbound`, `outbound`, `file_proxy`, `managed_call`, or `secure_proxy` |
| `enabled` | boolean | Yes | Whether the use case is active |
| `configuration` | object | Yes | Type-specific configuration (see sections below) |

:::info
- `file_proxy` — On-demand file serving from external document systems. See the [File Proxy guide](./file-proxy).
- `managed_call` — Synchronous external API calls with JSONata mapping. See [Managed Call Use Cases](#managed-call-use-cases).
- `secure_proxy` — Route requests through epilot's secure proxy for static IP or VPN access. See [Secure Proxy Use Cases](#secure-proxy-use-cases).
:::

### Enabling/Disabling a Use Case

```bash
curl -X PUT 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases/{useCaseId}' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "enabled": false
  }'
```

### Use Case History

View the change history for a use case:

```bash
curl -X GET 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases/{useCaseId}/history' \
  -H 'Authorization: Bearer <token>'
```

### Outbound Use Case Configuration

Outbound use cases deliver standardized epilot events (event-catalog events) to your external system. The configuration consists of an `event_catalog_event` and one or more `mappings`:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Contract Sync",
    "type": "outbound",
    "enabled": true,
    "configuration": {
      "event_catalog_event": "contract.updated",
      "mappings": [
        {
          "id": "b8f1c9a0-58dd-4f7a-9a3e-000000000001",
          "name": "ERP Contract Sync",
          "enabled": true,
          "jsonata_expression": "{ \"id\": entity._id, \"customer\": entity.customer_name }",
          "delivery": {
            "type": "webhook",
            "webhook_id": "wh-123"
          }
        }
      ]
    }
  }'
```

#### Mapping Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Unique identifier for the mapping |
| `name` | string | Yes | Display name for the mapping |
| `enabled` | boolean | Yes | Whether this mapping is active |
| `jsonata_expression` | string | For `webhook` delivery | JSONata expression to transform the event payload. Required for `webhook` delivery; ignored for `poll` delivery |
| `delivery` | object | Yes | How the event is delivered — discriminated on `type`: `webhook` or `poll` |

#### Delivery Types

**Webhook delivery (push):** the event payload is transformed with the mapping's `jsonata_expression` and pushed to a pre-configured webhook (epilot Webhooks):

```json
"delivery": {
  "type": "webhook",
  "webhook_id": "wh-123"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `webhook_id` | string | Yes | Reference to the webhook configuration in epilot Webhooks |
| `webhook_name` | string | No | Cached webhook name for display purposes |

**Poll delivery (pull):** for ERPs that cannot expose an inbound HTTP endpoint (firewalled, on-prem, batch systems). Items are placed on a pull-based queue that your system fetches. Poll items carry the **raw standardized event payload** — no JSONata transform is applied:

```jsonc
// DeliveryConfig — poll variant
"delivery": {
  "type": "poll",                    // discriminator: 'webhook' | 'poll'
  "retention_days": 30,              // optional; default 30, min 1, max 90
  "poison_policy": "dead_letter",    // 'dead_letter' (default) | 'block'
  "max_delivery_attempts": 5         // delivery attempts before poison_policy applies
}
```

| Property | Type | Required | Default | Bounds | Description |
|----------|------|----------|---------|--------|-------------|
| `retention_days` | integer | No | `30` | min 1, max 90 | How long undelivered queue items are retained before expiry |
| `poison_policy` | string | No | `"dead_letter"` | `dead_letter` \| `block` | What happens when an item exhausts `max_delivery_attempts`: `dead_letter` routes the item to the dead-letter queue; `block` halts the queue until action is taken |
| `max_delivery_attempts` | integer | No | `5` | min 1, max 100 | Maximum delivery attempts before the `poison_policy` is applied |

:::info
- At most **one** poll mapping is allowed per use case. Webhook mappings may coexist alongside the poll mapping — push and poll for the same event is allowed.
- A `poll` delivery must not carry webhook fields (`webhook_id`, `webhook_name`), and a `webhook` delivery must not carry poll fields (`retention_days`, `poison_policy`, `max_delivery_attempts`).
- The polling/acknowledgement API for consuming queued items is documented separately when available.
:::

#### Retention Semantics

- Changing `retention_days` affects **new items only** — already-enqueued items keep the TTL computed at enqueue time (existing retention windows are not migrated).
- An expired item is never delivered: the poll API filters expired items even before the storage layer reaps them, and each expiry of an **unconsumed** item emits an `MSG_EXPIRED_UNPOLLED` monitoring error so silent data loss is always visible.
- Dead-lettered items get a **re-armed retention window** at dead-letter time (a full `retention_days` from that moment), giving operators the whole window to redrive instead of whatever sliver remained.

#### Poll-Mode Monitoring Codes

Poll-queue message lifecycle events flow through the standard V2 monitoring pipeline (monitoring dashboards, stats endpoint) with these codes:

| Code | Level | Emitted when |
|------|-------|--------------|
| `MSG_ENQUEUED` | info | A new queue item is enqueued for a poll-mode use case (duplicates emit nothing) |
| `MSG_ACKED` | success | A polled message is acknowledged (one event per accepted message id) |
| `MSG_EXPIRED_UNPOLLED` | error | An item's retention window elapsed without it ever being consumed — the offline-consumer loss signal |
| `MSG_DEAD_LETTERED` | error | An item exhausted `max_delivery_attempts` under the `dead_letter` policy, or an operator skipped a blocked head (includes `delivery_attempts` in the event detail) |
| `MSG_HEAD_BLOCKED` | error | The stream halted on a poisoned head under the `block` policy — emitted **once per blocked episode**, not on every poll (includes `delivery_attempts` in the event detail) |

#### Dead-Letter Queue and Operator Actions

Operator endpoints (all require the `integration:manage` grant — consumer tokens with only `integration:consume` receive 403):

| Endpoint | Action |
|----------|--------|
| `GET /v1/integrations/{integrationId}/outbound/messages/dlq` | List dead-lettered messages (paginated; delivery metadata only, payloads are not included) |
| `POST /v1/integrations/{integrationId}/outbound/messages/dlq/redrive` | Redrive selected messages back into the live stream |
| `POST /v1/integrations/{integrationId}/outbound/messages/unblock` | Skip (dead-letter) the current blocked head under the `block` policy, with an optional `reason` |

:::caution Redrive ordering
A redriven message is re-enqueued at the **tail** with a new id and sequence — it is delivered out of its original per-entity order (the stream has moved on). This is inherent to redrive and matches SQS DLQ semantics.
:::

Notes:

- **Skip equals dead-letter:** unblocking a halted stream dead-letters the blocked head (recording the supplied `reason`) and emits `MSG_DEAD_LETTERED` — the message then becomes redrivable from the DLQ like any other dead-lettered item. A late acknowledgement from the consumer also unblocks the stream naturally.
- **Queue health in `outbound-status`:** for poll-mode use cases, `GET /v1/integrations/{integrationId}/outbound-status` reports a `poll` health object — queue depth, oldest unconsumed item age, last poll/ack timestamps, a blocked-stream flag, and the DLQ count — plus poll-specific conflicts (`stream_blocked`, `dlq_items_present`). Webhook use cases keep their existing status shape unchanged.

## Mapping Configuration Schema

### Version 2.0 Structure

```json
{
  "entities": [
    {
      "entity_schema": "string",
      "unique_ids": ["string"],
      "enabled": "boolean | string",
      "mode": "upsert | delete | purge | upsert-prune-scope-purge | upsert-prune-scope-delete",
      "scope": {},
      "jsonataExpression": "string",
      "fields": [
        {
          "attribute": "string",
          "field": "string",
          "jsonataExpression": "string",
          "constant": "any",
          "_type": "email | phone",
          "enabled": "boolean | string",
          "relations": {
            "operation": "_set | _append | _append_all",
            "items": [
              {
                "entity_schema": "string",
                "_tags": ["string"],
                "unique_ids": [
                  {
                    "attribute": "string",
                    "field": "string"
                  }
                ]
              }
            ],
            "jsonataExpression": "string"
          },
          "relation_refs": {
            "operation": "_set | _append | _append_all",
            "items": [
              {
                "entity_schema": "string",
                "unique_ids": [{ "attribute": "string", "field": "string" }],
                "path": "string",
                "value": {
                  "attribute": "string",
                  "operation": "_set | _append",
                  "field": "string",
                  "jsonataExpression": "string",
                  "constant": "any"
                }
              }
            ]
          }
        }
      ],
      "pricing": {
        "jsonataExpression": "string",
        "items": [],
        "items_jsonata": "string",
        "result_mapping": {},
        "on_error": "fail | skip | warn"
      }
    }
  ],
  "meter_readings": [
    {
      "jsonataExpression": "string",
      "mode": "upsert | delete | upsert-prune-scope",
      "reading_matching": "external_id | strict-date",
      "scope": { "source": "string" },
      "meter": {
        "unique_ids": [
          {
            "attribute": "string",
            "field": "string"
          }
        ]
      },
      "meter_counter": {
        "unique_ids": [
          {
            "attribute": "string",
            "field": "string"
          }
        ]
      },
      "fields": []
    }
  ]
}
```

## Managed Call Use Cases

Managed call use cases define synchronous API operations against external partner systems. They are typically used with `connector`-type integrations.

### Creating a Managed Call Use Case

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Get Customer",
    "slug": "get-customer",
    "type": "managed_call",
    "enabled": true,
    "configuration": {
      "operation": {
        "method": "GET",
        "path": "/v1/customers/{{customer_id}}",
        "headers": {
          "Accept": "application/json"
        }
      },
      "response_mapping": "{ \"name\": data.full_name, \"email\": data.contact.email }",
      "inbound_use_case_slug": "sync-customer"
    }
  }'
```

### Executing a Managed Call

Managed calls are executed via the `/v1/managed-call/{slug}/execute` endpoint, where the slug acts as the RPC method name:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/managed-call/get-customer/execute' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "payload": {
      "customer_id": "C001"
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "inbound_queued": true,
  "inbound_event_id": "evt-abc-123"
}
```

### Managed Call Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `operation.method` | Yes | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE` |
| `operation.path` | Yes | URL path template with `{{variable}}` interpolation, appended to the connector's `base_url` |
| `operation.headers` | No | Additional request headers |
| `operation.query_params` | No | Query parameters |
| `request_mapping` | No | JSONata expression to transform the request body before sending |
| `response_mapping` | No | JSONata expression to transform the response before returning |
| `inbound_use_case_slug` | No | Slug of an inbound use case to route the response to for async entity processing |

### Connector Authentication

Authentication is configured at the integration level via `connector_config.auth` and applied automatically to all managed call requests:

| Auth Type | Fields |
|-----------|--------|
| `oauth2_client_credentials` | `token_url`, `client_id`, `client_secret`, `scope`, `audience`, `resource`, `body_params`, `headers`, `query_params` |
| `api_key` | `api_key_header` (default: `X-API-Key`), `api_key` |
| `bearer` | `token` |

Secrets must use `{{env.KEY}}` references to resolve values from the [Environments API](/docs/integrations/webhooks/environments-secrets).

## Secure Proxy Use Cases

Secure proxy use cases route HTTP requests through epilot's dedicated proxy infrastructure, providing either a static IP for egress or VPN access to customer private networks.

### Creating a Secure Proxy Use Case

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Partner API Proxy",
    "slug": "partner-api",
    "type": "secure_proxy",
    "enabled": true,
    "configuration": {
      "vpc_mode": "secure_link"
    }
  }'
```

### Secure Proxy Configuration Fields

| Field | Required | Mutable | Description |
|-------|----------|---------|-------------|
| `vpc_mode` | Yes | No (immutable) | `"static_ip"` (fixed outbound IP) or `"secure_link"` (VPN for private networks) |
| `allowed_domains` | No | Read-only | Array of allowed domain patterns. Supports exact match and wildcard prefix (e.g., `*.example.com`). Managed by epilot support. |
| `allowed_ips` | No | Read-only | Array of allowed IP ranges in CIDR notation (e.g., `10.0.1.0/24`). Required for `secure_link` mode. Managed by epilot support. |

### Sending a Proxy Request

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/secure-proxy' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "use_case_slug": "partner-api",
    "url": "https://api.partner.com/v1/data",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer external-token"
    }
  }'
```

### Domain Whitelist and IP Allowlist

- **Domain whitelist**: Controls which hostnames the proxy can reach. Wildcard patterns must have at least 2 suffix labels (e.g., `*.example.com` is valid, `*.com` is rejected).
- **IP allowlist**: Controls which IP addresses are permitted in `secure_link` mode using CIDR notation. Validation is applied both at the URL level (direct IP targets) and DNS level (resolved IPs must match).
- Both fields are read-only in the API. To add, remove, or change allowed domains or IP ranges, contact epilot support.

### Security

| Concern | Static IP mode | Secure Link mode |
|---------|---------------|-----------------|
| SSRF protection | Full (private IPs blocked) | Protocol + localhost only (private IPs allowed for VPN) |
| Domain whitelist | Optional | Required |
| IP allowlist | N/A | Required |
| Request size limit | 4 MB | 4 MB |
| Timeout | 30s | 30s |

## Event Configuration

### Event Message Structure

```json
{
  "integration_id": "uuid",
  "meta": {
    "correlation_id": "string"
  },
  "events": [
    {
      "event_type": "CREATE | UPDATE | DELETE",
      "use_case_slug": "string (recommended, 1-255 chars, pattern: ^[a-z0-9][a-z0-9_-]*$, required if event_name is not provided)",
      "event_name": "string (legacy fallback, required if use_case_slug is not provided)",
      "timestamp": "ISO 8601 datetime",
      "format": "json | xml",
      "payload": "string (JSON or XML)",
      "deduplication_id": "string (optional)"
    }
  ]
}
```

For each event, include `use_case_slug` whenever possible. `event_name` is supported as a legacy fallback, and `use_case_slug` takes precedence if both are present.

`use_case_slug` format: `^[a-z0-9][a-z0-9_-]*$` with length `1..255` (must start with a lowercase letter or digit; then lowercase letters, digits, `_`, `-`).

### Event Types

| Type | Description |
|------|-------------|
| `CREATE` | Create a new entity (fails if exists) |
| `UPDATE` | Update existing or create new entity |
| `DELETE` | Mark entity as deleted |

### Payload Formats

**JSON Format:**

```json
{
  "event_type": "UPDATE",
  "format": "json",
  "payload": "{\"customerId\":\"C001\",\"name\":\"John Doe\"}"
}
```

**XML Format:**

```json
{
  "event_type": "UPDATE",
  "format": "xml",
  "payload": "<customer><id>C001</id><name>John Doe</name></customer>"
}
```

## Deduplication

### Deduplication ID

Prevent duplicate processing by including a unique deduplication ID:

```json
{
  "events": [
    {
      "event_type": "UPDATE",
      "deduplication_id": "customer-C001-update-20240115-001",
      "payload": "..."
    }
  ]
}
```

### Deduplication Window

- Events are deduplicated within a **24-hour window**
- Same deduplication ID within 24 hours = skipped
- After 24 hours, the same ID can be processed again

### Best Practices

```
# Good - includes version or timestamp
customer-C001-update-v3
customer-C001-update-20240115T103000

# Bad - no version control, may skip legitimate updates
customer-C001
```

## Correlation Tracking

### Correlation ID

Include a correlation ID to track related events:

```json
{
  "meta": {
    "correlation_id": "<uuidv4()>"
  },
  "events": [...]
}
```

### Using Correlation IDs

- Group related events for debugging
- Filter monitoring data by batch
- Trace event processing through the pipeline

## Monitoring Configuration

### Query Events

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/monitoring/events' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "from": "2024-01-15T00:00:00Z",
    "to": "2024-01-15T23:59:59Z",
    "status": ["error"],
    "limit": 100
  }'
```

### Query Statistics

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/monitoring/stats' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "from": "2024-01-01T00:00:00Z",
    "to": "2024-01-31T23:59:59Z"
  }'
```

### Event Replay

Reprocess failed or specific events:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/events/replay' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "event_ids": ["evt-001", "evt-002", "evt-003"]
  }'
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Event submission | 100 events per request |
| API requests | 1000 requests per minute per organization |

## Security

### Authentication

All API requests require a valid Bearer token:

```bash
curl -H 'Authorization: Bearer <your-token>' ...
```

### Organization Isolation

Each organization's data is fully isolated. Integration IDs are scoped to organizations, and cross-organization access is not permitted.

### Permissions

| Action | Permission |
|--------|------------|
| Read integrations | `erp:read` |
| Create/Update integrations | `erp:write` |
| Send events | `erp:events` |
| View monitoring | `erp:monitoring` |
