---
title: ERP Toolkit Mappings
sidebar_position: 20
---

# ERP Integration Mapping Specification v2.0

## Overview

The ERP Integration Mapping v2.0 provides a powerful and flexible way to transform ERP system events (customer updates, contract changes, etc.) into epilot entity updates. This document explains how to configure mappings to extract, transform, and structure data from your ERP system.

## Table of Contents

- [Key Concepts](#key-concepts)
- [Basic Structure](#basic-structure)
- [Field Mapping Types](#field-mapping-types)
- [Entity-Level Processing](#entity-level-processing)
- [Relations](#relations)
  - [Relation Operations](#relation-operations)
  - [Basic Relation with Items](#basic-relation-with-items)
  - [Multiple Relations](#multiple-relations)
  - [Dynamic Relations with JSONata](#dynamic-relations-with-jsonata)
  - [Relation Unique ID Options](#relation-unique-id-options)
- [Meter Readings](#meter-readings)
  - [Overview](#overview-2)
  - [Basic Structure](#basic-structure-2)
  - [Required Elements](#required-elements)
  - [Unique Identifier Mappings](#unique-identifier-mappings)
  - [Field Attributes](#field-attributes)
  - [Example 1: Basic Meter Readings](#example-1-basic-meter-readings)
  - [Example 2: Meter Readings with Counter](#example-2-meter-readings-with-counter)
  - [Example 3: Combined Entity and Meter Readings](#example-3-combined-entity-and-meter-readings)
  - [Validation](#validation)
  - [Best Practices](#best-practices-1)
- [Array Attribute Operations](#array-attribute-operations)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Key Concepts

### Events vs. Objects

Version 2.0 uses an **event-based** approach instead of object-based:
- **Events** represent changes in your ERP system (e.g., "CustomerChanged", "ContractUpdated")
- Each event can map to **multiple entities** in epilot, also multiples of the same type
- Each entity mapping can be invoked **multiple times** from array data

### Mapping Flow

```
ERP Event Payload
    ↓
Entity-level JSONata (optional pre-processing)
    ↓
Field Mappings (extract attributes)
    ↓
Entity Updates (ready for epilot)
```

## Basic Structure

```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "EventName": {
        "entities": [
          {
            "entity_schema": "contact",
            "unique_ids": ["customer_number"],
            "jsonataExpression": "...",  // Optional
            "enabled": true,  // Optional (boolean or JSONata string)
            "fields": [...]
          }
        ]
      }
    }
  }
}
```

### Configuration Elements

- **`version`**: Must be `"2.0"`
- **`events`**: Object with event names as keys
- **`entities`**: Array of entity configurations for each event
- **`entity_schema`**: The epilot entity schema (e.g., "contact", "contract", "billing_account", see [Core Entities](https://docs.epilot.io/docs/entities/core-entities/))
- **`unique_ids`**: Array of attribute names that uniquely identify this entity
- **`jsonataExpression`**: Optional JSONata expression to pre-process the event data
- **`enabled`**: Optional boolean or JSONata expression to conditionally enable/disable entity processing (defaults to `true`)
- **`fields`**: Array of field mappings

## Field Mapping Types

### 1. Simple Field Mapping

Direct mapping from event field to entity attribute.

**Configuration:**
```json
{
  "attribute": "first_name",
  "field": "firstName"
}
```

**Input:**
```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

**Output:**
```json
{
  "entity_slug": "contact",
  "unique_identifiers": {...},
  "attributes": {
    "first_name": "John"
  }
}
```

### 2. JSONPath Field Mapping

Use JSONPath queries to extract nested data. Fields starting with `$` are treated as JSONPath expressions.

**Configuration:**
```json
{
  "attribute": "street",
  "field": "$.address.street"
}
```

**Input:**
```json
{
  "customerId": "12345",
  "address": {
    "street": "Main Street 42",
    "city": "Berlin"
  }
}
```

**Output:**
```json
{
  "attributes": {
    "street": "Main Street 42"
  }
}
```

### 3. JSONata Expression Mapping

Transform data using JSONata expressions.

**Configuration:**
```json
{
  "attribute": "full_name",
  "jsonataExpression": "firstName & ' ' & lastName"
}
```

**Input:**
```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

**Output:**
```json
{
  "attributes": {
    "full_name": "John Doe"
  }
}
```

### 4. Constant Value Mapping

Set a fixed value regardless of input data. Useful for setting tags, purposes, etc.

**Configuration:**
```json
{
  "attribute": "source",
  "constant": "ERP_IMPORT"
}
```

**Output:**
```json
{
  "attributes": {
    "source": "ERP_IMPORT"
  }
}
```

## Entity-Level Processing

Entity-level JSONata expressions pre-process data before field mappings are applied. This is powerful for:
- Transforming data structures
- Creating multiple entities from arrays
- Normalizing inconsistent data formats

### Example: Array to Multiple Entities

**Configuration:**
```json
{
  "entity_schema": "meter",
  "unique_ids": ["meter_number"],
  "jsonataExpression": "meters.{\n  \"number\": number,\n  \"type\": type = \"E\" ? \"electricity\" : type = \"G\" ? \"gas\" : type\n}",
  "fields": [
    {
      "attribute": "meter_number",
      "field": "number"
    },
    {
      "attribute": "meter_type",
      "field": "type"
    }
  ]
}
```

**Input:**
```json
{
  "contractId": "CTR-001",
  "meters": [
    { "number": "M-001", "type": "E" },
    { "number": "M-002", "type": "G" }
  ]
}
```

**Output:** (2 separate entity updates)
```json
[
  {
    "entity_slug": "meter",
    "unique_identifiers": { "meter_number": "M-001" },
    "attributes": {
      "meter_number": "M-001",
      "meter_type": "electricity"
    }
  },
  {
    "entity_slug": "meter",
    "unique_identifiers": { "meter_number": "M-002" },
    "attributes": {
      "meter_number": "M-002",
      "meter_type": "gas"
    }
  }
]
```

### Conditional Entity Processing with `enabled`

The `enabled` field allows you to conditionally include or exclude entity mappings based on runtime conditions. This is useful when:
- You want to enable/disable specific entities without removing the configuration
- You need to conditionally create entities based on data presence or values
- You're testing or gradually rolling out new entity mappings

**Value Types:**
- **Boolean** (`true`/`false`): Directly control whether the entity is processed
- **String (JSONata expression)**: Dynamic evaluation based on the data
- **Undefined/omitted**: Defaults to `true` (entity is processed)

**Important:** If you use a JSONata expression for `enabled`, it's evaluated **after** the entity-level `jsonataExpression` (if present). This means you can use the pre-processed data in your condition.

#### Example: Static Enable/Disable

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": true,  // Explicitly enabled (same as omitting)
      "fields": [...]
    },
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": false,  // Disabled - will be skipped
      "fields": [...]
    }
  ]
}
```

#### Example: Conditional with JSONata

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contract",
      "unique_ids": ["contract_number"],
      "enabled": "$exists(contract_number) and status = 'active'",
      "fields": [
        {
          "attribute": "contract_number",
          "field": "contract_number"
        },
        {
          "attribute": "status",
          "field": "status"
        }
      ]
    }
  ]
}
```

**Input:**
```json
{
  "contract_number": "CTR-123",
  "status": "active"
}
```

**Result:** Entity is created because the condition evaluates to `true`.

**Input:**
```json
{
  "contract_number": "CTR-456",
  "status": "inactive"
}
```

**Result:** Entity is **not** created because the condition evaluates to `false`.

#### Example: Combining with Entity-Level JSONata

When using both `jsonataExpression` and `enabled`, the evaluation order is:
1. Evaluate `jsonataExpression` (pre-process data)
2. Evaluate `enabled` against the pre-processed data
3. If enabled, process field mappings

**Configuration:**
```json
{
  "entity_schema": "meter",
  "unique_ids": ["meter_number"],
  "jsonataExpression": "meters[type='electricity']",
  "enabled": "$count($) > 0",  // Only process if array is not empty
  "fields": [
    {
      "attribute": "meter_number",
      "field": "number"
    }
  ]
}
```

**Input with electricity meters:**
```json
{
  "contractId": "CTR-001",
  "meters": [
    { "number": "M-001", "type": "electricity" },
    { "number": "M-002", "type": "gas" }
  ]
}
```

**Result:** Entity is created for the electricity meter because:
1. `jsonataExpression` filters to `[{ "number": "M-001", "type": "electricity" }]`
2. `enabled` evaluates `$count([...]) > 0` → `true`

**Input without electricity meters:**
```json
{
  "contractId": "CTR-001",
  "meters": [
    { "number": "M-002", "type": "gas" }
  ]
}
```

**Result:** No entity created because:
1. `jsonataExpression` filters to `[]` (empty array)
2. `enabled` evaluates `$count([]) > 0` → `false`

## Relations

Relations link entities together. v2.0 provides flexible relation configurations based on unique identifiers, which are
resolved at the time of entity creation.

### Relation Operations

Relations support two operations that control how relation values are applied to entities:

#### `_set` Operation

The `_set` operation **replaces** the entire relation attribute with the specified items. This is the default operation and is used when you want to completely overwrite any existing relations.

**Behavior:**
- Replaces all existing relation items with the new items
- If the entity doesn't exist yet, creates it with the specified relations
- Subsequent `_set` operations will completely replace previous values

**Example:**
```json
{
  "attribute": "billing_account",
  "relations": {
    "operation": "_set",
    "items": [...]
  }
}
```

**Use Cases:**
- Setting the initial relation when creating an entity
- Completely replacing a relation (e.g., changing primary contact)
- When the ERP system provides the complete, authoritative list of relations

#### `_append` Operation

The `_append` operation **adds** new relation items to the end of existing ones. This is useful for incremental updates where you want to preserve existing relations while adding new ones.

**Behavior:**
- Fetches the existing entity to retrieve current relation values
- Appends the new items to the end of the existing relation array
- If the entity doesn't exist, behaves the same as `_set` (creates new entity with specified relations)
- Preserves the order of existing items

**Example:**
```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_append",
    "items": [
      {
        "entity_schema": "contact",
        "_tags": ["NEW_CONTACT"],
        "unique_ids": [...]
      }
    ]
  }
}
```

**Example Scenario:**
```
Initial entity state:
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] }
    ]
  }
}

After applying _append operation:
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] },
      { "entity_id": "new-1", "_schema": "contact", "_tags": ["NEW_CONTACT"] }
    ]
  }
}
```

**Use Cases:**
- Adding additional contacts or billing accounts to an existing contract
- Incremental updates where the ERP system sends individual relation changes
- Preserving manually added relations while allowing ERP updates

**Important Notes:**
- `_append` requires an additional database lookup to fetch the existing entity
- If duplicate relations are appended, they will appear multiple times (no automatic deduplication)
- The operation applies to both relation attributes and regular array attributes (like `_tags`)

### Basic Relation with Items

**Configuration:**
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

**Input:**
```json
{
  "contractNumber": "CTR-001",
  "accountId": "ACC-999"
}
```

**Final Entity State:** (after relation resolution)
```json
{
  "entity_slug": "contract",
  "attributes": {
    "billing_account": {
      "$relation": [{
        "entity_id": "019a0c06-7190-7509-91c4-ff5bbe3680d8",  // Resolved entity ID
        "_schema": "billing_account",
        "_tags": ["PRIMARY"]
      }]
    }
  }
}
```

### Multiple Relations

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
        "entity_id": "019a0c06-1111-1111-1111-aaaaaaaaaaaa",  // Resolved entity ID
        "_schema": "contact",
        "_tags": ["BILLING"]
      },
      {
        "entity_id": "019a0c06-2222-2222-2222-bbbbbbbbbbbb",  // Resolved entity ID
        "_schema": "contact",
        "_tags": ["TECHNICAL"]
      }
    ]
  }
}
```

### Dynamic Relations with JSONata

Use JSONata to dynamically generate relation items.

**Configuration:**
```json
{
  "attribute": "related_persons",
  "relations": {
    "operation": "_set",
    "jsonataExpression": "persons.{\n  \"entity_schema\": \"contact\",\n  \"unique_ids\": [\n    {\n      \"attribute\": \"email\",\n      \"constant\": email\n    }\n  ],\n  \"_tags\": [role]\n}"
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
        "entity_id": "019a0c06-3333-3333-3333-cccccccccccc",  // Resolved entity ID
        "_schema": "contact",
        "_tags": ["OWNER"]
      },
      {
        "entity_id": "019a0c06-4444-4444-4444-dddddddddddd",  // Resolved entity ID
        "_schema": "contact",
        "_tags": ["USER"]
      }
    ]
  }
}
```

### Relation Unique ID Options

Relation unique IDs support three value sources, similar to field mappings:

**1. Field:**
```json
{
  "attribute": "customer_number",
  "field": "customerNo"
}
```

**2. JSONata Expression:**
```json
{
  "attribute": "full_name",
  "jsonataExpression": "firstName & ' ' & lastName"
}
```

**3. Constant:**
```json
{
  "attribute": "source",
  "constant": "ERP"
}
```

## Meter Readings

Meter readings are a special type of mapping that allows you to extract and transform meter reading data from ERP events. Unlike entity mappings, meter readings are stored as time-series data points associated with specific meters and optionally meter counters.

### Overview

Meter readings mappings enable you to:
- Extract meter reading data from ERP events
- Link readings to specific meters using unique identifiers
- Optionally specify meter counters for multi-tariff meters
- Transform and validate reading data before storage

### Basic Structure

```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "MeterReadingsChanged": {
        "meter_readings": [
          {
            "jsonataExpression": "$.readings",
            "meter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "meter_id"
                }
              ]
            },
            "meter_counter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "counter_id"
                }
              ]
            },
            "fields": [
              {
                "attribute": "external_id",
                "field": "reading_id"
              },
              {
                "attribute": "timestamp",
                "field": "read_at"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
              {
                "attribute": "value",
                "field": "reading_value"
              }
            ]
          }
        ]
      }
    }
  }
}
```

### Required Elements

Each meter_readings configuration must include:

1. **`meter`**: Configuration for identifying the meter
  - **`unique_ids`**: Array of unique identifier mappings (at least one required)
2. **`fields`**: Array of field mappings with these required attributes:
  - **`external_id`**: Unique identifier for this specific reading
  - **`timestamp`**: When the reading was taken (ISO 8601 format)
  - **`source`**: Origin of the reading (e.g., "ERP", "ECP", "MANUAL")
  - **`value`**: The actual meter reading value

Optional elements:
- **`jsonataExpression`**: JSONata expression to extract reading data from the payload. If not provided, the entire payload is used as the reading data. Useful when you need to extract an array of readings from a nested structure.
- **`meter_counter`**: For multi-tariff meters, identifies the specific counter
  - **`unique_ids`**: Array of unique identifier mappings (at least one if specified)

### Unique Identifier Mappings

Both meter and meter_counter unique identifiers support three value sources:

**1. Field Mapping:**
```json
{
  "attribute": "external_id",
  "field": "meter_id"
}
```

**2. JSONata Expression:**
```json
{
  "attribute": "external_id",
  "jsonataExpression": "$string(meter_number)"
}
```

**3. Constant Value:**
```json
{
  "attribute": "meter_type",
  "constant": "electricity"
}
```

### Field Attributes

The `fields` array supports the same mapping types as entity fields:

**Simple Field:**
```json
{
  "attribute": "value",
  "field": "reading_value"
}
```

**JSONata Expression:**
```json
{
  "attribute": "reason",
  "jsonataExpression": "reading_type = 'REGULAR' ? 'regular' : 'irregular'"
}
```

**Constant Value:**
```json
{
  "attribute": "source",
  "constant": "ERP"
}
```

### Example 1: Basic Meter Readings

Extract meter readings from an array in the event payload.

**Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "MeterReadingsChanged": {
        "meter_readings": [
          {
            "jsonataExpression": "$.readings",
            "meter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "meter_id"
                }
              ]
            },
            "fields": [
              {
                "attribute": "external_id",
                "field": "reading_id"
              },
              {
                "attribute": "timestamp",
                "field": "read_at"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
              {
                "attribute": "value",
                "field": "reading_value"
              },
              {
                "attribute": "direction",
                "constant": "feed-in"
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "readings": [
    {
      "meter_id": "M-001",
      "reading_id": "R-001",
      "read_at": "2025-01-15T10:00:00Z",
      "reading_value": 12345.6
    },
    {
      "meter_id": "M-001",
      "reading_id": "R-002",
      "read_at": "2025-01-15T11:00:00Z",
      "reading_value": 12346.2
    }
  ]
}
```

**Output:**
```json
{
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-001"
        }
      },
      "attributes": {
        "external_id": "R-001",
        "timestamp": "2025-01-15T10:00:00Z",
        "source": "ERP",
        "value": 12345.6,
        "direction": "feed-in"
      }
    },
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-001"
        }
      },
      "attributes": {
        "external_id": "R-002",
        "timestamp": "2025-01-15T11:00:00Z",
        "source": "ERP",
        "value": 12346.2,
        "direction": "feed-in"
      }
    }
  ]
}
```

### Example 2: Meter Readings with Counter

For multi-tariff meters where each reading belongs to a specific counter (e.g., day/night tariffs).

**Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "MeterReadingsChanged": {
        "meter_readings": [
          {
            "jsonataExpression": "$.readings",
            "meter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "meter_id"
                }
              ]
            },
            "meter_counter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "tariff_id"
                }
              ]
            },
            "fields": [
              {
                "attribute": "external_id",
                "jsonataExpression": "$string(meter_id) & '-' & $string(tariff_id) & '-' & $string(reading_id)"
              },
              {
                "attribute": "timestamp",
                "field": "read_at"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
              {
                "attribute": "value",
                "field": "reading_value"
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "readings": [
    {
      "meter_id": "M-001",
      "tariff_id": "T1",
      "reading_id": 1,
      "read_at": "2025-01-15T10:00:00Z",
      "reading_value": 5000.5
    },
    {
      "meter_id": "M-001",
      "tariff_id": "T2",
      "reading_id": 2,
      "read_at": "2025-01-15T10:00:00Z",
      "reading_value": 7345.1
    }
  ]
}
```

**Output:**
```json
{
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-001"
        }
      },
      "meter_counter": {
        "$entity_unique_ids": {
          "tariff_id": "T1"
        }
      },
      "attributes": {
        "external_id": "M-001-T1-1",
        "timestamp": "2025-01-15T10:00:00Z",
        "source": "ERP",
        "value": 5000.5
      }
    },
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-001"
        }
      },
      "meter_counter": {
        "$entity_unique_ids": {
          "tariff_id": "T2"
        }
      },
      "attributes": {
        "external_id": "M-001-T2-2",
        "timestamp": "2025-01-15T10:00:00Z",
        "source": "ERP",
        "value": 7345.1
      }
    }
  ]
}
```

### Example 3: Combined Entity and Meter Readings

A single event can map to both entities and meter readings.

**Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "ContractWithReadings": {
        "entities": [
          {
            "entity_schema": "contract",
            "unique_ids": ["contract_number"],
            "fields": [
              {
                "attribute": "contract_number",
                "field": "number"
              },
              {
                "attribute": "display_name",
                "field": "name"
              }
            ]
          }
        ],
        "meter_readings": [
          {
            "jsonataExpression": "$.readings",
            "meter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "meter_id"
                }
              ]
            },
            "fields": [
              {
                "attribute": "external_id",
                "field": "reading_id"
              },
              {
                "attribute": "timestamp",
                "field": "read_at"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
              {
                "attribute": "value",
                "field": "value"
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "number": "CTR-001",
  "name": "Main Contract",
  "readings": [
    {
      "meter_id": "M-001",
      "reading_id": "R-001",
      "read_at": "2025-01-15T10:00:00Z",
      "value": 12345.6
    }
  ]
}
```

