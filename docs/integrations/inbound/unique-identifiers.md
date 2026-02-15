---
sidebar_position: 3
title: Unique Identifiers
description: Configure how entities are matched and looked up
---

# Unique Identifiers

Unique identifiers determine how the ERP Toolkit finds existing entities in epilot. When processing an event, the system searches for entities matching the specified identifiers to decide whether to create or update.

## Basic Usage

Specify one or more fields as unique identifiers:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["customer_number"],
  "fields": [
    { "attribute": "customer_number", "field": "customerId" },
    { "attribute": "first_name", "field": "firstName" }
  ]
}
```

The system extracts `customer_number` from the mapped fields and searches for existing entities.

## Lookup Behavior

### Single Identifier

```json
"unique_ids": ["customer_number"]
```

Searches for entities where `customer_number` matches the incoming value.

### Multiple Identifiers (AND Logic)

```json
"unique_ids": ["customer_number", "branch_code"]
```

Searches for entities where **both** fields match. Useful for composite keys.

### Lookup Results

| Result | Action |
|--------|--------|
| No match | Create new entity |
| Single match | Update existing entity |
| Multiple matches | Error - ambiguous identifier |

## Special Identifier Types

### Direct Entity ID (`_id`)

If you know the epilot entity ID, bypass the search:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["_id"],
  "fields": [
    { "attribute": "_id", "field": "epilotEntityId" },
    { "attribute": "first_name", "field": "firstName" }
  ]
}
```

This directly fetches the entity without Elasticsearch search.

### Email Lookup

Email fields require special handling since they're stored as arrays:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["email"],
  "fields": [
    { "attribute": "email", "field": "emailAddress", "_type": "email" }
  ]
}
```

The system automatically searches the repeatable email field structure.

### Phone Lookup

Similar to email, phone fields are repeatable:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["phone"],
  "fields": [
    { "attribute": "phone", "field": "phoneNumber", "_type": "phone" }
  ]
}
```

## Multi-Field Composite Keys

For entities with composite business keys:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["contract_number", "contract_type"],
  "fields": [
    { "attribute": "contract_number", "field": "contractId" },
    { "attribute": "contract_type", "field": "type" },
    { "attribute": "start_date", "field": "startDate" }
  ]
}
```

Both `contract_number` and `contract_type` must match for an entity to be found.

## Fallback Strategies

### Primary and Secondary Identifiers

Process entities with different identifier strategies:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": "$exists(customerId)",
      "fields": [
        { "attribute": "customer_number", "field": "customerId" }
      ]
    },
    {
      "entity_schema": "contact",
      "unique_ids": ["email"],
      "enabled": "$not($exists(customerId)) and $exists(email)",
      "fields": [
        { "attribute": "email", "field": "email", "_type": "email" }
      ]
    }
  ]
}
```

This first tries to match by `customer_number`, falling back to `email` if not available.

## Identifier Requirements

### Field Must Be Mapped

The identifier field must be included in the `fields` array:

```json
// Correct
{
  "unique_ids": ["customer_number"],
  "fields": [
    { "attribute": "customer_number", "field": "customerId" }  // Required
  ]
}

// Incorrect - will fail
{
  "unique_ids": ["customer_number"],
  "fields": [
    { "attribute": "first_name", "field": "firstName" }
    // customer_number not mapped!
  ]
}
```

### Non-Empty Values

Identifier fields must have non-empty values. Empty or null values cause lookup failures:

```json
// Add validation
{
  "attribute": "customer_number",
  "field": "customerId",
  "enabled": "$exists(customerId) and customerId != ''"
}
```

## Best Practices

### Choose Stable Identifiers

Use business keys that don't change over time:

| Good | Avoid |
|------|-------|
| Customer number | Email address |
| Contract ID | Phone number |
| Meter serial number | Name |
| External system ID | Address |

### Avoid Ambiguity

Ensure your identifiers uniquely identify entities:

```json
// Too broad - may match multiple entities
"unique_ids": ["last_name"]

// Better - unique business identifier
"unique_ids": ["customer_number"]

// Best - composite key for guaranteed uniqueness
"unique_ids": ["customer_number", "branch_code"]
```

### Handle Legacy Data

When migrating data, include both old and new identifiers:

```json
{
  "entity_schema": "contact",
  "unique_ids": ["new_customer_id"],
  "fields": [
    { "attribute": "new_customer_id", "field": "newId" },
    { "attribute": "legacy_id", "field": "oldId" }
  ]
}
```

## Error Handling

### Multiple Matches

When multiple entities match the identifier:

```json
{
  "status": "error",
  "message": "Multiple entities found for unique identifier",
  "error": {
    "code": "AMBIGUOUS_IDENTIFIER",
    "category": "validation"
  }
}
```

**Resolution:** Use more specific identifiers or clean up duplicate data.

### No Identifier Value

When the identifier field is empty:

```json
{
  "status": "error",
  "message": "Required unique identifier field is empty",
  "error": {
    "code": "MISSING_IDENTIFIER",
    "category": "validation"
  }
}
```

**Resolution:** Ensure source data includes the identifier value.

## Next Steps

- [Relations](./relations) - Link entities together
- [Meter Readings](./meter-readings) - Handle meter reading data
- [Examples](./examples) - Complete integration examples
