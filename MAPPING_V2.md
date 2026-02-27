# ERP Integration Mapping Specification v2.0

## Overview

The ERP Integration Mapping v2.0 provides a powerful and flexible way to transform ERP system events (customer updates, contract changes, etc.) into epilot entity updates. This document explains how to configure mappings to extract, transform, and structure data from your ERP system.

Each mapping configuration is stored per **use case** within an integration. A use case represents a specific event type from your ERP system (e.g., "CustomerChanged", "ContractUpdated").

## Table of Contents

- [Key Concepts](#key-concepts)
- [Basic Structure](#basic-structure)
- [Field Mapping Types](#field-mapping-types)
- [File Proxy URL Mapping](#file-proxy-url-mapping)
- [Repeatable Field Types as Unique Identifiers](#repeatable-field-types-as-unique-identifiers)
- [Entity-Level Processing](#entity-level-processing)
- [Relations](#relations)
  - [Relation Operations](#relation-operations)
  - [Basic Relation with Items](#basic-relation-with-items)
  - [Multiple Relations](#multiple-relations)
  - [Dynamic Relations with JSONata](#dynamic-relations-with-jsonata)
  - [Relation Unique ID Options](#relation-unique-id-options)
- [Pricing / Line Items](#pricing--line-items)
  - [Overview](#overview-1)
  - [Configuration Structure](#configuration-structure-1)
  - [Line Item Types](#line-item-types)
  - [Items Configuration Modes](#items-configuration-modes)
  - [Value Extraction Pattern](#value-extraction-pattern)
  - [Result Mapping](#result-mapping)
  - [Error Handling](#error-handling)
  - [Examples](#examples)
  - [Processing Flow](#processing-flow)
  - [Validation](#validation-1)
- [Meter Readings](#meter-readings)
  - [Overview](#overview)
  - [Basic Structure](#basic-structure)
  - [Required Elements](#required-elements)
  - [Unique Identifier Mappings](#unique-identifier-mappings)
  - [Field Attributes](#field-attributes)
  - [Example 1: Basic Meter Readings](#example-1-basic-meter-readings)
  - [Example 2: Meter Readings with Counter](#example-2-meter-readings-with-counter)
  - [Example 3: Combined Entity and Meter Readings](#example-3-combined-entity-and-meter-readings)
  - [Validation](#validation)
  - [Best Practices](#best-practices-1)
  - [Reading Matching Strategies](#reading-matching-strategies)
- [Operation Modes](#operation-modes)
  - [Entity Deletion with Mode](#entity-deletion-with-mode)
  - [Meter Reading Deletion with Mode](#meter-reading-deletion-with-mode)
  - [Prune Scope Operations](#prune-scope-operations)
  - [Meter Reading Prune Scope Operations](#meter-reading-prune-scope-operations)
- [Array Attribute Operations](#array-attribute-operations)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Deprecated Format](#deprecated-format)

## Key Concepts

### Use Cases and Events

Version 2.0 uses a **use case-based** approach:
- Each **use case** represents a specific event type from your ERP system (e.g., "CustomerChanged", "ContractUpdated")
- Each use case configuration can map to **multiple entities** in epilot, including multiples of the same type
- Each entity mapping can be invoked **multiple times** from array data using JSONata expressions

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

Each use case has its own configuration containing `entities` and optionally `meter_readings`:

```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "jsonataExpression": "...",
      "enabled": true,
      "mode": "upsert",
      "fields": [...]
    }
  ],
  "meter_readings": [...]
}
```

### Configuration Elements

- **`entities`**: Array of entity configurations for this use case
- **`meter_readings`**: Optional array of meter reading configurations
- **`entity_schema`**: The epilot entity schema (e.g., "contact", "contract", "billing_account", see [Core Entities](https://docs.epilot.io/docs/entities/core-entities/))
- **`unique_ids`**: Array of unique identifier configurations (see [Repeatable Field Types as Unique Identifiers](#repeatable-field-types-as-unique-identifiers))
- **`jsonataExpression`**: Optional JSONata expression to pre-process the event data
- **`enabled`**: Optional boolean or JSONata expression to conditionally enable/disable entity processing (defaults to `true`)
- **`mode`**: Optional operation mode - `upsert` (default), `delete`, `purge`, `upsert-prune-scope-purge`, or `upsert-prune-scope-delete` (see [Operation Modes](#operation-modes))
- **`scope`**: Required for `upsert-prune-scope-*` modes - defines which entities to consider for pruning (see [Prune Scope Operations](#prune-scope-operations))
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

## File Proxy URL Mapping

When syncing file entities via inbound use cases, you can use the `file_proxy_url` field type to auto-construct the file proxy download URL. This avoids manually assembling the URL with boilerplate query parameters — `orgId` and `integrationId` are injected automatically from the processing context.

### 5. File Proxy URL Mapping

**Configuration:**
```json
{
  "attribute": "custom_download_url",
  "file_proxy_url": {
    "use_case_id": "uuid-of-file-proxy-use-case",
    "params": {
      "documentId": { "field": "documentId" },
      "tenantId": { "constant": "ACME" }
    }
  }
}
```

**Input:**
```json
{
  "documentId": "DOC-00034157"
}
```

**Output:**
```json
{
  "attributes": {
    "custom_download_url": "https://erp-file-proxy.sls.epilot.io/download?orgId=123&integrationId=abc&useCaseId=uuid-of-file-proxy-use-case&documentId=DOC-00034157&tenantId=ACME"
  }
}
```

The `params` object maps URL parameter names to values resolved from the payload. Each param value supports three resolution modes:

| Mode | Description | Example |
|------|-------------|---------|
| `field` | Source field name or JSONPath expression (if starts with `$`) | `{ "field": "documentId" }` |
| `constant` | Fixed value (any type, stringified for URL) | `{ "constant": "ACME" }` |
| `jsonataExpression` | JSONata expression for transformation | `{ "jsonataExpression": "doc.id" }` |

> **Note:** The standard parameters `orgId`, `integrationId`, and `useCaseId` are always included automatically. You only need to configure additional custom parameters in `params`. If no `integrationContext` is available (e.g., in mapping simulation mode), the `file_proxy_url` field is silently skipped.

See also: [File Proxy Configuration Specification](./FILE_PROXY.md#proxy-url-generation) for details on the proxy URL format and parameter requirements.

## Repeatable Field Types as Unique Identifiers

Some entity fields in epilot are repeatable fields stored as arrays of objects. The most common examples are **email** and **phone** fields:

```json
{
  "email": [{ "email": "user@example.com" }],
  "phone": [{ "phone": "+49123456789" }]
}
```

When using these fields as unique identifiers, special handling is required because:
1. **Search**: The Elasticsearch filter must use the nested path (e.g., `email.email.keyword` instead of `email.keyword`)
2. **Create/Update**: Values must be transformed to the repeatable format when creating or updating entities

### Configuration

To use a repeatable field type as a unique identifier, add the `_type` hint to the **field definition** in the `fields` array:

**Standard field (no _type needed):**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "fields": [
        {
          "attribute": "customer_number",
          "field": "customerId"
        }
      ]
    }
  ]
}
```

**Repeatable field with _type hint:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["email"],
      "fields": [
        {
          "attribute": "email",
          "field": "Email",
          "_type": "email"
        }
      ]
    }
  ]
}
```

**Mixed unique identifiers:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number", "email"],
      "fields": [
        {
          "attribute": "customer_number",
          "field": "customerId"
        },
        {
          "attribute": "email",
          "field": "Email",
          "_type": "email"
        }
      ]
    }
  ]
}
```

### Supported Types

| Type | Storage Format | Search Path | Use Case |
|------|----------------|-------------|----------|
| `email` | `[{ "email": "value" }]` | `email.email.keyword` | Contact email addresses |
| `phone` | `[{ "phone": "value" }]` | `phone.phone.keyword` | Contact phone numbers |

### Complete Example

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["email"],
      "fields": [
        {
          "attribute": "email",
          "field": "Email",
          "_type": "email"
        },
        {
          "attribute": "first_name",
          "field": "FirstName"
        },
        {
          "attribute": "last_name",
          "field": "LastName"
        }
      ]
    }
  ]
}
```

**Input Event:**
```json
{
  "Email": "anna.schmidt@example.com",
  "FirstName": "Anna",
  "LastName": "Schmidt"
}
```

**Behavior:**
1. **Search**: System searches for existing contact using `email.email.keyword: "anna.schmidt@example.com"`
2. **Create**: If not found, creates new contact with email as `[{ "email": "anna.schmidt@example.com" }]`
3. **Update**: If found, patches the existing contact

### Using in Relations

Repeatable field types can also be used in relation unique identifiers using the `_type` property:

```json
{
  "attribute": "primary_contact",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "unique_ids": [
          {
            "attribute": "email",
            "_type": "email",
            "field": "contactEmail"
          }
        ]
      }
    ]
  }
}
```

This allows you to look up related entities by their email address, using the correct search path for the email field.

### Backward Compatibility

Existing configurations without `_type` hints continue to work unchanged. The `_type` hint is only needed for repeatable fields like `email` and `phone`.

### Direct Entity Lookup with `_id`

When using `_id` as the **only** unique identifier, the system performs an optimized direct entity lookup instead of an Elasticsearch search. This is useful for:
- Linking to entities where you already know the exact entity ID
- Performance-critical scenarios where you want to avoid search latency
- Post-action callbacks where entity IDs are already resolved

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["_id"],
      "fields": [
        {
          "attribute": "_id",
          "field": "entityId"
        },
        {
          "attribute": "first_name",
          "field": "firstName"
        }
      ]
    }
  ]
}
```

**Input:**
```json
{
  "entityId": "019a0c06-7190-7509-91c4-ff5bbe3680d8",
  "firstName": "Anna"
}
```

**Behavior:**
1. **Direct lookup**: System fetches entity directly by ID (bypasses Elasticsearch)
2. **Schema validation**: Verifies the entity's schema matches the expected `entity_schema`
3. **Update**: If found and schema matches, patches the entity with the mapped attributes

**Important Notes:**
- The `_id` must be a valid, truthy value (not empty string, null, or undefined)
- If `_id` is combined with other unique identifiers, the standard search behavior is used
- If the entity doesn't exist, an error will be thrown (unlike search which returns null)
- If the entity's schema doesn't match the expected `entity_schema`, an error will be thrown

**Using `_id` in Relations:**

You can also use `_id` as a unique identifier in relations for direct lookup:

```json
{
  "attribute": "primary_contact",
  "relations": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "unique_ids": [
          {
            "attribute": "_id",
            "field": "contactEntityId"
          }
        ]
      }
    ]
  }
}
```

## Field-Level Processing Control

### Using `enabled` for Conditional Fields

The `enabled` property allows you to conditionally include or exclude individual field mappings based on runtime conditions. This provides fine-grained control over which attributes are mapped without modifying your configuration structure.

**Use Cases:**
- Enable/disable specific fields without removing the configuration
- Conditionally map fields based on data presence or values
- Test or gradually roll out new field mappings
- Skip optional fields when data is missing or invalid

**Value Types:**
- **Boolean** (`true`/`false`): Directly control whether the field is processed
- **String (JSONata expression)**: Dynamic evaluation based on the input data
- **Undefined/omitted**: Defaults to `true` (field is always processed)

**Important Notes:**
- The `enabled` property is evaluated for each field independently
- When `enabled` evaluates to `false`, the field value is never extracted or evaluated
- Works with all field types: simple fields, JSONata expressions, constants, and relations

### Example 1: Static Enable/Disable

Control field processing with boolean values.

**Configuration:**
```json
{
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
          "attribute": "email",
          "field": "email",
          "enabled": true
        },
        {
          "attribute": "internal_notes",
          "field": "notes",
          "enabled": false
        }
      ]
    }
  ]
}
```

**Input:**
```json
{
  "customerId": "12345",
  "email": "user@example.com",
  "notes": "Internal only"
}
```

**Result:**
```json
{
  "entity_slug": "contact",
  "uniqueIdentifiers": {
    "customer_number": "12345"
  },
  "attributes": {
    "customer_number": "12345",
    "email": "user@example.com"
  }
}
```

### Example 2: Conditional with JSONata

Use JSONata expressions to dynamically enable fields based on the input data.

**Configuration:**
```json
{
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
          "attribute": "phone",
          "field": "phone",
          "enabled": "$exists(phone) and phone != ''"
        },
        {
          "attribute": "mobile",
          "field": "mobile",
          "enabled": "$exists(mobile)"
        },
        {
          "attribute": "vip_status",
          "constant": "VIP",
          "enabled": "vipFlag = true"
        }
      ]
    }
  ]
}
```

**Input:**
```json
{
  "customerId": "12345",
  "phone": "",
  "mobile": "555-1234",
  "vipFlag": true
}
```

**Result:**
```json
{
  "entity_slug": "contact",
  "uniqueIdentifiers": {
    "customer_number": "12345"
  },
  "attributes": {
    "customer_number": "12345",
    "mobile": "555-1234",
    "vip_status": "VIP"
  }
}
```

**Explanation:**
- `customer_number`: No `enabled` specified -> defaults to `true` -> mapped
- `phone`: `enabled` evaluates to `false` (empty string) -> not mapped
- `mobile`: `enabled` evaluates to `true` (field exists) -> mapped
- `vip_status`: `enabled` evaluates to `true` (vipFlag is true) -> mapped

### Example 3: Conditional Relations

Field-level `enabled` also works with relation mappings, allowing you to conditionally create entity relationships.

**Configuration:**
```json
{
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
        },
        {
          "attribute": "primary_contact",
          "enabled": false,
          "relations": {
            "operation": "_set",
            "items": [
              {
                "entity_schema": "contact",
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
      ]
    }
  ]
}
```

**Input with billing account:**
```json
{
  "number": "CTR-001",
  "billingAccountId": "ACC-999",
  "contactEmail": "john@example.com"
}
```

**Result:**
```json
{
  "entity_slug": "contract",
  "uniqueIdentifiers": {
    "contract_number": "CTR-001"
  },
  "attributes": {
    "contract_number": "CTR-001",
    "billing_account": {
      "$relation": {
        "_set": [
          {
            "$entity_unique_ids": {
              "external_id": "ACC-999"
            },
            "_schema": "billing_account"
          }
        ]
      }
    }
  }
}
```

**Input without billing account:**
```json
{
  "number": "CTR-002",
  "billingAccountId": "",
  "contactEmail": "jane@example.com"
}
```

**Result:**
```json
{
  "entity_slug": "contract",
  "uniqueIdentifiers": {
    "contract_number": "CTR-002"
  },
  "attributes": {
    "contract_number": "CTR-002"
  }
}
```

### Combining Field-Level and Entity-Level `enabled`

Both entity-level and field-level `enabled` properties work together. The entity must be enabled first, then individual fields within that entity are evaluated.

**Evaluation Order:**
1. Entity-level `enabled` is checked -> if `false`, entire entity is skipped
2. Entity-level `jsonataExpression` is applied (if present)
3. For each field:
   - Field-level `enabled` is checked -> if `false`, field is skipped
   - Field value is extracted/evaluated (if enabled)

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": "$exists(customerId)",
      "fields": [
        {
          "attribute": "customer_number",
          "field": "customerId"
        },
        {
          "attribute": "email",
          "field": "email",
          "enabled": "$exists(email)"
        }
      ]
    }
  ]
}
```

In this example:
- If `customerId` doesn't exist -> entire entity is skipped (entity-level `enabled`)
- If `customerId` exists but `email` doesn't -> entity is created with just `customer_number`

## Entity-Level Processing

Entity-level JSONata expressions pre-process data before field mappings are applied. This is powerful for:
- Transforming data structures
- Creating multiple entities from arrays
- Normalizing inconsistent data formats

### Example: Array to Multiple Entities

**Configuration:**
```json
{
  "entities": [
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
      "enabled": true,
      "fields": [...]
    },
    {
      "entity_schema": "contact",
      "unique_ids": ["customer_number"],
      "enabled": false,
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
  "entities": [
    {
      "entity_schema": "meter",
      "unique_ids": ["meter_number"],
      "jsonataExpression": "meters[type='electricity']",
      "enabled": "$count($) > 0",
      "fields": [
        {
          "attribute": "meter_number",
          "field": "number"
        }
      ]
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
2. `enabled` evaluates `$count([...]) > 0` -> `true`

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
2. `enabled` evaluates `$count([]) > 0` -> `false`

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

The `_append` operation **adds** new unique relation items to the end of existing ones (with automatic deduplication). This is useful for incremental updates where you want to preserve existing relations while adding new ones.

**Behavior:**
- Fetches the existing entity to retrieve current relation values
- Appends only NEW items to the end of the existing relation array (duplicates by `entity_id` are filtered out)
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

After applying _append operation with entity_id "existing-1" and "new-1":
{
  "contacts": {
    "$relation": [
      { "entity_id": "existing-1", "_schema": "contact", "_tags": ["EXISTING"] },
      { "entity_id": "new-1", "_schema": "contact", "_tags": ["NEW_CONTACT"] }
    ]
  }
}
```
Note: If "existing-1" was in the append list, it would be filtered out as a duplicate.

**Use Cases:**
- Adding additional contacts or billing accounts to an existing contract
- Incremental updates where the ERP system sends individual relation changes
- Preserving manually added relations while allowing ERP updates

**Important Notes:**
- `_append` requires an additional database lookup to fetch the existing entity
- **Automatic deduplication** - relations with the same `entity_id` are NOT added again
- The operation applies to both relation attributes and regular array attributes (like `_tags`)

#### `_append_all` Operation

The `_append_all` operation **adds** all relation items to the end of existing ones (without deduplication). Use this when you explicitly want to allow duplicate relations.

**Behavior:**
- Fetches the existing entity to retrieve current relation values
- Appends ALL items to the end of the existing relation array (duplicates ARE allowed)
- If the entity doesn't exist, behaves the same as `_set` (creates new entity with specified relations)
- Preserves the order of existing items

**Example:**
```json
{
  "attribute": "contacts",
  "relations": {
    "operation": "_append_all",
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

After applying _append_all operation with entity_id "existing-1" and "new-1":
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
Note: "existing-1" IS duplicated because `_append_all` skips deduplication.

**Use Cases:**
- When you explicitly need duplicate relations (rare use case)
- When deduplication behavior is not desired

**Important Notes:**
- `_append_all` requires an additional database lookup to fetch the existing entity
- **No deduplication** - duplicate relations ARE added
- Use `_append` instead if you want to prevent duplicate relations

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
        "entity_id": "019a0c06-7190-7509-91c4-ff5bbe3680d8",
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

## Relation References

Relation references (`$relation_ref`) allow you to link to a specific item within a repeatable attribute on a related entity. This is commonly used for addresses, where you want to reference not just a contact entity, but a specific address within that contact's address list.

### Basic Concept

While `$relation` links to an entity, `$relation_ref` links to:
1. A related entity (by its `entity_id`)
2. A specific attribute path on that entity (e.g., `"address"`)
3. Optionally, a specific item within a repeatable attribute (by its `_id`)

### Configuration Structure

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
          "jsonataExpression": "{\n  \"street\": BillingStreet,\n  \"city\": BillingCity,\n  \"country\": 'DE',\n  \"postal_code\": BillingPostalCode,\n  \"street_number\": $string(BillingStreetNumber)\n}"
        }
      }
    ]
  }
}
```

### How It Works

1. **Find or create the related entity**: Uses `unique_ids` to find/create the contact
2. **Set the attribute value**: Upserts the `address` attribute on the contact with the provided value
3. **Preserve `_id` values**: Automatically matches existing address items by their content and preserves their `_id` to avoid regeneration
4. **Create the reference**: Links the main entity to the specific address item using `$relation_ref`

### Example: Billing Address Reference

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "opportunity",
      "unique_ids": ["invoice_number"],
      "fields": [
        {
          "attribute": "invoice_number",
          "field": "InvoiceNumber"
        },
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
                  "jsonataExpression": "{\n  \"street\": BillingStreet,\n  \"city\": BillingCity,\n  \"country\": 'DE',\n  \"postal_code\": BillingPostalCode,\n  \"street_number\": $string(BillingStreetNumber)\n}"
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

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

**Processing Flow:**

1. System finds or creates contact with `customer_number: "CUST-123"`
2. Appends the address to the contact's address attribute:
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
3. Creates the relation_ref on the opportunity:
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

### _id Preservation

The system automatically preserves `_id` values when updating repeatable attributes to avoid regenerating them:

- When setting or appending values, the system fetches the existing entity
- It matches new items with existing items using deep equality (excluding `_id`)
- If a match is found, the existing `_id` is preserved
- This ensures stable references even when data is updated

**Example:**

If the contact already has an address:
```json
{
  "address": [
    {
      "_id": "xyz789",
      "street": "Old Street",
      "city": "Munich"
    }
  ]
}
```

And you update it with matching content:
```json
{
  "street": "Old Street",
  "city": "Munich"
}
```

The system will preserve `_id: "xyz789"` instead of generating a new one.

### Operations

Relation references support three operations:

#### _set Operation
Replaces all existing relation_refs with new ones:

```json
{
  "relation_refs": {
    "operation": "_set",
    "items": [...]
  }
}
```

#### _append Operation
Adds new unique relation_refs to existing ones (with automatic deduplication by `entity_id + _id`):

```json
{
  "relation_refs": {
    "operation": "_append",
    "items": [...]
  }
}
```

**Note:** If a relation_ref with the same `entity_id` and `_id` combination already exists, it will NOT be added again.

#### _append_all Operation
Adds all relation_refs to existing ones (without deduplication):

```json
{
  "relation_refs": {
    "operation": "_append_all",
    "items": [...]
  }
}
```

**Note:** Duplicate relation_refs ARE allowed with `_append_all`. Use this when you explicitly need to allow duplicates.

### Value Configuration

The `value` field supports the same configuration options as regular field mappings:

**Field Reference:**
```json
{
  "attribute": "address",
  "field": "AddressData"
}
```

**JSONata Expression:**
```json
{
  "attribute": "address",
  "jsonataExpression": "{\n  \"street\": street,\n  \"city\": city\n}"
}
```

**Constant:**
```json
{
  "attribute": "type",
  "constant": "BILLING"
}
```

### All-or-Nothing Strategy

Like regular relations, relation_refs use an all-or-nothing strategy:

- If ANY related entity in a relation_ref attribute cannot be found, the ENTIRE attribute is deferred to post_actions
- Post_actions will create the missing entities first
- Then the system retries the update with all entities available
- This ensures data integrity and proper ordering of entity creation

### Multiple Relation References

You can reference multiple items in a single attribute:

```json
{
  "attribute": "addresses",
  "relation_refs": {
    "operation": "_set",
    "items": [
      {
        "entity_schema": "contact",
        "unique_ids": [...],
        "path": "address",
        "value": {...}
      },
      {
        "entity_schema": "contact",
        "unique_ids": [...],
        "path": "address",
        "value": {...}
      }
    ]
  }
}
```

## Pricing / Line Items

### Overview

Pricing mappings enable you to calculate prices for line items on contract and order entities as part of inbound ERP event processing. The system:

1. Extracts line item data from the ERP payload
2. Resolves product and price entity references by unique keys (similar to relations)
3. Calls the epilot Pricing API (`calculatePricingDetails`) to compute totals, taxes, and breakdowns
4. Persists the calculated `line_items`, totals, and `total_details` on the target entity

Pricing supports two types of line items:
- **Product/price reference items**: Reference existing product and price entities by unique keys. The Pricing API fetches the full product/price data and computes amounts.
- **Custom items**: Provide a `unit_amount` directly without referencing a product or price entity. Still sent through the Pricing API for tax and total computation.

### Configuration Structure

The `pricing` property is an optional configuration on an entity mapping, at the same level as `fields`:

```json
{
  "entity_schema": "contract",
  "unique_ids": ["external_id"],
  "fields": [...],
  "pricing": {
    "jsonataExpression": "lineItems",
    "items": [...],
    "result_mapping": {...},
    "on_error": "fail"
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `jsonataExpression` | string | No | JSONata expression to extract the line items array from the entity data. If omitted, the entity data itself is used. |
| `items` | array | Yes* | Array of line item configurations. Acts as a template when a single entry is provided. *Required unless `items_jsonata` is used. |
| `items_jsonata` | string | No | JSONata expression that returns the full pricing API input array. Use for complex transformations. Mutually exclusive with `items`. |
| `result_mapping` | object | No | Controls which entity attributes receive the pricing output. See [Result Mapping](#result-mapping). |
| `on_error` | string | No | Error handling strategy: `fail` (default), `skip`, or `warn`. See [Error Handling](#error-handling). |

### Line Item Types

#### Product/Price Reference Items

Reference existing product and price entities by unique keys. The system resolves the entity IDs at runtime, then passes them to the Pricing API.

```json
{
  "product": {
    "entity_schema": "product",
    "unique_ids": [
      { "attribute": "external_id", "field": "productCode" }
    ]
  },
  "price": {
    "entity_schema": "price",
    "unique_ids": [
      { "attribute": "external_id", "field": "tariffId" }
    ]
  },
  "quantity": { "field": "qty" }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `product` | PricingEntityRef | Yes | Reference to the product entity. |
| `price` | PricingEntityRef | No | Reference to the price entity. If omitted, the product must have exactly one active price. |
| `quantity` | FieldValue | Yes | Number of units. |
| `unit_amount_override` | FieldValue | No | Override the price's `unit_amount` for this line item. |
| `description_override` | FieldValue | No | Override the line item description. |

**PricingEntityRef** follows the same pattern as relation unique IDs:

```json
{
  "entity_schema": "product",
  "unique_ids": [
    { "attribute": "external_id", "field": "productCode" }
  ]
}
```

Each `unique_ids` entry supports the same value sources as relation unique IDs:
- `{ "attribute": "...", "field": "..." }` — extract from payload field
- `{ "attribute": "...", "jsonataExpression": "..." }` — compute with JSONata
- `{ "attribute": "...", "constant": "..." }` — fixed value

#### Custom Items

Custom items define a `unit_amount` directly without referencing product/price entities. They are still sent through the Pricing API for consistent tax and total computation.

```json
{
  "_custom": true,
  "description": { "field": "itemName" },
  "unit_amount": { "field": "unitPrice" },
  "unit_amount_currency": { "constant": "EUR" },
  "quantity": { "field": "qty" },
  "tax_rate": { "constant": 19 }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `_custom` | `true` | Yes | Discriminator flag. Must be `true`. |
| `description` | FieldValue | Yes | Line item description. |
| `unit_amount` | FieldValue | Yes | Price per unit (integer, in cents). |
| `unit_amount_decimal` | FieldValue | No | Price per unit as decimal string (e.g., `"12.50"`). Alternative to `unit_amount`. |
| `unit_amount_currency` | FieldValue | No | ISO 4217 currency code. Defaults to `EUR`. |
| `quantity` | FieldValue | Yes | Number of units. |
| `type` | FieldValue | No | `one_time` or `recurring`. Defaults to `one_time`. |
| `billing_period` | FieldValue | No | Required if `type` is `recurring`: `weekly`, `monthly`, `every_quarter`, `every_6_months`, `yearly`. |
| `tax_rate` | FieldValue | No | Tax rate percentage (e.g., `19` for 19%). |

### Items Configuration Modes

#### Template Mode (items array)

Provide one or more item configurations in the `items` array. When the `jsonataExpression` extracts an array of N data items:

- **Single config** in `items`: The config acts as a **template** applied to every extracted data item.
- **N configs** in `items`: Each config maps to the corresponding data item by index.

This is the simplest mode for homogeneous ERP arrays where every line item follows the same structure.

**Single template example:**

```json
{
  "pricing": {
    "jsonataExpression": "positions",
    "items": [
      {
        "product": {
          "entity_schema": "product",
          "unique_ids": [{ "attribute": "external_id", "field": "articleNumber" }]
        },
        "price": {
          "entity_schema": "price",
          "unique_ids": [{ "attribute": "external_id", "field": "priceKey" }]
        },
        "quantity": { "field": "quantity" }
      }
    ]
  }
}
```

With input:
```json
{
  "positions": [
    { "articleNumber": "PROD-A", "priceKey": "TARIFF-1", "quantity": 2 },
    { "articleNumber": "PROD-B", "priceKey": "TARIFF-2", "quantity": 1 }
  ]
}
```

The single template is applied to each position, producing two line items for the pricing API.

#### JSONata Mode (items_jsonata)

Use a JSONata expression for full control over the pricing API input. The expression receives the extracted entity data (after the entity-level and pricing-level `jsonataExpression`) and must return an array of objects matching the Pricing API's `PriceItemsDto` format.

```json
{
  "pricing": {
    "items_jsonata": "$map(positions, function($v) { { 'product_id': $v.productEntityId, 'price_id': $v.priceEntityId, 'quantity': $number($v.qty) } })"
  }
}
```

This mode is useful when:
- Line items need complex transformations that don't fit the template pattern
- Product/price IDs are already resolved in the payload (no entity lookup needed)
- You need conditional logic per item (e.g., different handling based on item type)

> **Note:** In JSONata mode, product/price entity resolution by unique keys is **not** performed automatically. If you need entity lookup, use template mode instead.

### Value Extraction Pattern

All value fields in the pricing configuration (`quantity`, `unit_amount`, `description`, etc.) use the same extraction pattern as the rest of the mapping system:

| Mode | Syntax | Description |
|------|--------|-------------|
| Field reference | `{ "field": "qty" }` | Extract value from payload field. Supports JSONPath with `$` prefix. |
| JSONata expression | `{ "jsonataExpression": "$number(quantity) * factor" }` | Compute value with a JSONata expression. |
| Constant | `{ "constant": "EUR" }` | Fixed value. |

### Result Mapping

By default, the Pricing API response is mapped to standard entity attributes. You can customize the target attribute names using `result_mapping`:

```json
{
  "pricing": {
    "items": [...],
    "result_mapping": {
      "line_items_attribute": "line_items",
      "amount_subtotal_attribute": "amount_subtotal",
      "amount_total_attribute": "amount_total",
      "total_details_attribute": "total_details",
      "currency_attribute": "currency"
    }
  }
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `line_items_attribute` | `line_items` | Entity attribute for the calculated line items array. |
| `amount_subtotal_attribute` | `amount_subtotal` | Entity attribute for the subtotal (before taxes). Set to `null` to skip. |
| `amount_total_attribute` | `amount_total` | Entity attribute for the total (after taxes). Set to `null` to skip. |
| `total_details_attribute` | `total_details` | Entity attribute for the full tax/recurrence breakdown. Set to `null` to skip. |
| `currency_attribute` | `currency` | Entity attribute for the currency code. Set to `null` to skip. |

The pricing result attributes are **merged** with other field-mapped attributes. If a field mapping and the pricing result both set the same attribute, the pricing result takes precedence.

### Error Handling

The `on_error` property controls what happens when pricing calculation fails (e.g., product not found, Pricing API error):

| Strategy | Behavior |
|----------|----------|
| `fail` | **Default.** The entity update fails and is retried via SQS dead-letter queue. Use when pricing data is critical. |
| `skip` | Log a warning and proceed with the entity update without pricing attributes. |
| `warn` | Log a warning, publish a monitoring event, and proceed without pricing attributes. |

**Error scenarios:**
- **Product/price not found**: A referenced product or price entity cannot be found by its unique keys. Unlike relations, missing products/prices are **not** auto-created (they are master data).
- **Pricing API failure**: The `calculatePricingDetails` call returns an error or times out.
- **Partial resolution failure**: If any line item's product/price cannot be resolved, the entire pricing calculation fails (all-or-nothing, consistent with the relation resolution pattern).

### Examples

#### Example 1: Contract with Product/Price References

Map ERP line items to a contract by looking up products and prices by `external_id`.

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contract",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "contractId" },
        { "attribute": "contract_name", "field": "name" },
        {
          "attribute": "billing_contact",
          "relations": {
            "operation": "_set",
            "items": [{
              "entity_schema": "contact",
              "unique_ids": [{ "attribute": "customer_number", "field": "customerId" }]
            }]
          }
        }
      ],
      "pricing": {
        "jsonataExpression": "lineItems",
        "items": [
          {
            "product": {
              "entity_schema": "product",
              "unique_ids": [{ "attribute": "external_id", "field": "productCode" }]
            },
            "price": {
              "entity_schema": "price",
              "unique_ids": [{ "attribute": "external_id", "field": "tariffId" }]
            },
            "quantity": { "field": "quantity" }
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
  "contractId": "V-2024-001",
  "name": "Stromvertrag Haushalt",
  "customerId": "CUST-123",
  "lineItems": [
    { "productCode": "STROM-HH", "tariffId": "BASIC-2024", "quantity": 1 },
    { "productCode": "NETZ-HH", "tariffId": "NETZ-STD", "quantity": 1 }
  ]
}
```

**Processing Flow:**

1. System extracts `lineItems` array via JSONata
2. For each item, resolves the product and price by `external_id`
3. Calls `calculatePricingDetails` with the resolved product/price IDs and quantities
4. Sets `line_items`, `amount_subtotal`, `amount_total`, `total_details`, and `currency` on the contract entity

#### Example 2: Custom Items (No Product/Price)

Use custom items when the ERP provides pre-calculated prices that don't correspond to existing product/price entities.

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "order",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "orderId" },
        { "attribute": "status", "constant": "placed" }
      ],
      "pricing": {
        "jsonataExpression": "items",
        "items": [
          {
            "_custom": true,
            "description": { "field": "itemName" },
            "unit_amount": { "field": "unitPriceCents" },
            "unit_amount_currency": { "constant": "EUR" },
            "quantity": { "field": "qty" },
            "tax_rate": { "constant": 19 }
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
  "orderId": "ORD-5678",
  "items": [
    { "itemName": "Installation Fee", "unitPriceCents": 9900, "qty": 1 },
    { "itemName": "Monthly Service", "unitPriceCents": 2500, "qty": 12 }
  ]
}
```

**Result:** The Pricing API computes taxes and totals for each custom item, and the order is updated with calculated `line_items` and totals.

#### Example 3: Mixed Items

Combine product/price references with custom items by providing multiple configs in the `items` array that map to specific data items by index.

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "contract",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "contractId" }
      ],
      "pricing": {
        "jsonataExpression": "[\n  $map(products, function($v) { $merge([$v, {\"_item_type\": \"product\"}]) }),\n  $map(fees, function($v) { $merge([$v, {\"_item_type\": \"custom\"}]) })\n]",
        "items": [
          {
            "product": {
              "entity_schema": "product",
              "unique_ids": [{ "attribute": "external_id", "field": "productCode" }]
            },
            "price": {
              "entity_schema": "price",
              "unique_ids": [{ "attribute": "external_id", "field": "priceKey" }]
            },
            "quantity": { "field": "quantity" }
          }
        ]
      }
    }
  ]
}
```

> **Tip:** For mixed item types, consider using `items_jsonata` mode for full control over how different item types are handled.

#### Example 4: JSONata Items Expression

Use `items_jsonata` when you need full control over the Pricing API input.

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "order",
      "unique_ids": ["external_id"],
      "fields": [
        { "attribute": "external_id", "field": "orderId" }
      ],
      "pricing": {
        "items_jsonata": "$map(positions, function($v) {\n  $v.type = 'product' ? {\n    'product_id': $v.epilotProductId,\n    'price_id': $v.epilotPriceId,\n    'quantity': $number($v.qty)\n  } : {\n    'description': $v.label,\n    'unit_amount': $v.priceInCents,\n    'unit_amount_currency': 'EUR',\n    'quantity': $number($v.qty),\n    'is_composite_price': false\n  }\n})"
      }
    }
  ]
}
```

**Input:**
```json
{
  "orderId": "ORD-9999",
  "positions": [
    { "type": "product", "epilotProductId": "uuid-1", "epilotPriceId": "uuid-2", "qty": "2" },
    { "type": "fee", "label": "Shipping", "priceInCents": 499, "qty": "1" }
  ]
}
```

The JSONata expression maps each position to the Pricing API format, handling both product-referenced and custom items with full flexibility.

#### Example 5: Unit Amount Override

Override the price entity's `unit_amount` with a value from the ERP payload. Useful when the ERP provides negotiated or custom prices.

**Configuration:**
```json
{
  "pricing": {
    "jsonataExpression": "lineItems",
    "items": [
      {
        "product": {
          "entity_schema": "product",
          "unique_ids": [{ "attribute": "external_id", "field": "productCode" }]
        },
        "price": {
          "entity_schema": "price",
          "unique_ids": [{ "attribute": "external_id", "field": "tariffId" }]
        },
        "quantity": { "field": "qty" },
        "unit_amount_override": { "field": "negotiatedPriceCents" }
      }
    ]
  }
}
```

### Processing Flow

Pricing calculation happens during **entity update processing** (asynchronous, after extraction):

```
ERP Event Payload
    ↓
Stage 1: Extraction (extractEntityUpdatesV2)
    ├── Apply entity-level JSONata
    ├── Map fields, relations, relation_refs
    ├── Extract pricing data via pricing.jsonataExpression
    └── Pass pricing config + extracted data in EntityUpdate message
    ↓
Stage 2: Entity Update Processing (handleEntityUpdate)
    ├── Fetch existing entity
    ├── Resolve relations (existing step)
    ├── Process pricing (NEW step):
    │   ├── Resolve product/price entity refs → product_id/price_id
    │   ├── Build PriceItemsDto input
    │   ├── Call calculatePricingDetails API
    │   └── Merge result into entity attributes
    ├── Create/update entity (with pricing attributes merged)
    └── Queue post_actions if needed
```

This means pricing resolution is **asynchronous** — it does not block extraction of other entities. Products/prices are resolved at the same stage as relations, using the same entity lookup mechanism.

### Validation

- `pricing.items` is required when `items_jsonata` is not provided, and vice versa. They are mutually exclusive.
- Each product/price reference item must have a `product` with at least one `unique_ids` entry.
- Each custom item (`_custom: true`) must have `description`, `unit_amount`, and `quantity`.
- The `pricing` property is only meaningful on entities with pricing capability (typically `contract` or `order`), but this is not enforced at the mapping level.

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
```

### Required Elements

Each meter_readings configuration must include:

1. **`meter`**: Configuration for identifying the meter
   - **`unique_ids`**: Array of unique identifier mappings (at least one required)
2. **`fields`**: Array of field mappings with these required attributes:
   - **`external_id`**: Unique identifier for this specific reading
   - **`timestamp`**: When the reading was taken (ISO 8601 format)
   - **`source`**: Origin of the reading. Must be one of: `ERP`, `ECP`, `360`, `journey-submission`
   - **`value`**: The actual meter reading value
   - **`reason`** *(optional)*: Reason for the reading. Must be one of: `regular`, `irregular`, `last`, `first`, `meter_change`, `contract_change`, `meter_adjustment`, or empty/null. Invalid values will be rejected with a validation error.

Optional elements:
- **`mode`**: Operation mode - `upsert` (default) or `delete`. Note: `purge` is not supported for meter readings. See [Operation Modes](#operation-modes)
- **`reading_matching`**: Matching strategy - `external_id` (default) or `strict-date`. See [Meter Reading Deletion with Mode](#meter-reading-deletion-with-mode)
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

A single use case can map to both entities and meter readings.

**Configuration:**
```json
{
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
Meter readings configuration (item 0) is missing required field attributes: timestamp, source, value
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

4. **Validate Data Quality**: Use JSONata expressions to ensure data quality
   ```json
   {
     "attribute": "value",
     "jsonataExpression": "$number(reading_value) >= 0 ? $number(reading_value) : 0"
   }
   ```

### Reading Matching Strategies

By default, meter readings use `external_id` for upsert matching. However, when readings originate from ECP (End Customer Portal) and are later echoed back by the ERP system, duplicates can occur because:
- ECP readings don't have an `external_id` initially
- ERP often truncates timestamps to date precision, causing timestamp mismatches

The `reading_matching` option allows you to configure how incoming readings are matched against existing readings.

**Available Strategies:**

| Strategy | Description                                                           |
|----------|-----------------------------------------------------------------------|
| `external_id` | Default. Match readings by `external_id` attribute (default behavior) |
| `strict-date` | Match by meter_id + counter_id + direction + date (German timezone)   |

**Configuration:**
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

**`strict-date` Strategy Details:**

When using `strict-date`:
1. Before creating a reading, the system looks up existing readings for the same meter_id + counter_id + direction on the same **German calendar day** (Europe/Berlin timezone)
2. If a **single match** is found: The existing reading is updated with ERP data (including setting `external_id` for future syncs)
3. If **multiple matches** are found: An error is logged and the operation is skipped (to avoid creating duplicates)
4. If **no match** is found: A new reading is created normally

**Why German Timezone?**

ECP users in Germany submit readings that are stored with full timestamp precision. When the ERP echoes the reading back, it often truncates to date-only (e.g., `2025-01-15T00:00:00Z`). By comparing dates in German timezone:
- A reading submitted at 23:30 CET on Jan 15 will match an ERP echo dated Jan 15
- Timestamps across the UTC midnight boundary are handled correctly

**Example: ECP -> ERP Roundtrip**

1. Customer submits reading via ECP at `2025-01-15T14:30:45.123Z` (15:30 German time)
2. Reading is saved in metering-api without `external_id`
3. ERP receives the reading and echoes it back with `timestamp: "2025-01-15T00:00:00Z"` and `external_id: "ERP-12345"`
4. With `reading_matching: "strict-date"`:
   - System finds existing reading on Jan 15 (German date)
   - Updates it with ERP's `external_id`, `timestamp`, and `value`
   - Future ERP updates will match by `external_id`

**Expected Behavior Matrix:**

| Scenario | Result |
|----------|--------|
| ECP submission -> ERP echo | Update existing ECP reading, set `external_id` |
| ERP sends same reading multiple times | All updates hit the same record |
| ERP modifies value | Overwrites ECP value (ERP is source of truth) |
| Reading only from ERP (no prior ECP) | Creates new reading normally |
| Multiple readings on same date | Log error, skip to avoid duplicate |

**Complete Example:**

```json
{
  "meter_readings": [
    {
      "reading_matching": "strict-date",
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
        },
        {
          "attribute": "direction",
          "field": "direction"
        }
      ]
    }
  ]
}
```

## Operation Modes

Version 2.0 supports a `mode` field on entity and meter reading configurations to control how the data is processed

### Mode Options

| Mode | Description |
|------|-------------|
| `upsert` | Create or update the entity/reading (default behavior) |
| `delete` | Soft delete - marks as deleted but keeps in Recycle Bin for 30 days |
| `purge` | Hard delete - permanently removes from the system |
| `upsert-prune-scope-purge` | Upsert entities from array, then hard delete entities in scope that weren't upserted |
| `upsert-prune-scope-delete` | Upsert entities from array, then soft delete entities in scope that weren't upserted |
| `upsert-prune-scope` | (Meter readings only) Upsert readings from array, then delete all other readings for the same meter+counter that weren't upserted |

> **Note:** The `upsert-prune-scope-*` modes require a `scope` configuration. The `upsert-prune-scope` mode is for meter readings only and uses the meter+counter as natural scope.

### Entity Deletion with Mode

To delete entities, use the `entities` array with `mode: "delete"` or `mode: "purge"`:

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

#### Example: Billing Event Deletion

**Configuration:**
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

**Input:**
```json
{
  "billing_event_id": "002800699425-2025-08-15"
}
```

**Result:** The billing_event entity with `external_id = "002800699425-2025-08-15"` will be permanently deleted.

#### Example: Conditional Deletion with JSONata

You can use JSONata expressions to conditionally process deletions:

```json
{
  "entities": [
    {
      "entity_schema": "contract",
      "unique_ids": ["contract_number"],
      "mode": "delete",
      "enabled": "status = 'TERMINATED'",
      "fields": [
        {
          "attribute": "contract_number",
          "field": "contract_id"
        }
      ]
    }
  ]
}
```

### Meter Reading Deletion with Mode

To delete meter readings, use the `meter_readings` array with `mode: "delete"`:

```json
{
  "meter_readings": [
    {
      "mode": "delete",
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
        }
      ]
    }
  ]
}
```

The meter reading configuration uses the same fields as regular meter reading mappings (see [Meter Readings](#meter-readings)). Set `mode: "delete"` to delete readings. Note that `purge` is not supported for meter readings - deletion is always permanent.

The `reading_matching` strategy is particularly useful for deletion when readings may not have a stable `external_id`.

#### Example: Meter Reading Deletion with Strict Date Matching

**Configuration:**
```json
{
  "meter_readings": [
    {
      "mode": "delete",
      "reading_matching": "strict-date",
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
        }
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

**Result:** The meter reading with `external_id = "R-67890"` associated with meter `M-12345` will be deleted.

### Mixed Operations in One Configuration

You can mix upsert and delete operations in the same use case by using multiple entity/meter_reading entries with different modes:

```json
{
  "entities": [
    {
      "entity_schema": "meter",
      "unique_ids": ["external_id"],
      "mode": "upsert",
      "fields": [
        {
          "attribute": "external_id",
          "field": "meter_id"
        },
        {
          "attribute": "status",
          "constant": "DECOMMISSIONED"
        }
      ]
    },
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "mode": "purge",
      "jsonataExpression": "billing_events",
      "fields": [
        {
          "attribute": "external_id",
          "field": "event_id"
        }
      ]
    }
  ]
}
```

This configuration updates the meter status to "DECOMMISSIONED" while also purging the associated billing events.

### Prune Scope Operations

The `upsert-prune-scope-purge` and `upsert-prune-scope-delete` modes enable a powerful sync pattern: upsert all entities from an array in the payload, then delete/purge entities within a defined scope that weren't included in the upsert.

This is ideal for synchronizing child entity collections, such as:
- Syncing all billing events for a billing account

| Mode | Description |
|------|-------------|
| `upsert-prune-scope-purge` | Upsert entities from array, then permanently delete entities in scope not upserted |
| `upsert-prune-scope-delete` | Upsert entities from array, then soft delete entities in scope not upserted |

#### Scope Configuration

When using prune scope modes, you must provide a `scope` configuration that defines how to identify which existing entities should be considered for deletion. The scope is resolved against the **original event payload** (not individual array items).

##### scope_mode Options

| Mode | Description |
|------|-------------|
| `relations` | Find scope by looking at all entities related to a specific entity (both direct and reverse relations) |
| `query` | Find scope entities directly via query parameters |

##### Example: Sync Billing Events for a Billing Account

**Use Case:** When receiving a billing account update with billing events, sync all billing events and remove any that are no longer in the payload.

**Configuration:**
```json
{
  "entities": [
    {
      "entity_schema": "billing_event",
      "unique_ids": ["external_id"],
      "jsonataExpression": "$map(billingevents[], function($v) { $merge([$v, { \"billingaccountnumber\": billingaccountnumber }]) })",
      "mode": "upsert-prune-scope-purge",
      "scope": {
        "scope_mode": "relations",
        "schema": "billing_account",
        "unique_ids": [
          {
            "attribute": "billing_account_number",
            "field": "billingaccountnumber"
          }
        ]
      },
      "fields": [
        {
          "attribute": "external_id",
          "field": "billing_event_number"
        },
        {
          "attribute": "billing_account_number",
          "field": "billingaccountnumber"
        }
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

##### Example: Query Mode for Direct Matching

**Use Case:** Find scope entities directly by query parameters instead of through relations.

**Configuration:**
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
        {
          "attribute": "external_id",
          "field": "billing_event_number"
        },
        {
          "attribute": "billing_account_number",
          "field": "billingaccountnumber"
        }
      ]
    }
  ]
}
```

#### Important Notes

1. **Scope Resolution**: The `scope` configuration is resolved against the **original event payload**, not individual array items. This means scope fields reference top-level properties in the payload.

2. **Empty Arrays**: If the array yields zero entities (e.g., `billingevents: []`), this will result in the deletion of all entities in the scope.

### Meter Reading Prune Scope Operations

The `upsert-prune-scope` mode for meter readings enables a sync pattern similar to entity prune scope: upsert all readings from the payload for a given meter/counter, then permanently delete all other readings for that meter/counter that weren't part of the upsert.

The scope is naturally defined by **meter + counter** — no explicit `scope_mode` is needed.

An optional `scope` object can be added to restrict pruning to readings from a specific source.

#### Scope Configuration (optional)

| Property | Required | Description |
|----------|----------|-------------|
| `source` | No | When set, only readings with this source are eligible for pruning |

#### Example: Basic Meter Reading Prune Scope

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

This configuration upserts all readings from the `readings` array, then deletes any other readings for the same meter+counter that weren't in the payload.

#### Example: With Source Scope

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

#### Important Notes

1. **Scope**: The scope is always all readings for the meter + counter.
2. **Permanent Deletion**: Meter reading deletion is always permanent (no soft delete/purge distinction).
3. **Source Filter Recommended**: Use `source` to avoid accidentally deleting readings from other sources (e.g., manually entered readings).
4. **Empty Payload**: If the payload yields zero readings, all readings in scope will be deleted (the ERP is treated as source of truth).
5. **External ID**: The `external_id` attribute is used to identify which readings to keep during pruning.

## Array Attribute Operations

Regular array attributes (like `_tags`, custom array fields, etc.) support `_set`, `_append`, and `_append_all` operations. These work similarly to relation operations but for simple array values.

### `_set` for Array Attributes

Replaces the entire array with new values.

**Configuration:**
```json
{
  "attribute": "_tags",
  "field": "tags"
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

Adds new unique values to the end of existing array values (with automatic deduplication).

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

After applying _append with ["CUSTOMER", "NEW_TAG"]:
{
  "_tags": ["EXISTING_TAG", "CUSTOMER", "NEW_TAG"]
}
```
Note: "CUSTOMER" is not duplicated because it already exists.

**If entity doesn't exist:**
```
Result:
{
  "_tags": ["NEW_TAG", "ANOTHER_TAG"]
}
```

**Important Notes:**
- `_append` preserves existing values and adds only new ones to the end
- If the entity doesn't exist, `_append` behaves like `_set`
- **Automatic deduplication** - duplicate values are NOT added
- Works with any array-type attribute, not just `_tags`

### `_append_all` for Array Attributes

Adds all values to the end of existing array values (without deduplication).

**Configuration (in attributes object):**
```json
{
  "attributes": {
    "_tags": {
      "_append_all": ["NEW_TAG", "ANOTHER_TAG"]
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

After applying _append_all with ["CUSTOMER", "NEW_TAG"]:
{
  "_tags": ["EXISTING_TAG", "CUSTOMER", "CUSTOMER", "NEW_TAG"]
}
```
Note: "CUSTOMER" IS duplicated because `_append_all` skips deduplication.

**If entity doesn't exist:**
```
Result:
{
  "_tags": ["NEW_TAG", "ANOTHER_TAG"]
}
```

**Important Notes:**
- `_append_all` preserves existing values and adds ALL new values to the end
- If the entity doesn't exist, `_append_all` behaves like `_set`
- **No deduplication** - duplicate values ARE added
- Use this when you explicitly want to allow duplicates

## Complete Examples

### Example 1: Customer Update Use Case

Maps a customer change event to a contact entity with billing account relation.

**Use Case Configuration:**
```json
{
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

**Use Case Configuration:**
```json
{
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

**Use Case Configuration:**
```json
{
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

### Example 4: Conditional Field Processing with `enabled`

A comprehensive example demonstrating field-level conditional processing using both boolean and JSONata `enabled` expressions.

**Use Case Configuration:**
```json
{
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
          "field": "firstName"
        },
        {
          "attribute": "last_name",
          "field": "lastName"
        },
        {
          "attribute": "email",
          "field": "email",
          "enabled": "$exists(email) and email != ''"
        },
        {
          "attribute": "phone",
          "field": "phone",
          "enabled": "$exists(phone) and phone != ''"
        },
        {
          "attribute": "mobile",
          "field": "mobile",
          "enabled": "$exists(mobile) and mobile != ''"
        },
        {
          "attribute": "vip_status",
          "constant": "VIP",
          "enabled": "isVip = true"
        },
        {
          "attribute": "customer_type",
          "jsonataExpression": "customerType = 'B' ? 'BUSINESS' : 'PRIVATE'",
          "enabled": "$exists(customerType)"
        },
        {
          "attribute": "internal_notes",
          "field": "internalNotes",
          "enabled": false
        },
        {
          "attribute": "marketing_consent",
          "field": "marketingConsent",
          "enabled": "$exists(marketingConsent)"
        },
        {
          "attribute": "billing_account",
          "enabled": "$exists(billingAccountId) and billingAccountId != ''",
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
        },
        {
          "attribute": "contract",
          "enabled": "$exists(contractNumber)",
          "relations": {
            "operation": "_set",
            "items": [
              {
                "entity_schema": "contract",
                "unique_ids": [
                  {
                    "attribute": "contract_number",
                    "field": "contractNumber"
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

**Input Event (with all optional data):**
```json
{
  "customerId": "CUST-2024-001",
  "firstName": "Maria",
  "lastName": "Garcia",
  "email": "maria.garcia@example.com",
  "phone": "+49-123-456789",
  "mobile": "",
  "isVip": true,
  "customerType": "B",
  "internalNotes": "High value customer - handle with care",
  "marketingConsent": true,
  "billingAccountId": "BA-12345",
  "contractNumber": "CTR-2024-999"
}
```

**Output Entity (with all optional data):**
```json
{
  "entity_slug": "contact",
  "uniqueIdentifiers": {
    "customer_number": "CUST-2024-001"
  },
  "attributes": {
    "customer_number": "CUST-2024-001",
    "first_name": "Maria",
    "last_name": "Garcia",
    "email": "maria.garcia@example.com",
    "phone": "+49-123-456789",
    "vip_status": "VIP",
    "customer_type": "BUSINESS",
    "marketing_consent": true,
    "billing_account": {
      "$relation": {
        "_set": [
          {
            "$entity_unique_ids": {
              "external_id": "BA-12345"
            },
            "_schema": "billing_account",
            "_tags": ["PRIMARY"]
          }
        ]
      }
    },
    "contract": {
      "$relation": {
        "_set": [
          {
            "$entity_unique_ids": {
              "contract_number": "CTR-2024-999"
            },
            "_schema": "contract"
          }
        ]
      }
    }
  }
}
```

**Note:** Fields excluded from output:
- `mobile`: Empty string (enabled condition failed)
- `internal_notes`: Explicitly disabled with `enabled: false`

**Input Event (minimal data - many fields disabled):**
```json
{
  "customerId": "CUST-2024-002",
  "firstName": "John",
  "lastName": "Smith",
  "email": "",
  "phone": "+49-987-654321",
  "isVip": false,
  "billingAccountId": ""
}
```

**Output Entity (minimal data):**
```json
{
  "entity_slug": "contact",
  "uniqueIdentifiers": {
    "customer_number": "CUST-2024-002"
  },
  "attributes": {
    "customer_number": "CUST-2024-002",
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+49-987-654321"
  }
}
```

**Note:** Fields excluded from output:
- `email`: Empty string (enabled condition failed)
- `mobile`: Field doesn't exist in input (enabled condition failed)
- `vip_status`: isVip is false (enabled condition failed)
- `customer_type`: customerType field doesn't exist (enabled condition failed)
- `internal_notes`: Explicitly disabled with `enabled: false`
- `marketing_consent`: Field doesn't exist in input (enabled condition failed)
- `billing_account`: billingAccountId is empty string (enabled condition failed)
- `contract`: contractNumber field doesn't exist (enabled condition failed)

This example demonstrates how the `enabled` property allows the same mapping configuration to handle various data completeness scenarios gracefully, including only the fields that have valid data.

## Best Practices

### 1. Use Unique Identifiers Wisely
Always map unique_ids from stable identifiers in your ERP system:
```json
{
  "entities": [
    {
      "unique_ids": ["customer_number"],
      "fields": [
        {
          "attribute": "customer_number",
          "field": "erpCustomerId"
        }
      ]
    }
  ]
}
```

### 2. Leverage Entity-Level JSONata for Arrays
When dealing with array data, use entity-level JSONata:
```json
{
  "entities": [
    {
      "jsonataExpression": "items[status='active']",
      "fields": [...]
    }
  ]
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

## Deprecated Format

Prior to the use case-based API, mapping configurations were wrapped in a versioned structure with explicit event names:

```json
{
  "version": "2.0",
  "mapping": {
    "events": {
      "CustomerChanged": {
        "entities": [...],
        "meter_readings": [...]
      }
    }
  }
}
```

This format is **deprecated**. Configurations are now stored directly per use case without the `version`, `mapping`, or `events` wrappers. When creating or updating use cases via the API, use the flat structure documented throughout this specification. The v1 mapping simulation endpoint (`/v1/erp/updates/mapping_simulation`) still accepts the old format for backward compatibility, but the v2 endpoint (`/v2/erp/updates/mapping_simulation`) and the use case API expect the new per-use-case format.
