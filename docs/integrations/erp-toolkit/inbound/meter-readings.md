---
sidebar_position: 6
title: Meter Readings
description: Synchronize meter reading data from ERP systems
---

# Meter Readings

The ERP Toolkit provides specialized support for meter reading data, common in utility and energy industry integrations.

## Overview

Meter readings require special handling because they:

- Come as arrays of readings per meter
- Need to be linked to existing meter entities
- Contain time-series data with timestamps and values

## Configuration Structure

Meter readings are configured separately from entity mappings:

```json
{
  "entities": [...],
  "meter_readings": [
    {
      "jsonataExpression": "$.readings",
      "meter": {
        "unique_ids": [
          { "attribute": "external_id", "field": "meter_id" }
        ]
      },
      "fields": [
        { "attribute": "external_id", "field": "reading_id" },
        { "attribute": "timestamp", "field": "read_at" },
        { "attribute": "source", "constant": "ERP" },
        { "attribute": "value", "field": "reading_value" }
      ]
    }
  ]
}
```

### Required Fields

Every meter reading configuration must include mappings for these fields:

| Field | Description |
|-------|-------------|
| `external_id` | Unique identifier for this reading |
| `timestamp` | When the reading was taken. Accepts ISO 8601 date-only (`YYYY-MM-DD`) or date-time (`YYYY-MM-DDTHH:mm:ss` with optional fractional seconds and timezone offset). See [Timestamp Processing](#timestamp-processing) for details on validation and normalization. |
| `source` | Origin of the reading. Must be one of: `ERP`, `ECP`, `360`, `journey-submission` |
| `value` | The actual meter reading value |
| `reason` *(optional)* | Reason for the reading. Must be one of: `regular`, `irregular`, `last`, `first`, `meter_change`, `contract_change`, `meter_adjustment`, or empty/null. Invalid values will be rejected with a validation error. |

#### Timestamp Processing

The `timestamp` field is validated and normalized before the reading is handed off to the metering system:

**Validation** — the resolved value must:

- Be a non-empty string.
- Match an ISO 8601 shape — either `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss` (optional fractional seconds and optional `Z` / `±HH:mm` timezone offset). Other formats (e.g. `DD.MM.YYYY` or epoch numbers) are rejected. To accept a non-ISO source format, convert it inside a `jsonataExpression` (for example `$fromMillis(...)` for epoch milliseconds).
- Represent a real calendar date. Values that look right but resolve to an invalid date (e.g. `2025-02-30`) are rejected.

**Normalization (date-only values)** — if the value is a bare `YYYY-MM-DD`, it is expanded to a midnight UTC instant so it stays on the same German calendar day (Europe/Berlin). Values that already include a time component are forwarded unchanged.

| Input | Stored as |
|-------|-----------|
| `2025-12-15` | `2025-12-15T00:00:00.000Z` |
| `2025-12-15T14:30:00Z` | `2025-12-15T14:30:00Z` (unchanged) |
| `2025-12-15T00:00:00+01:00` | `2025-12-15T00:00:00+01:00` (unchanged) |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `mode` | string | Operation mode: `upsert` (default), `delete`, or `upsert-prune-scope`. Note: `purge` is not supported for meter readings. See [Prune Scope](#prune-scope) |
| `reading_matching` | string | Matching strategy: `external_id` (default) or `strict-date`. See [Reading Matching Strategies](#reading-matching-strategies) |
| `jsonataExpression` | string | Extract readings from nested payload structures |
| `meter_counter` | object | For multi-tariff meters, identifies the specific counter |

Missing required fields will result in a validation error:
```
Meter readings configuration (item 0) is missing required field attributes: timestamp, source
```

## Meter Configuration

### Meter Lookup

The `meter` object defines how to find the associated meter entity:

```json
{
  "meter": {
    "unique_ids": [
      { "attribute": "meter_number", "field": "meterId" }
    ]
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `unique_ids` | object[] | Fields to identify the meter entity. See [Unique ID Options](./relations#relation-unique-id-options) |

### Meter Identifier Source

The meter identifier value comes from the reading data via the `unique_ids` configuration:

```json
{
  "meter": {
    "unique_ids": [
      { "attribute": "external_id", "field": "meter_id" }
    ]
  }
}
```

Each `unique_ids` entry supports the same value sources as [relation unique IDs](./relations#relation-unique-id-options): `field`, `jsonataExpression`, and `constant`.

### Meter Counter (Multi-Tariff)

For meters with multiple counters (e.g., day/night tariffs), specify the counter:

```json
{
  "meter": {
    "unique_ids": [
      { "attribute": "external_id", "field": "meter_id" }
    ]
  },
  "meter_counter": {
    "unique_ids": [
      { "attribute": "external_id", "field": "counter_id" }
    ]
  },
  "fields": [...]
}
```

## Field Mappings

### Basic Reading Fields

```json
{
  "fields": [
    { "attribute": "timestamp", "field": "date" },
    { "attribute": "value", "field": "reading" },
    { "attribute": "unit", "constant": "kWh" }
  ]
}
```

### Reading Types

Map the reading type or category:

```json
{
  "fields": [
    { "attribute": "external_id", "field": "readingId" },
    { "attribute": "timestamp", "field": "date" },
    { "attribute": "value", "field": "reading" },
    { "attribute": "reason", "field": "type" },
    { "attribute": "source", "constant": "ERP" }
  ]
}
```

### Multiple Value Types

Some meters have multiple reading values (e.g., HT/NT for electricity):

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "$.readings.{'meter_number': meterId, 'timestamp': date, 'value': htValue, 'tariff': 'HT'}",
      "meter": {
        "unique_ids": [
          { "attribute": "meter_number", "field": "meter_number" }
        ]
      },
      "fields": [
        { "attribute": "timestamp", "field": "timestamp" },
        { "attribute": "value", "field": "value" },
        { "attribute": "tariff", "field": "tariff" }
      ]
    },
    {
      "jsonataExpression": "$.readings.{'meter_number': meterId, 'timestamp': date, 'value': ntValue, 'tariff': 'NT'}",
      "meter": {
        "unique_ids": [
          { "attribute": "meter_number", "field": "meter_number" }
        ]
      },
      "fields": [
        { "attribute": "timestamp", "field": "timestamp" },
        { "attribute": "value", "field": "value" },
        { "attribute": "tariff", "field": "tariff" }
      ]
    }
  ]
}
```

## JSONata Expressions

### Extract Readings Array

```json
{
  "jsonataExpression": "$.readings"
}
```

From payload:

```json
{
  "readings": [
    { "meterId": "M001", "date": "2024-01-15", "value": 12500 },
    { "meterId": "M002", "date": "2024-01-15", "value": 8300 }
  ]
}
```

### Flatten Nested Structures

```json
{
  "jsonataExpression": "$.meters.readings"
}
```

From payload:

```json
{
  "meters": [
    {
      "readings": [
        { "meter_number": "M001", "date": "2024-01-15", "value": 12500 }
      ]
    }
  ]
}
```

### Transform Before Mapping

```json
{
  "jsonataExpression": "$.readings.{'meter_number': meterId, 'timestamp': $fromMillis(timestamp), 'value': $number(readingValue)}"
}
```

## Complete Example

### Input Payload

```json
{
  "batchId": "BATCH-2024-01-15",
  "readingDate": "2024-01-15T08:00:00Z",
  "readings": [
    {
      "meterId": "M001",
      "meterType": "electricity",
      "currentReading": 12500.5,
      "previousReading": 12000.0,
      "unit": "kWh"
    },
    {
      "meterId": "M002",
      "meterType": "gas",
      "currentReading": 450.25,
      "previousReading": 420.00,
      "unit": "m3"
    }
  ]
}
```

### Mapping Configuration

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "readings",
      "meter": {
        "unique_ids": [
          { "attribute": "meter_number", "field": "meterId" }
        ]
      },
      "fields": [
        { "attribute": "external_id", "jsonataExpression": "meterId & '-' & $$.readingDate" },
        { "attribute": "timestamp", "field": "$$.readingDate" },
        { "attribute": "value", "field": "currentReading" },
        { "attribute": "source", "constant": "ERP" },
        { "attribute": "unit", "field": "unit" },
        {
          "attribute": "consumption",
          "jsonataExpression": "currentReading - previousReading"
        }
      ]
    }
  ]
}
```

Note: `$$` references the root payload, allowing access to batch-level fields from within the readings array.

## Deduplication

Meter readings are deduplicated based on the `reading_matching` strategy:

- **`external_id`** (default): Readings are matched by their `external_id` attribute
- **`strict-date`**: Readings are matched by meter_id + counter_id + direction + date (German timezone)

See [Reading Matching Strategies](#reading-matching-strategies) for details.

## Processing Flow

```
Extract Readings Array (JSONata)
            │
            ▼
    For Each Reading:
            │
            ├──▶ Extract Meter Identifier
            │
            ├──▶ Find Meter Entity
            │         │
            │         ├─ Found ──▶ Continue
            │         │
            │         └─ Not Found ──▶ Error
            │
            ├──▶ Apply Field Mappings
            │
            └──▶ Upsert Reading (matched by reading_matching strategy)
