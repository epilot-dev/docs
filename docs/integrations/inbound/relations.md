---
sidebar_position: 4
title: Relations
description: Link entities together during synchronization
---

# Entity Relations

Relations connect entities together in epilot. The ERP Toolkit supports creating and updating relations between entities during synchronization.

## Relation Basics

A relation links one entity to another. For example, linking a contract to its customer:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number"],
  "fields": [
    { "attribute": "contract_number", "field": "contractId" },
    {
      "attribute": "customer",
      "relation": {
        "entity_schema": "contact",
        "unique_ids": ["customer_number"],
        "source_field": "customerId"
      }
    }
  ]
}
```

## Relation Configuration

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `entity_schema` | string | The schema of the related entity |
| `unique_ids` | string[] | Fields to identify the related entity |
| `source_field` | string | Field in the payload containing the identifier value |

### Optional Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `operation` | string | `_set` | How to handle existing relations |
| `enabled` | string | - | Condition to process this relation |

## Relation Operations

### Set (`_set`)

Replaces all existing relations with the new one:

```json
{
  "attribute": "customer",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["customer_number"],
    "source_field": "customerId",
    "operation": "_set"
  }
}
```

### Append (`_append`)

Adds new unique relations to existing ones with automatic deduplication:

```json
{
  "attribute": "related_contracts",
  "relation": {
    "entity_schema": "contract",
    "unique_ids": ["contract_number"],
    "source_field": "relatedContractId",
    "operation": "_append"
  }
}
```

If a relation with the same `entity_id` already exists, it will not be added again.

### Append All (`_append_all`)

Adds all relations without deduplication (allows duplicates):

```json
{
  "attribute": "audit_contacts",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["customer_number"],
    "source_field": "auditContactId",
    "operation": "_append_all"
  }
}
```

Use `_append_all` when you explicitly need to allow duplicate relations.

## Nested Identifier Access

Access nested data for the relation identifier:

```json
{
  "attribute": "billing_account",
  "relation": {
    "entity_schema": "account",
    "unique_ids": ["account_number"],
    "source_field": "$.billing.accountId"
  }
}
```

## Multiple Relations

### Array of Relations

Link to multiple entities from an array in the payload:

```json
{
  "attribute": "meters",
  "relation": {
    "entity_schema": "meter",
    "unique_ids": ["meter_number"],
    "source_field": "meterIds"
  }
}
```

Given this input:

```json
{
  "meterIds": ["M001", "M002", "M003"]
}
```

Creates relations to all three meters.

### Multiple Relation Types

Link to different entity types:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number"],
  "fields": [
    { "attribute": "contract_number", "field": "contractId" },
    {
      "attribute": "customer",
      "relation": {
        "entity_schema": "contact",
        "unique_ids": ["customer_number"],
        "source_field": "customerId"
      }
    },
    {
      "attribute": "billing_account",
      "relation": {
        "entity_schema": "account",
        "unique_ids": ["account_number"],
        "source_field": "billingAccountId"
      }
    },
    {
      "attribute": "meters",
      "relation": {
        "entity_schema": "meter",
        "unique_ids": ["meter_number"],
        "source_field": "meterIds"
      }
    }
  ]
}
```

## Conditional Relations

Process relations only when conditions are met:

```json
{
  "attribute": "partner",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["partner_number"],
    "source_field": "partnerId",
    "enabled": "$exists(partnerId) and partnerId != ''"
  }
}
```

## Advanced Relations Configuration

### Relations with Items

For more control, use the `relations` property with `items` array:

```json
{
  "attribute": "billing_account",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "billing_account",
        "_tags": ["PRIMARY"],
        "unique_ids": [
          {
            "attribute": "external_id",
            "field": "accountId"
          }
        ]
      }
    ]
  }
}
```

Each item in `unique_ids` supports three value sources:

| Source | Example |
|--------|---------|
| `field` | `{ "attribute": "external_id", "field": "accountId" }` |
| `jsonataExpression` | `{ "attribute": "full_name", "jsonataExpression": "firstName & ' ' & lastName" }` |
| `constant` | `{ "attribute": "source", "constant": "ERP" }` |

### Dynamic Relations with JSONata

Generate relation items dynamically from array data:

```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_set",
    "jsonataExpression": "persons.{ \"entity_schema\": \"contact\", \"unique_ids\": [{ \"attribute\": \"email\", \"constant\": email }], \"_tags\": [role] }"
  }
}
```

