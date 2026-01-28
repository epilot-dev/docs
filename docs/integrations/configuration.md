---
sidebar_position: 3
title: Configuration
description: Configure integrations and use cases
---

# Configuration

This guide covers how to configure integrations, use cases, and manage your ERP Toolkit setup.

## Integration Management

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
      "mapping_version": "v2.0",
      "entities": [...]
    }
  }'
```

### Use Case Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name for the use case |
| `type` | string | Yes | Either `inbound` or `outbound` |
| `enabled` | boolean | Yes | Whether the use case is active |
| `configuration` | object | Yes | Mapping configuration |

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
  "mapping_version": "v2.0",
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
      "object_type": "string",
      "timestamp": "ISO 8601 datetime",
      "format": "json | xml",
      "payload": "string (JSON or XML)",
      "deduplication_id": "string (optional)"
    }
  ]
}
```

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

## Environment Variables

When self-hosting or developing locally:

| Variable | Description |
|----------|-------------|
| `STAGE` | Deployment stage (dev, staging, prod) |
| `LOG_LEVEL` | Logging verbosity (DEBUG, INFO, WARN, ERROR) |
| `DYNAMODB_TABLE` | DynamoDB table for tracking |
| `INTEGRATIONS_TABLE` | DynamoDB table for integrations |
| `ERP_UPDATES_QUEUE_URL` | SQS queue URL for events |

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

- Each organization's data is isolated
- Integration IDs are scoped to organizations
- Cross-organization access is not permitted

### Permissions

Required permissions for API access:

| Action | Permission |
|--------|------------|
| Read integrations | `erp:read` |
| Create/Update integrations | `erp:write` |
| Send events | `erp:events` |
| View monitoring | `erp:monitoring` |
