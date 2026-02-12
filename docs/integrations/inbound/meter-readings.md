---
sidebar_position: 5
title: Meter Readings
description: Synchronize meter reading data from ERP systems
---

# Meter Readings

The ERP Toolkit provides specialized support for meter reading data, a common use case in utility and energy industry integrations.

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
| `timestamp` | When the reading was taken (ISO 8601 format) |
| `source` | Origin of the reading. Must be one of: `ERP`, `ECP`, `360`, `journey-submission` |
| `value` | The actual meter reading value |
| `reason` *(optional)* | Reason for the reading. Must be one of: `regular`, `irregular`, `last`, `first`, `meter_change`, `contract_change`, `meter_adjustment`, or empty/null. Invalid values will be rejected with a validation error. |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `mode` | string | Operation mode: `upsert` (default) or `delete`. Note: `purge` is not supported for meter readings |
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
    "unique_ids": ["meter_number"]
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| `unique_ids` | string[] | Fields to identify the meter entity |

### Meter Identifier Source

The meter identifier value comes from the reading data:

```json
// Input payload
{
  "readings": [
    {
      "meter_number": "M001",
      "readingDate": "2024-01-15",
      "readingValue": 12500
    }
  ]
}
```

The `meter_number` field within each reading is used to find the meter.

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
    { "attribute": "reading_date", "field": "date" },
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
    { "attribute": "reading_date", "field": "date" },
    { "attribute": "value", "field": "reading" },
    { "attribute": "reading_type", "field": "type" },
    { "attribute": "source", "constant": "ERP_IMPORT" }
  ]
}
```

### Multiple Value Types

Some meters have multiple reading values (e.g., HT/NT for electricity):

```json
{
  "meter_readings": [
    {
      "jsonataExpression": "$.readings.{'meter_number': meterId, 'reading_date': date, 'value': htValue, 'tariff': 'HT'}",
      "meter": { "unique_ids": ["meter_number"] },
      "fields": [
        { "attribute": "reading_date", "field": "reading_date" },
        { "attribute": "value", "field": "value" },
        { "attribute": "tariff", "field": "tariff" }
      ]
    },
    {
      "jsonataExpression": "$.readings.{'meter_number': meterId, 'reading_date': date, 'value': ntValue, 'tariff': 'NT'}",
      "meter": { "unique_ids": ["meter_number"] },
      "fields": [
        { "attribute": "reading_date", "field": "reading_date" },
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
  "jsonataExpression": "$.readings.{'meter_number': meterId, 'reading_date': $fromMillis(timestamp), 'value': $number(readingValue)}"
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
        "unique_ids": ["meter_number"]
      },
      "fields": [
        { "attribute": "meter_number", "field": "meterId" },
        { "attribute": "reading_date", "field": "$$.readingDate" },
        { "attribute": "value", "field": "currentReading" },
        { "attribute": "previous_value", "field": "previousReading" },
        { "attribute": "unit", "field": "unit" },
        {
          "attribute": "consumption",
          "jsonataExpression": "currentReading - previousReading"
        },
        { "attribute": "source", "constant": "ERP_BATCH_IMPORT" },
        { "attribute": "batch_id", "field": "$$.batchId" }
      ]
    }
  ]
}
```

Note: `$$` references the root payload, allowing access to batch-level fields from within the readings array.

## Deduplication

Meter readings are deduplicated based on:

- Meter identifier
- Reading date
- Reading type (if specified)

Duplicate readings within a 24-hour window are skipped.

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
            │         └─ Not Found ──▶ Skip/Error
            │
            ├──▶ Apply Field Mappings
            │
            ├──▶ Check Deduplication
            │         │
            │         ├─ Unique ──▶ Create Reading
            │         │
            │         └─ Duplicate ──▶ Skip
            │
            └──▶ Create meter_reading Entity
```

## Error Handling

### Meter Not Found

```json
{
  "status": "error",
  "message": "Meter not found",
  "error": {
    "code": "METER_NOT_FOUND",
    "details": {
      "meter_number": "M999"
    }
  }
}
```

**Resolution:** Ensure meters exist before importing readings, or process meters first.

### Invalid Reading Value

```json
{
  "status": "error",
  "message": "Invalid reading value",
  "error": {
    "code": "INVALID_READING_VALUE",
    "details": {
      "field": "value",
      "received": "not-a-number"
    }
  }
}
```

**Resolution:** Validate and transform values using JSONata before mapping.

## Reading Matching Strategies

By default, meter readings use `external_id` for upsert matching. However, when readings originate from the End Customer Portal (ECP) and are later echoed back by the ERP, duplicates can occur because ECP readings may not have an `external_id` initially.

The `reading_matching` option configures how incoming readings are matched:

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
1. Before creating a reading, the system looks up existing readings for the same meter_id + counter_id + direction on the same German calendar day
2. If a single match is found: Updates the existing reading with ERP data
3. If multiple matches are found: Logs an error and skips (to avoid duplicates)
4. If no match is found: Creates a new reading

This strategy is useful for ECP-to-ERP roundtrip scenarios where the ERP echoes readings back with truncated timestamps.

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
Meter readings only support `delete` mode, not `purge`. Deletion is always permanent.
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