**Input:**
```json
{
  "persons": [
    { "email": "john@example.com", "role": "OWNER" },
    { "email": "jane@example.com", "role": "USER" }
  ]
}
```

This creates relations to both contacts with their respective role tags.

### Relation References

Relation references (`$relation_ref`) link to a specific item within a repeatable attribute on a related entity, such as a specific address:

```json
{
  "attribute": "billing_address",
  "relation_refs": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "unique_ids": [
          {
            "attribute": "customer_number",
            "field": "CustomerNumber"
          }
        ],
        "path": "address",
        "value": {
          "attribute": "address",
          "operation": "_append",
          "jsonataExpression": "{ \"street\": BillingStreet, \"city\": BillingCity, \"country\": 'DE', \"postal_code\": BillingPostalCode }"
        }
      }
    ]
  }
}
```

**Processing flow:**
1. Find or create the contact by `customer_number`
2. Append the address to the contact's address attribute
3. Create a `$relation_ref` linking to that specific address item

The system automatically preserves `_id` values when updating repeatable attributes to maintain stable references.

## Relation Resolution Strategy

The ERP Toolkit uses an **all-or-nothing** strategy for relations:

1. All relations in a mapping are resolved before any entity updates
2. If any relation cannot be found, the entire update fails
3. This ensures data consistency

### Resolution Flow

```
Parse Relation Config
        │
        ▼
Extract Identifier Value
        │
        ▼
Search for Related Entity
        │
        ├─── Found ──────▶ Store Entity ID
        │
        └─── Not Found ──▶ Fail Entire Update
```

## Creating Missing Related Entities

Use `post_actions` to create related entities if they don't exist:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number"],
  "fields": [
    { "attribute": "contract_number", "field": "contractId" },
    {
      "attribute": "customer",
      "relation": {
        "entity_schema": "contact",
        "unique_ids": ["customer_number"],
        "source_field": "customerId"
      }
    }
  ],
  "post_actions": {
    "create_missing_relations": true
  }
}
```

With this configuration, if the related contact doesn't exist, it will be created with the identifier value.

## Relation Attribute Types

Relations in epilot are stored with metadata. You can specify the relation type:

```json
{
  "attribute": "customer",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["customer_number"],
    "source_field": "customerId",
    "relation_type": "primary_contact"
  }
}
```

## Error Handling

### Related Entity Not Found

```json
{
  "status": "error",
  "message": "Related entity not found",
  "error": {
    "code": "RELATION_NOT_FOUND",
    "details": {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "identifier_value": "C001"
    }
  }
}
```

**Resolution Options:**

1. Ensure the related entity exists before processing
2. Enable `create_missing_relations` in post_actions
3. Make the relation conditional with `enabled`

### Multiple Matches for Relation

```json
{
  "status": "error",
  "message": "Multiple entities found for relation",
  "error": {
    "code": "AMBIGUOUS_RELATION"
  }
}
```

**Resolution:** Use more specific unique identifiers or clean up duplicate data.

## Best Practices

### Order Your Entity Processing

Process parent entities before children:

```json
{
  "entities": [
    {
      "entity_schema": "contact",  // Process first
      "unique_ids": ["customer_number"],
      "fields": [...]
    },
    {
      "entity_schema": "contract",  // Process second, can now reference contact
      "unique_ids": ["contract_number"],
      "fields": [
        {
          "attribute": "customer",
          "relation": {
            "entity_schema": "contact",
            "unique_ids": ["customer_number"],
            "source_field": "customerId"
          }
        }
      ]
    }
  ]
}
```

### Use Conditional Relations

Avoid failures from missing optional relations:

```json
{
  "attribute": "secondary_contact",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["customer_number"],
    "source_field": "secondaryCustomerId",
    "enabled": "$exists(secondaryCustomerId)"
  }
}
```

### Validate Data Before Processing

Pre-validate relation data with JSONata:

```json
{
  "attribute": "customer",
  "relation": {
    "entity_schema": "contact",
    "unique_ids": ["customer_number"],
    "source_field": "customerId",
    "enabled": "$type(customerId) = 'string' and $length(customerId) > 0"
  }
}
```

## Next Steps

- [Meter Readings](./meter-readings) - Handle meter reading data
- [Examples](./examples) - Complete integration examples
