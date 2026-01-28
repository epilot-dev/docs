---
sidebar_position: 1
title: Getting Started
description: Set up your first inbound ERP integration with epilot
---

# Getting Started with Inbound Integration

This guide walks you through setting up an inbound integration to synchronize data from your ERP system into epilot.

## Prerequisites

- Access to the epilot platform with admin permissions
- API credentials for your organization
- Basic understanding of REST APIs and JSON

## Step 1: Create an Integration

Create a new integration to represent your ERP connection:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/integrations' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "SAP Integration",
    "description": "Customer and contract synchronization from SAP"
  }'
```

**Response:**

```json
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

Save the `id` - you'll need it for subsequent API calls.

## Step 2: Create a Use Case

A use case defines how specific data types are mapped and synchronized. Create an inbound use case for customer data:

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v1/integrations/{integrationId}/use-cases' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Customer Sync",
    "type": "inbound",
    "enabled": true,
    "configuration": {
      "mapping_version": "v2.0",
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

```bash
curl -X POST 'https://erp-integration.sls.epilot.io/v2/erp/updates/events' \
  -H 'Authorization: Bearer <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "meta": {
      "correlation_id": "<uuidv4()>"
    },
    "events": [
      {
        "event_type": "UPDATE",
        "object_type": "customer",
        "timestamp": "2024-01-15T10:35:00Z",
        "format": "json",
        "payload": "{\"customerId\":\"C001\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\"}",
        "deduplication_id": "customer-C001-update-1"
      }
    ]
  }'
```

**Response:**

```json
{
  "results": [
    {
      "event_id": "evt_abc123",
      "status": "success",
      "message": "Event queued for processing"
    }
  ]
}
```

## Processing Flow

When you send events, they flow through the following pipeline:

![Processing Flow](/img/integrations/toolkit-processing.svg)

## Next Steps

- [Entity Mapping](./mapping) - Learn about field mappings and transformations
- [Unique Identifiers](./unique-identifiers) - Configure entity lookup strategies
- [Relations](./relations) - Link entities together
- [Examples](./examples) - See complete integration examples
