---
sidebar_position: 4
title: Relations
description: Link entities together during synchronization
---

# Entity Relations

Relations connect entities in epilot. The ERP Toolkit creates and updates relations between entities during synchronization.

## Relation Basics

A relation links one entity to another. For example, linking a contract to its billing account:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number"],
  "fields": [
    { "attribute": "contract_number", "field": "contractId" },
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
  ]
}
```

**Input:**
```json
{
  "contractId": "CTR-001",
  "accountId": "ACC-999"
}
```

**Final Entity State:**
```json
{
  "entity_slug": "contract",
  "attributes": {
    "billing_account": {
      "$relation": [{
        "entity_id": "019a0c06-7190-7509-91c4-ff5bbe3680d8",
        "_schema": "billing_account",
        "_tags": ["PRIMARY"]
      }]
    }
  }
}
```

## Relation Configuration

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `entity_schema` | string | The schema of the related entity |
| `unique_ids` | object[] | Fields to identify the related entity (see [Unique ID Options](#relation-unique-id-options)) |

### Optional Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `operation` | string | `_set` | How to handle existing relations (`_set`, `_append`, `_append_all`) |
| `_tags` | string[] | - | Labels for the relation (e.g. `["PRIMARY"]`, `["BILLING"]`) |

## Relation Operations

### Set (`_set`)

Replaces all existing relations with the new ones. This is the default operation.

```json
{
  "attribute": "billing_account",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "billing_account",
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

**Use cases:**
- Setting the initial relation when creating an entity
- Completely replacing a relation (e.g., changing primary contact)
- When the ERP system provides the complete, authoritative list of relations

### Append (`_append`)

Adds new unique relations to existing ones with automatic deduplication by `entity_id`:

```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_append",
    "items": [
      {
        "entity_schema": "contact",
        "_tags": ["NEW_CONTACT"],
        "unique_ids": [
          {
            "attribute": "email",
            "field": "contactEmail"
          }
        ]
      }
    ]
  }
}
```

**Example scenario:**
```
Initial entity state:
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] }
    ]
  }
}

After applying _append with entity_id "existing-1" and "new-1":
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] },
      { "entity_id": "new-1", "_schema": "contact", "_tags": ["NEW_CONTACT"] }
    ]
  }
}
```

If a relation with the same `entity_id` already exists, it will not be added again.

**Important notes:**
- `_append` requires an additional database lookup to fetch the existing entity
- Preserves the order of existing items

### Append All (`_append_all`)

Adds all relations without deduplication (allows duplicates):

```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_append_all",
    "items": [
      {
        "entity_schema": "contact",
        "_tags": ["NEW_CONTACT"],
        "unique_ids": [
          {
            "attribute": "customer_number",
            "field": "auditContactId"
          }
        ]
      }
    ]
  }
}
```

**Example scenario:**
```
Initial entity state:
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] }
    ]
  }
}

After applying _append_all with entity_id "existing-1" and "new-1":
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] },
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["DUPLICATE"] },
      { "entity_id": "new-1", "_schema": "contact", "_tags": ["NEW_CONTACT"] }
    ]
  }
}
```

Use `_append_all` when you explicitly need to allow duplicate relations. Use `_append` instead if you want to prevent duplicates.

## Relation Unique ID Options

Each item in `unique_ids` supports three value sources:

| Source | Example |
|--------|---------|
| `field` | `{ "attribute": "external_id", "field": "accountId" }` |
| `jsonataExpression` | `{ "attribute": "full_name", "jsonataExpression": "firstName & ' ' & lastName" }` |
| `constant` | `{ "attribute": "source", "constant": "ERP" }` |

### JSONata for Nested Identifier Access

Use a JSONata expression to access nested data for the relation identifier:

```json
{
  "attribute": "billing_account",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "account",
        "unique_ids": [
          {
            "attribute": "account_number",
            "jsonataExpression": "billing.accountId"
          }
        ]
      }
    ]
  }
}
```

## Multiple Relations

Link multiple entities in a single relation attribute using multiple `items`:

**Configuration:**
```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "_tags": ["BILLING"],
        "unique_ids": [
          {
            "attribute": "email",
            "field": "billingEmail"
          }
        ]
      },
      {
        "entity_schema": "contact",
        "_tags": ["TECHNICAL"],
        "unique_ids": [
          {
            "attribute": "email",
            "field": "technicalEmail"
          }
        ]
      }
    ]
  }
}
```

**Input:**
```json
{
  "billingEmail": "billing@example.com",
  "technicalEmail": "tech@example.com"
}
```

**Final Entity State:**
```json
{
  "contacts": {
    "$relation": [
      {
        "entity_id": "019a0c06-1111-1111-1111-aaaaaaaaaaaa",
        "_schema": "contact",
        "_tags": ["BILLING"]
      },
      {
        "entity_id": "019a0c06-2222-2222-2222-bbbbbbbbbbbb",
        "_schema": "contact",
        "_tags": ["TECHNICAL"]
      }
    ]
  }
}
```

## Conditional Relations

Process relations only when conditions are met using the field-level `enabled` property:

```json
{
  "attribute": "billing_account",
  "enabled": "$exists(billingAccountId) and billingAccountId != ''",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "billing_account",
        "unique_ids": [
          {
            "attribute": "external_id",
            "field": "billingAccountId"
          }
        ]
      }
    ]
  }
}
```

The `enabled` property is set on the field mapping, not inside the relation configuration. It supports:
- **Boolean** (`true`/`false`): Directly control whether the relation is processed
- **String (JSONata expression)**: Dynamic evaluation based on the input data

## Dynamic Relations with JSONata

Generate relation items dynamically from array data:

```json
{
  "attribute": "related_persons",
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

**Final Entity State:**
```json
{
  "related_persons": {
    "$relation": [
      {
        "entity_id": "019a0c06-3333-3333-3333-cccccccccccc",
        "_schema": "contact",
        "_tags": ["OWNER"]
      },
      {
        "entity_id": "019a0c06-4444-4444-4444-dddddddddddd",
        "_schema": "contact",
        "_tags": ["USER"]
      }
    ]
  }
}
```

## Relation References

Relation references (`$relation_ref`) link to a specific item within a repeatable attribute on a related entity, such as a specific address.

While `$relation` links to an entity, `$relation_ref` links to:
1. A related entity (by its `entity_id`)
2. A specific attribute path on that entity (e.g., `"address"`)
3. Optionally, a specific item within a repeatable attribute (by its `_id`)

### Configuration

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
          "jsonataExpression": "{ \"street\": BillingStreet, \"city\": BillingCity, \"country\": 'DE', \"postal_code\": BillingPostalCode, \"street_number\": $string(BillingStreetNumber) }"
        }
      }
    ]
  }
}
```

### Processing Flow

1. **Find or create the related entity**: Uses `unique_ids` to find/create the contact
2. **Set the attribute value**: Upserts the `address` attribute on the contact with the provided value
3. **Preserve `_id` values**: Automatically matches existing address items by their content and preserves their `_id` to avoid regeneration
4. **Create the reference**: Links the main entity to the specific address item using `$relation_ref`

### Example: Billing Address Reference

**Input:**
```json
{
  "InvoiceNumber": "INV-001",
  "CustomerNumber": "CUST-123",
  "BillingStreet": "Main Street",
  "BillingStreetNumber": 42,
  "BillingCity": "Berlin",
  "BillingPostalCode": "10115"
}
```

**Result on the contact:**
```json
{
  "customer_number": "CUST-123",
  "address": [
    {
      "_id": "abc123",
      "street": "Main Street",
      "street_number": "42",
      "city": "Berlin",
      "postal_code": "10115",
      "country": "DE"
    }
  ]
}
```

**Result on the opportunity:**
```json
{
  "invoice_number": "INV-001",
  "billing_address": {
    "$relation_ref": [
      {
        "entity_id": "019a0c06-1234-5678-9abc-def012345678",
        "path": "address",
        "_id": "abc123"
      }
    ]
  }
}
```

### `_id` Preservation

The system automatically preserves `_id` values when updating repeatable attributes:

- When setting or appending values, the system fetches the existing entity
- It matches new items with existing items using deep equality (excluding `_id`)
- If a match is found, the existing `_id` is preserved
- This ensures stable references even when data is updated

### Relation Reference Operations

Relation references support the same three operations as relations:

- **`_set`**: Replaces all existing relation_refs with new ones
- **`_append`**: Adds new unique relation_refs (deduplicates by `entity_id` + `_id`)
- **`_append_all`**: Adds all relation_refs without deduplication

### Value Configuration

The `value` field in a relation_ref item supports the same value sources as regular field mappings:

| Source | Example |
|--------|---------|
| `field` | `{ "attribute": "address", "field": "AddressData" }` |
| `jsonataExpression` | `{ "attribute": "address", "jsonataExpression": "{ \"street\": street, \"city\": city }" }` |
| `constant` | `{ "attribute": "type", "constant": "BILLING" }` |

## Relation Resolution Strategy

The ERP Toolkit uses an **all-or-nothing** strategy:

1. If ANY related entity in a relation attribute cannot be found, the ENTIRE attribute is deferred to post_actions
2. Post_actions will create the missing entities first
3. Then the system retries the update with all entities available
4. This ensures data integrity and proper ordering of entity creation

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
        └─── Not Found ──▶ Defer to Post Actions
```

## Best Practices

### Order Your Entity Processing

Process parent entities before children:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "fields": [
        { "attribute": "customer_number", "field": "customerId" },
        { "attribute": "first_name", "field": "firstName" }
      ]
    },
    {
      "entity_schema": "contract",
      "unique_ids": ["contract_number"],
      "fields": [
        { "attribute": "contract_number", "field": "contractId" },
        {
          "attribute": "customer",
          "relations": {
            "operation": "_set",
            "items": [
              {
                "entity_schema": "contact",
                "unique_ids": [
                  {
                    "attribute": "customer_number",
                    "field": "customerId"
                  }
                ]
              }
            ]
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
  "enabled": "$exists(secondaryCustomerId) and secondaryCustomerId != ''",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "unique_ids": [
          {
            "attribute": "customer_number",
            "field": "secondaryCustomerId"
          }
        ]
      }
    ]
  }
}
```

## Next Steps

- [Pricing](./pricing) - Map ERP line items and calculate prices
- [Meter Readings](./meter-readings) - Handle meter reading data
- [Examples](./examples) - Complete integration examples
