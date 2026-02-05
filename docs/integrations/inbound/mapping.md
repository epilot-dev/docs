---
sidebar_position: 2
title: Mapping
description: Configure how ERP data transforms into epilot entities
---

# Mapping

Mapping defines how data from your ERP system transforms into epilot entities. This page covers the mapping configuration structure and available options.

## Mapping Configuration

A mapping configuration consists of one or more entity definitions:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": true,
      "fields": [...]
    }
  ]
}
```

### Entity Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entity_schema` | string | Yes | The epilot entity schema (e.g., `contact`, `contract`, `meter`) |
| `unique_ids` | string[] | Yes | Fields used to find existing entities |
| `enabled` | boolean/string | No | Enable/disable this mapping |
| `mode` | string | No | Operation mode: `upsert` (default), `delete`, `purge`, `upsert-prune-scope-purge`, or `upsert-prune-scope-delete`. See [Operation Modes](#operation-modes) |
| `scope` | object | No | Required for prune-scope modes. Defines which entities to consider for pruning. See [Prune Scope Operations](#prune-scope-operations) |
| `jsonataExpression` | string | No | Pre-process the payload before field mapping |
| `fields` | array | Yes | Field mapping definitions |

## Field Mapping Types

### Direct Field Mapping

Map a source field directly to a target attribute:

```json
{
  "attribute": "first_name",
  "field": "firstName"
}
```

### Nested Field Access (JSONPath)

Access nested data using JSONPath syntax with `$` prefix:

```json
{
  "attribute": "street",
  "field": "$.address.street"
}
```

### JSONata Expressions

Use JSONata for complex transformations:

```json
{
  "attribute": "full_name",
  "jsonataExpression": "firstName & ' ' & lastName"
}
```

Common JSONata patterns:

```json
// Concatenation
"firstName & ' ' & lastName"

// Conditional
"$exists(middleName) ? firstName & ' ' & middleName & ' ' & lastName : firstName & ' ' & lastName"

// Date formatting
"$fromMillis($toMillis(dateField), '[Y]-[M01]-[D01]')"

// Array access
"addresses[0].street"

// Filtering
"items[status = 'active']"
```

### Constant Values

Set a fixed value:

```json
{
  "attribute": "source",
  "constant": "SAP"
}
```

### Enabled Field

Use the `enabled` property to conditionally map fields:

```json
{
  "attribute": "phone",
  "field": "phoneNumber",
  "enabled": "$exists(phoneNumber) and phoneNumber != ''"
}
```

## Repeatable Fields

Email and phone fields in epilot are stored as arrays. Use the `_type` property to specify the field type:

### Email Fields

```json
{
  "attribute": "email",
  "field": "emailAddress",
  "_type": "email"
}
```

This transforms the input value into the epilot format:

```json
// Input
{ "emailAddress": "john@example.com" }

// Output in epilot
{ "email": [{ "email": "john@example.com" }] }
```

### Phone Fields

```json
{
  "attribute": "phone",
  "field": "phoneNumber",
  "_type": "phone"
}
```

## Entity-Level JSONata

Pre-process the entire payload before field mapping:

```json
{
  "entity_schema": "contact",
  "jsonataExpression": "$merge([payload, {'fullAddress': payload.street & ', ' & payload.city}])",
  "unique_ids": ["customer_number"],
  "fields": [
    { "attribute": "address_display", "field": "fullAddress" }
  ]
}
```

## Multiple Entities

Process multiple entities from a single event:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "fields": [
        { "attribute": "customer_number", "field": "customerId" },
        { "attribute": "first_name", "field": "firstName" },
        { "attribute": "last_name", "field": "lastName" }
      ]
    },
    {
      "entity_schema": "account",
      "unique_ids": ["account_number"],
      "fields": [
        { "attribute": "account_number", "field": "accountId" },
        { "attribute": "name", "field": "companyName" }
      ]
    }
  ]
}
```

## Dynamic Entity Expansion

Create multiple entities from an array in the payload:

```json
{
  "entity_schema": "meter",
  "jsonataExpression": "meters",
  "unique_ids": ["meter_number"],
  "fields": [
    { "attribute": "meter_number", "field": "meterId" },
    { "attribute": "type", "field": "meterType" }
  ]
}
```

Given this input:

```json
{
  "meters": [
    { "meterId": "M001", "meterType": "electricity" },
    { "meterId": "M002", "meterType": "gas" }
  ]
}
```

This creates two meter entities.

## Conditional Entity Processing

Enable or disable entity processing based on payload conditions:

```json
{
  "entity_schema": "contact",
  "enabled": "customerType = 'individual'",
  "unique_ids": ["customer_number"],
  "fields": [...]
}
```

## Operation Modes

The `mode` field controls how entities are processed. By default, entities are upserted (created or updated).

### Mode Options

| Mode | Description |
|------|-------------|
| `upsert` | Create or update the entity (default behavior) |
| `delete` | Soft delete - marks entity as deleted but keeps in Recycle Bin for 30 days |
| `purge` | Hard delete - permanently removes from the system |
| `upsert-prune-scope-purge` | Upsert entities from array, then hard delete entities in scope that weren't upserted |
| `upsert-prune-scope-delete` | Upsert entities from array, then soft delete entities in scope that weren't upserted |

:::note
The `upsert-prune-scope-*` modes require a `scope` configuration. See [Prune Scope Operations](#prune-scope-operations).
:::

### Entity Deletion

To delete entities, use `mode: "delete"` or `mode: "purge"`:

```json
{
  "entities": [
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "mode": "purge",
      "fields": [
        {
          "attribute": "external_id",
          "field": "billing_event_id"
        }
      ]
    }
  ]
}
```

For deletion modes, only the `unique_ids` fields need to be mapped in `fields` - other field mappings are ignored since no entity attributes are being updated.

#### Conditional Deletion

Combine `mode` with `enabled` for conditional deletion based on payload data:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number"],
  "mode": "delete",
  "enabled": "status = 'TERMINATED'",
  "fields": [
    { "attribute": "contract_number", "field": "contract_id" }
  ]
}
```

