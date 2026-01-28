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
  "mapping_version": "v2.0",
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