**Output:**
```json
{
  "entity_updates": [
    {
      "entity_slug": "contract",
      "unique_identifiers": {
        "contract_number": "CTR-001"
      },
      "attributes": {
        "contract_number": "CTR-001",
        "display_name": "Main Contract"
      }
    }
  ],
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-001"
        }
      },
      "attributes": {
        "external_id": "R-001",
        "timestamp": "2025-01-15T10:00:00Z",
        "source": "ERP",
        "value": 12345.6
      }
    }
  ]
}
```

#### Example 4: Single Meter Reading Without JSONata Expression

When the event payload represents a single meter reading (not an array), you can omit the `jsonataExpression` field. The entire payload will be used as the reading data.

**Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "MeterReadingUpdated": {
        "meter_readings": [
          {
            "meter": {
              "unique_ids": [
                {
                  "attribute": "external_id",
                  "field": "meter_id"
                }
              ]
            },
            "fields": [
              {
                "attribute": "external_id",
                "field": "reading_id"
              },
              {
                "attribute": "timestamp",
                "field": "timestamp"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
              {
                "attribute": "value",
                "field": "value"
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "meter_id": "M-123",
  "reading_id": "R-456",
  "timestamp": "2025-01-15T14:30:00Z",
  "value": 5678.9
}
```

**Output:**
```json
{
  "meter_readings_updates": [
    {
      "meter": {
        "$entity_unique_ids": {
          "external_id": "M-123"
        }
      },
      "attributes": {
        "external_id": "R-456",
        "timestamp": "2025-01-15T14:30:00Z",
        "source": "ERP",
        "value": 5678.9
      }
    }
  ]
}
```

### Validation

The system validates meter readings configurations at runtime:

1. **Meter Configuration**: Each meter_readings item must include a `meter` definition
2. **Meter Unique IDs**: The `meter.unique_ids` array must contain at least one unique identifier
3. **Required Fields**: All meter_readings must include field mappings for:
  - `external_id`
  - `timestamp`
  - `source`
  - `value`
4. **Meter Counter Validation**: If `meter_counter` is specified, it must have at least one unique identifier in its `unique_ids` array

**Validation Error Example:**
```
Meter readings configuration for "MeterReadingsChanged" (item 0) is missing required field attributes: timestamp, source, value
```

The error message includes the item index to help identify which specific meter_readings configuration has the issue when multiple configurations are present.

### Best Practices

1. **Use Descriptive External IDs**: Ensure reading `external_id` values are unique and traceable
   ```json
   {
     "attribute": "external_id",
     "jsonataExpression": "$string(meter_id) & '-' & $string(timestamp) & '-' & $string(reading_type)"
   }
   ```

2. **Standardize Timestamps**: Always use ISO 8601 format for timestamps
   We use the full timestamp for deduplication purposes, so in the case of multiple readings per day use a full timestamp.
   ```json
   {
     "attribute": "timestamp",
     "jsonataExpression": "$fromMillis(unix_timestamp * 1000)"
   }
   ```

3. **Specify Source Clearly**: Use consistent source values across your integration
   ```json
   {
     "attribute": "source",
     "constant": "ERP"
   }
   ```

4**Validate Data Quality**: Use JSONata expressions to ensure data quality
   ```json
   {
     "attribute": "value",
     "jsonataExpression": "$number(reading_value) >= 0 ? $number(reading_value) : 0"
   }
   ```

## Array Attribute Operations

Regular array attributes (like `_tags`, custom array fields, etc.) also support `_set` and `_append` operations. These work similarly to relation operations but for simple array values.

### `_set` for Array Attributes

Replaces the entire array with new values.

**Configuration:**
```json
{
  "attribute": "_tags",
  "field": "tags"  // Assuming this returns an array or uses operations
}
```

**With explicit operation (in attributes object):**
```json
{
  "attributes": {
    "_tags": {
      "_set": ["CUSTOMER", "VIP", "ACTIVE"]
    }
  }
}
```

**Result:**
- Any existing tags are completely replaced
- The entity will have exactly the tags specified

### `_append` for Array Attributes

Adds new values to the end of existing array values.

**Configuration (in attributes object):**
```json
{
  "attributes": {
    "_tags": {
      "_append": ["NEW_TAG", "ANOTHER_TAG"]
    }
  }
}
```

**Example Scenario:**
```
Initial entity state:
{
  "_tags": ["EXISTING_TAG", "CUSTOMER"]
}

After applying _append:
{
  "_tags": ["EXISTING_TAG", "CUSTOMER", "NEW_TAG", "ANOTHER_TAG"]
}
```

**If entity doesn't exist:**
```
Result:
{
  "_tags": ["NEW_TAG", "ANOTHER_TAG"]
}
```

**Important Notes:**
- `_append` preserves existing values and adds new ones to the end
- If the entity doesn't exist, `_append` behaves like `_set`
- No automatic deduplication - if you append a tag that already exists, it will appear twice
- Works with any array-type attribute, not just `_tags`

## Complete Examples

### Example 1: Customer Update Event

Maps a customer change event to a contact entity with billing account relation.

**Mapping Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "CustomerChanged": {
        "entities": [
          {
            "entity_schema": "contact",
            "unique_ids": ["customer_number"],
            "fields": [
              {
                "attribute": "customer_number",
                "field": "customerId"
              },
              {
                "attribute": "first_name",
                "field": "$.name.first"
              },
              {
                "attribute": "last_name",
                "field": "$.name.last"
              },
              {
                "attribute": "email",
                "field": "email"
              },
              {
                "attribute": "full_name",
                "jsonataExpression": "name.first & ' ' & name.last"
              },
              {
                "attribute": "source",
                "constant": "ERP"
              },
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
                          "field": "billingAccountId"
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
    }
  }
}
```

**Input Event:**
```json
{
  "customerId": "CUST-12345",
  "name": {
    "first": "Anna",
    "last": "Schmidt"
  },
  "email": "anna.schmidt@example.com",
  "billingAccountId": "BA-98765"
}
```

**Output Entity:**
```json
{
  "entity_slug": "contact",
  "unique_identifiers": {
    "customer_number": "CUST-12345"
  },
  "attributes": {
    "customer_number": "CUST-12345",
    "first_name": "Anna",
    "last_name": "Schmidt",
    "email": "anna.schmidt@example.com",
    "full_name": "Anna Schmidt",
    "source": "ERP",
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

### Example 2: Contract with Multiple Meters

Creates one contract entity and multiple meter entities from a single event.

**Mapping Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "ContractChanged": {
        "entities": [
          {
            "entity_schema": "contract",
            "unique_ids": ["contract_number"],
            "fields": [
              {
                "attribute": "contract_number",
                "field": "contractNumber"
              },
              {
                "attribute": "start_date",
                "field": "startDate"
              },
              {
                "attribute": "status",
                "jsonataExpression": "active = true ? 'ACTIVE' : 'INACTIVE'"
              }
            ]
          },
          {
            "entity_schema": "meter",
            "unique_ids": ["meter_number"],
            "jsonataExpression": "meters.{\n  \"number\": meterNumber,\n  \"type\": meterType = 'E' ? 'electricity' : meterType = 'G' ? 'gas' : 'other'\n}",
            "fields": [
              {
                "attribute": "meter_number",
                "field": "number"
              },
              {
                "attribute": "meter_type",
                "field": "type"
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "contractNumber": "CTR-2024-001",
  "startDate": "2024-01-01",
  "active": true,
  "meters": [
    { "meterNumber": "M-001", "meterType": "E" },
    { "meterNumber": "M-002", "meterType": "G" },
    { "meterNumber": "M-003", "meterType": "E" }
  ]
}
```

**Output Entities:**
```json
[
  {
    "entity_slug": "contract",
    "unique_identifiers": { "contract_number": "CTR-2024-001" },
    "attributes": {
      "contract_number": "CTR-2024-001",
      "start_date": "2024-01-01",
      "status": "ACTIVE"
    }
  },
  {
    "entity_slug": "meter",
    "unique_identifiers": { "meter_number": "M-001" },
    "attributes": {
      "meter_number": "M-001",
      "meter_type": "electricity"
    }
  },
  {
    "entity_slug": "meter",
    "unique_identifiers": { "meter_number": "M-002" },
    "attributes": {
      "meter_number": "M-002",
      "meter_type": "gas"
    }
  },
  {
    "entity_slug": "meter",
    "unique_identifiers": { "meter_number": "M-003" },
    "attributes": {
      "meter_number": "M-003",
      "meter_type": "electricity"
    }
  }
]
```

### Example 3: Complex Contract with Relations

A comprehensive example showing contract with customer, billing account, and dynamic contact relations.

**Mapping Configuration:**
```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "ContractCreated": {
        "entities": [
          {
            "entity_schema": "contract",
            "unique_ids": ["contract_number"],
            "fields": [
              {
                "attribute": "contract_number",
                "field": "number"
              },
              {
                "attribute": "display_name",
                "field": "displayName"
              },
              {
                "attribute": "contract_type",
                "constant": "ENERGY"
              },
              {
                "attribute": "primary_customer",
                "relations": {
                  "operation": "_set",
                  "items": [
                    {
                      "entity_schema": "contact",
                      "_tags": ["PRIMARY"],
                      "unique_ids": [
                        {
                          "attribute": "customer_number",
                          "field": "customerId"
                        }
                      ]
                    }
                  ]
                }
              },
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
                          "field": "billingAccountId"
                        },
                        {
                          "attribute": "account_type",
                          "constant": "BILLING"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                "attribute": "additional_contacts",
                "relations": {
                  "operation": "_set",
                  "jsonataExpression": "contacts.{\n  \"entity_schema\": \"contact\",\n  \"unique_ids\": [\n    {\n      \"attribute\": \"email\",\n      \"constant\": email\n    }\n  ],\n  \"_tags\": [contactType]\n}"
                }
              }
            ]
          }
        ]
      }
    }
  }
}
```

**Input Event:**
```json
{
  "number": "CTR-2024-042",
  "displayName": "Energy Supply Contract",
  "customerId": "CUST-5678",
  "billingAccountId": "BA-1234",
  "contacts": [
    {
      "email": "technical@example.com",
      "contactType": "TECHNICAL"
    },
    {
      "email": "billing@example.com",
      "contactType": "BILLING"
    }
  ]
}
```

**Output Entity:**
```json
{
  "entity_slug": "contract",
  "unique_identifiers": {
    "contract_number": "CTR-2024-042"
  },
  "attributes": {
    "contract_number": "CTR-2024-042",
    "display_name": "Energy Supply Contract",
    "contract_type": "ENERGY",
    "primary_customer": {
      "$relation": [{
        "entity_id": "019a0c06-1111-1111-1111-111111111111",
        "_schema": "contact",
        "_tags": ["PRIMARY"]
      }]
    },
    "billing_account": {
      "$relation": [{
        "entity_id": "019a0c06-2222-2222-2222-222222222222",
        "_schema": "billing_account"
      }]
    },
    "additional_contacts": {
      "$relation": [
        {
          "entity_id": "019a0c06-3333-3333-3333-333333333333",
          "_schema": "contact",
          "_tags": ["TECHNICAL"]
        },
        {
          "entity_id": "019a0c06-4444-4444-4444-444444444444",
          "_schema": "contact",
          "_tags": ["BILLING"]
        }
      ]
    }
  }
}
```

## Best Practices

### 1. Use Unique Identifiers Wisely
Always map unique_ids from stable identifiers in your ERP system:
```json
{
  "unique_ids": ["customer_number"],
  "fields": [
    {
      "attribute": "customer_number",
      "field": "erpCustomerId"
    }
  ]
}
```

### 2. Leverage Entity-Level JSONata for Arrays
When dealing with array data, use entity-level JSONata:
```json
{
  "jsonataExpression": "items[status='active']",
  "fields": [...]
}
```

### 3. Use Constants for Metadata
Add source information or fixed values:
```json
{
  "attribute": "_source",
  "constant": "SAP_ERP"
},
{
"attribute": "_imported_at",
"jsonataExpression": "$now()"
}
```

### 4. Normalize Data Early
Use JSONata to standardize variations:
```json
{
  "attribute": "status",
  "jsonataExpression": "status in ['active', 'Active', 'ACTIVE'] ? 'ACTIVE' : 'INACTIVE'"
}
```