```

## Error Handling

Common error scenarios:

- **Meter not found**: The meter entity referenced by `unique_ids` cannot be found. Ensure meters exist before importing readings, or process meters in a separate entity mapping first.
- **Missing required fields**: The configuration is missing required field mappings (`external_id`, `timestamp`, `source`, `value`). The error message includes the item index and missing fields.
- **Invalid reason value**: The `reason` field must be one of: `regular`, `irregular`, `last`, `first`, `meter_change`, `contract_change`, `meter_adjustment`, or empty/null.

## Reading Matching Strategies

By default, meter readings use `external_id` for upsert matching. When readings originate from the End Customer Portal (ECP) and are later echoed back by the ERP, duplicates can occur because ECP readings may not have an `external_id` initially.

The `reading_matching` option configures matching behavior:

| Strategy | Description |
|----------|-------------|
| `external_id` | Default. Match readings by `external_id` attribute |
| `strict-date` | Match by meter_id + counter_id + direction + date (German timezone) |

### Using strict-date

```json
{
  "meter_readings": [
    {
      "reading_matching": "strict-date",
      "meter": { ... },
      "fields": [ ... ]
    }
  ]
}
```

**How strict-date works:**

1. Looks up existing readings for the same meter_id + counter_id + direction on the same German calendar day
2. Single match: updates the existing reading with ERP data
3. Multiple matches: logs an error and skips to avoid duplicates
4. No match: creates a new reading

This strategy handles ECP-to-ERP roundtrip scenarios where the ERP echoes readings back with truncated timestamps.

## Meter Reading Deletion

To delete meter readings, use `mode: "delete"`:

```json
{
  "meter_readings": [
    {
      "mode": "delete",
      "meter": {
        "unique_ids": [
          { "attribute": "external_id", "field": "meter_id" }
        ]
      },
      "fields": [
        { "attribute": "external_id", "field": "reading_id" }
      ]
    }
  ]
}
```

:::note
Meter readings support `delete` and `upsert-prune-scope` modes, but not `purge`. Deletion is always permanent.
:::

### Deletion with Strict Date Matching

The `reading_matching: "strict-date"` strategy is particularly useful for deletion when readings may not have a stable `external_id`:

```json
{
  "meter_readings": [
    {
      "mode": "delete",
      "reading_matching": "strict-date",
      "meter": {
        "unique_ids": [
          { "attribute": "external_id", "field": "meter_id" }
        ]
      },
      "fields": [
        { "attribute": "external_id", "field": "reading_id" },
        { "attribute": "timestamp", "field": "timestamp" }
      ]
    }
  ]
}
```

**Input:**

```json
{
  "meter_id": "M-12345",
  "reading_id": "R-67890",
  "timestamp": "2025-02-01T10:00:00Z"
}
```

**Result:** The meter reading with `external_id = "R-67890"` associated with meter `M-12345` will be deleted. With `strict-date` matching, the system matches by meter_id + date if an exact external_id match is not found.

## Prune Scope

The `upsert-prune-scope` mode upserts all readings from the payload for a given meter/counter, then permanently deletes all other readings for that meter/counter that weren't part of the upsert.

The scope is naturally defined by **meter + counter** — no explicit `scope_mode` is needed. An optional `scope` object can restrict pruning to readings from a specific source.

### Scope Configuration (optional)

| Property | Required | Description |
|----------|----------|-------------|
| `source` | No | When set, only readings with this source are eligible for pruning |

### Basic Prune Scope Example

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "$.readings",
      "mode": "upsert-prune-scope",
      "meter": {
        "unique_ids": [{ "attribute": "external_id", "field": "meter_id" }]
      },
      "meter_counter": {
        "unique_ids": [{ "attribute": "external_id", "field": "counter_id" }]
      },
      "fields": [
        { "attribute": "external_id", "field": "reading_id" },
        { "attribute": "timestamp", "field": "read_at" },
        { "attribute": "source", "constant": "ERP" },
        { "attribute": "value", "field": "meter_value" }
      ]
    }
  ]
}
```

