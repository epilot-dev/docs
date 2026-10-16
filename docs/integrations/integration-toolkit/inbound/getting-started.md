---
sidebar_position: 1
title: Getting Started
description: Set up your first inbound ERP integration with epilot
---

# Getting Started with Inbound Integration

This guide walks you through setting up an inbound integration to synchronize data from your ERP system into epilot.

## Prerequisites

- Access to the epilot platform with admin permissions
- API credentials for your organization, with the `integration:ingest` grant on the integration you push to
- Basic understanding of REST APIs and JSON

## Step 1: Create an Integration

Create a new integration to represent your ERP connection:

```bash title="Create an integration"
curl -X POST 'https://integration-toolkit.sls.epilot.io/v2/integrations' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "SAP Integration",
    "description": "Customer and contract synchronization from SAP"
  }'
```

**Response:**

```json title="Integration created"
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "orgId": "your-org-id",
  "name": "SAP Integration",
  "description": "Customer and contract synchronization from SAP",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "use_cases": []
}
```

Save the `id` — you'll need it for subsequent API calls.

## Step 2: Create a Use Case

A use case defines how specific data types are mapped and synchronized. Create an inbound use case for customer data. The
`slug` is required: it is the key you route events to this use case by in step 3.

```bash title="Create a use case"
curl -X POST 'https://integration-toolkit.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer Sync",
    "slug": "customer-sync",
    "type": "inbound",
    "enabled": true,
    "configuration": {
      "entities": [
        {
          "entity_schema": "contact",
          "unique_ids": ["customer_number"],
          "fields": [
            { "attribute": "customer_number", "field": "customerId" },
            { "attribute": "first_name", "field": "firstName" },
            { "attribute": "last_name", "field": "lastName" },
            { "attribute": "email", "field": "email", "_type": "email" }
          ]
        }
      ]
    }
  }'
```

## Step 3: Send Events

Push data from your ERP system using the events endpoint:

```bash title="Send an inbound event"
curl -X POST 'https://integration-toolkit.sls.epilot.io/v3/erp/updates/events' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "correlation_id": "<uuidv4()>",
    "events": [
      {
        "use_case_slug": "customer-sync",
        "timestamp": "2024-01-15T10:35:00Z",
        "format": "json",
        "payload": "{\"customerId\":\"C001\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\"}",
        "deduplication_id": "customer-C001-update-1"
      }
    ]
  }'
```

Use `use_case_slug` for event routing (recommended). `event_name` remains available for backward compatibility, and `use_case_slug` takes precedence when both are provided. Format: `^[a-z0-9][a-z0-9_-]*$` (1-255 chars; must start with lowercase letter or digit).

`correlation_id` is a request-level field and optional. v3 has no `event_type` and no `meta` object — they belong to
the deprecated v1 and v2 endpoints — and drops both without an error: a `meta.correlation_id` sent to v3 is lost, and
the response carries a generated id instead.

**Response:**

```json title="Event accepted"
{
  "correlation_id": "0f5c2a8e-3b7d-4e19-9a64-5d2c8b1e7f30",
  "results": [
    {
      "status": "success",
      "event_id": "0199c3f2-8a41-7d0e-b6c7-2f1a9d3e4b55"
    }
  ]
}
```

`correlation_id` echoes the id you sent, or the one epilot generated when you sent none. Each result carries the
`status` of the event (`success`, `skipped` for a duplicate, `ignored` or `error`, the last three with a
`message`) and its `event_id`.

## Processing Flow

Events flow through the following pipeline:

![Processing Flow](/img/integrations/toolkit-processing.svg)

Ingestion is asynchronous: the response means "accepted and queued", not "written". When an end
customer is waiting for the push to land — portal self-registration, adding a contract — send the
portal's correlation id and `interactive: true` with the request, and let the portal wait on it. See
[Interactive Registration](../interactive-registration.md).

## Next Steps

- [Entity Mapping](./mapping.md) - Learn about field mappings and transformations
- [Unique Identifiers](./unique-identifiers.md) - Configure entity lookup strategies
- [Relations](./relations.md) - Link entities together
- [Interactive Registration](../interactive-registration.md) - Push data an end customer is waiting for
- [Examples](./examples.md) - See complete integration examples