### Prune Scope Operations

The `upsert-prune-scope-purge` and `upsert-prune-scope-delete` modes enable a powerful sync pattern: upsert all entities from an array in the payload, then delete/purge entities within a defined scope that weren't included in the upsert.

This is ideal for synchronizing child entity collections, such as syncing all billing events for a billing account.

#### Scope Configuration

When using prune-scope modes, you must provide a `scope` configuration that defines how to identify which existing entities should be considered for deletion. The scope is resolved against the **original event payload** (not individual array items).

##### scope_mode Options

| Mode | Description |
|------|-------------|
| `relations` | Find scope by looking at what a specific entity relates TO |
| `reverse-relations` | Find scope by looking at what's related TO a specific entity |
| `query` | Find scope entities directly via query parameters |

#### Example: Sync Billing Events for a Billing Account

When receiving a billing account update with billing events, sync all billing events and remove any that are no longer in the payload:

```json
{
  "entities": [
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "jsonataExpression": "$map(billingevents[], function($v) { $merge([$v, { \"billingaccountnumber\": billingaccountnumber }]) })",
      "mode": "upsert-prune-scope-purge",
      "scope": {
        "scope_mode": "reverse-relations",
        "schema": "billing_account",
        "unique_ids": [
          {
            "attribute": "billing_account_number",
            "field": "billingaccountnumber"
          }
        ]
      },
      "fields": [
        { "attribute": "external_id", "field": "billing_event_number" },
        { "attribute": "billing_account_number", "field": "billingaccountnumber" }
      ]
    }
  ]
}
```

**Input:**

```json
{
  "billingaccountnumber": "002800699425",
  "billingevents": [
    { "billing_event_number": "002800699425-2025-08-15" },
    { "billing_event_number": "002800699425-2024-08-05" }
  ]
}
```

