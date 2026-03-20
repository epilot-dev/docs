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
- `secure_proxy` — Route requests through VPC Lambdas for static IP or VPN access. See [Secure Proxy Use Cases](#secure-proxy-use-cases).
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

## Mapping Configuration Schema

### Version 2.0 Structure

```json
{
  "entities": [
    {
      "entity_schema": "string",
      "unique_ids": ["string"],
      "enabled": "boolean | string",
      "jsonataExpression": "string",
      "fields": [
        {
          "attribute": "string",
          "field": "string",
          "jsonataExpression": "string",
          "constant": "any",
          "_type": "email | phone",
          "enabled": "string",
          "relation": {
            "entity_schema": "string",
            "unique_ids": ["string"],
            "source_field": "string",
            "operation": "_set | _append",
            "enabled": "string"
          }
        }
      ],
      "post_actions": {
        "create_missing_relations": "boolean"
      }
    }
  ],
  "meter_readings": [
    {
      "jsonataExpression": "string",
      "meter": {
        "unique_ids": ["string"]
      },
      "fields": [...]
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

Secure proxy use cases route HTTP requests through VPC-deployed Lambda functions for static IP egress or VPN access to customer private networks.

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
| `vpc_mode` | Yes | No (immutable) | `"static_ip"` (NAT Gateway for fixed outbound IP) or `"secure_link"` (VPN for private networks) |
| `allowed_domains` | No | Admin only | Array of allowed domain patterns. Supports exact match and wildcard prefix (e.g., `*.example.com`). Managed via admin script only. |
| `allowed_ips` | No | Admin only | Array of allowed IP ranges in CIDR notation (e.g., `10.0.1.0/24`). Required for `secure_link` mode. Managed via admin script only. |

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
- Both fields are read-only in the API and can only be managed via the admin script (`scripts/manage-secure-proxy-whitelist.ts`).

### Security

| Concern | Static IP mode | Secure Link mode |
|---------|---------------|-----------------|
| SSRF protection | Full (private IPs blocked) | Protocol + localhost only (private IPs allowed for VPN) |
| Domain whitelist | Optional | Required |
| IP allowlist | N/A | Required |
| Request size limit | 4 MB | 4 MB |
| Timeout | 25s (VPC Lambda) / 30s (API Gateway) | 25s (VPC Lambda) / 30s (API Gateway) |

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