Upserts all readings from the `readings` array, then deletes other readings for the same meter+counter not in the payload.

### Prune Scope with Source Filter

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "$.readings",
      "mode": "upsert-prune-scope",
      "scope": { "source": "ERP" },
      "meter": {
        "unique_ids": [{ "attribute": "external_id", "field": "meter_id" }]
      },
      "meter_counter": {
        "unique_ids": [{ "attribute": "external_id", "field": "counter_id" }]
      },
      "fields": [
        { "attribute": "external_id", "field": "reading_id" },
        { "attribute": "timestamp", "field": "read_at" },
        { "attribute": "source", "constant": "ERP" },
        { "attribute": "value", "field": "meter_value" }
      ]
    }
  ]
}
```

With `source: "ERP"`, only readings with `source: "ERP"` are eligible for pruning. Manually entered or ECP readings remain untouched.

:::warning
If the payload yields zero readings, all readings in scope will be deleted — the ERP is treated as the source of truth. Use the `source` scope filter to avoid accidentally deleting readings from other sources (e.g., manually entered readings).
:::

### Important Notes

1. **Scope**: The scope is always all readings for the meter + counter.
2. **Permanent Deletion**: Meter reading deletion is always permanent (no soft delete/purge distinction).
3. **Source Filter Recommended**: Use `source` to avoid accidentally deleting readings from other sources.
4. **External ID**: The `external_id` attribute is used to identify which readings to keep during pruning.

## Best Practices

### Ensure Meters Exist First

Process meters before readings:

```json
{
  "entities": [
    {
      "entity_schema": "meter",
      "unique_ids": ["meter_number"],
      "fields": [...]
    }
  ],
  "meter_readings": [...]
}
```

### Use Batch Identifiers

Include batch information for traceability:

```json
{
  "fields": [
    { "attribute": "batch_id", "field": "$$.batchId" },
    { "attribute": "import_timestamp", "field": "$$.importTime" }
  ]
}
```

### Handle Missing Readings Gracefully

Use conditional processing:

```json
{
  "jsonataExpression": "readings[value != null and value >= 0]"
}
```

### Validate Value Ranges

Use JSONata to validate readings:

```json
{
  "attribute": "value",
  "jsonataExpression": "currentReading >= 0 ? currentReading : $error('Negative reading value')"
}
```

## Next Steps

- [Examples](./examples) - Complete integration examples with meter readings