**Result:**
1. Upserts 2 billing_event entities with the specified external_ids
2. Finds all billing_event entities related to billing_account with `billing_account_number = "002800699425"`
3. Purges any billing_event entities in that scope that weren't in the upserted list

#### Example: Query Mode for Direct Matching

Find scope entities directly by query parameters instead of through relations:

```json
{
  "entities": [
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "jsonataExpression": "$map(billingevents[], function($v) { $merge([$v, { \"billingaccountnumber\": billingaccountnumber }]) })",
      "mode": "upsert-prune-scope-purge",
      "scope": {
        "scope_mode": "query",
        "query": [
          {
            "attribute": "billing_account_number",
            "field": "billingaccountnumber"
          },
          {
            "attribute": "type",
            "constant": "INVOICE"
          }
        ]
      },
      "fields": [
        { "attribute": "external_id", "field": "billing_event_number" },
        { "attribute": "billing_account_number", "field": "billingaccountnumber" }
      ]
    }
  ]
}
```

:::warning
If the array yields zero entities (e.g., `billingevents: []`), this will result in the deletion of **all** entities in the scope. Ensure your payload always contains the expected data.
:::

### Mixed Operations

You can mix upsert and delete operations in the same use case by using multiple entity entries with different modes:

```json
{
  "entities": [
    {
      "entity_schema": "meter",
      "unique_ids": ["external_id"],
      "mode": "upsert",
      "fields": [
        { "attribute": "external_id", "field": "meter_id" },
        { "attribute": "status", "constant": "DECOMMISSIONED" }
      ]
    },
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "mode": "purge",
      "jsonataExpression": "billing_events",
      "fields": [
        { "attribute": "external_id", "field": "event_id" }
      ]
    }
  ]
}
```

This configuration updates the meter status to "DECOMMISSIONED" while also purging the associated billing events.

## Field Mapping Priority

When multiple mapping options are specified, they are evaluated in this order:

1. `constant` - Fixed value (highest priority)
2. `jsonataExpression` - Computed value
3. `field` - Direct field mapping (lowest priority)

## Array Attribute Operations

Array attributes like `_tags` support operations to control how values are applied:

### Set (`_set`)

Replaces the entire array:

```json
{
  "attribute": "_tags",
  "constant": ["CUSTOMER", "VIP", "ACTIVE"]
}
```

### Append (`_append`)

Adds new unique values to existing ones (with automatic deduplication):

```json
{
  "attribute": "_tags",
  "jsonataExpression": "{ \"_append\": [\"NEW_TAG\", \"IMPORTED\"] }"
}
```

If `["EXISTING", "CUSTOMER"]` already exists on the entity, appending `["CUSTOMER", "NEW_TAG"]` results in `["EXISTING", "CUSTOMER", "NEW_TAG"]` - the duplicate `CUSTOMER` is not added again.

### Append All (`_append_all`)

Adds all values without deduplication:

```json
{
  "attribute": "_tags",
  "jsonataExpression": "{ \"_append_all\": [\"AUDIT_LOG\", \"PROCESSED\"] }"
}
```

## Best Practices

### Use Meaningful Unique IDs

Choose stable identifiers that don't change:

```json
// Good - stable business identifier
"unique_ids": ["customer_number"]

// Avoid - may change over time
"unique_ids": ["email"]
```

### Handle Optional Fields

Use `enabled` to skip fields when data is missing:

```json
{
  "attribute": "secondary_email",
  "field": "alternateEmail",
  "_type": "email",
  "enabled": "$exists(alternateEmail)"
}
```

### Validate Data with JSONata

Transform and validate in one expression:

```json
{
  "attribute": "status",
  "jsonataExpression": "status in ['active', 'inactive', 'pending'] ? status : 'unknown'"
}
```

## Next Steps

- [Unique Identifiers](./unique-identifiers) - Advanced entity lookup strategies
- [Relations](./relations) - Link entities together
- [Meter Readings](./meter-readings) - Handle meter reading data
