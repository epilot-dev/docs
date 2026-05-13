---
sidebar_position: 2
title: Mapping
description: Configure how ERP data transforms into epilot entities
---

# Mapping

Mapping defines how ERP data transforms into epilot entities. This page covers the configuration structure and available options.

## Mapping Configuration

A mapping configuration consists of one or more entity definitions:

```json title="Mapping configuration"
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
| `mode` | string | No | Operation mode: `upsert` (default), `delete`, `purge`, `upsert-prune-scope-purge`, or `upsert-prune-scope-delete`. See [Operation Modes](#operation-modes). For meter readings, see also `upsert-prune-scope` in [Meter Reading Prune Scope Operations](#meter-reading-prune-scope-operations) |
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

### File Proxy URL Mapping {#file-proxy-url-mapping}

When syncing file entities via inbound use cases, you can use the `file_proxy_url` field type to auto-construct the file proxy download URL. This avoids manually assembling the URL with boilerplate query parameters — `orgId` and `integrationId` are injected automatically from the processing context.

**Configuration (using slug — portable):**
```json
{
  "attribute": "custom_download_url",
  "file_proxy_url": {
    "use_case_slug": "document-download",
    "params": {
      "documentId": { "field": "documentId" },
      "tenantId": { "constant": "ACME" }
    }
  }
}
```

**Configuration (using UUID — legacy):**
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

Exactly one of `use_case_id` or `use_case_slug` must be provided. Using `use_case_slug` is recommended as it makes the configuration portable across environments.
Slug format: `^[a-z0-9][a-z0-9_-]*$` (1-255 chars).

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
    "custom_download_url": "https://erp-file-proxy.sls.epilot.io/download?orgId=123&integrationId=abc&useCaseSlug=document-download&documentId=DOC-00034157&tenantId=ACME"
  }
}
```

The `params` object maps URL parameter names to values resolved from the payload. Each param value supports three resolution modes:

| Mode | Description | Example |
|------|-------------|---------|
| `field` | Source field name or JSONPath expression (if starts with `$`) | `{ "field": "documentId" }` |
| `constant` | Fixed value (any type, stringified for URL) | `{ "constant": "ACME" }` |
| `jsonataExpression` | JSONata expression for transformation | `{ "jsonataExpression": "doc.id" }` |

> **Note:** The standard parameters `orgId`, `integrationId`, and `useCaseId`/`useCaseSlug` are always included automatically. You only need to configure additional custom parameters in `params`. If no `integrationContext` is available (e.g., in mapping simulation mode), the `file_proxy_url` field is silently skipped.

See also: [File Proxy Configuration](../file-proxy#proxy-url-generation) for details on the proxy URL format and parameter requirements.

### Portal Reference Mapping {#portal-ref-mapping}

When mapping inbound data to entities that reference an epilot portal (e.g. `portal_user`, `file`), use the `portal_ref` field type to resolve a real portal of the calling organization at runtime — no need to hard-code environment-specific portal UUIDs in your mapping.

**Configuration:**
```json
{
  "attribute": "portal_id",
  "portal_ref": {
    "filter": {
      "origin": "END_CUSTOMER_PORTAL",
      "enabled": true,
      "is_dummy": false
    },
    "select": "single",
    "return": "portal_id"
  }
}
```

**Field reference:**

| Field | Type | Default | Notes |
|---|---|---|---|
| `filter.origin` | `PORTAL_ORIGIN \| PORTAL_ORIGIN[]` | _any_ | Restricts by portal origin. One of `END_CUSTOMER_PORTAL`, `INSTALLER_PORTAL`, `B2B_PORTAL`, `ADDITIONAL_PORTAL`. Filter only — does not influence ordering. |
| `filter.enabled` | `boolean \| null` | `true` | Set `null` to ignore. |
| `filter.is_dummy` | `boolean \| null` | `false` | Set `null` to ignore. |
| `filter.is_epilot_domain` | `boolean` | _unset_ | Optional restriction. |
| `filter.name` | `string` | _unset_ | Exact match. |
| `filter.domain` | `string` | _unset_ | Exact match. |
| `select` | `"single" \| "all"` | `"single"` | `single` returns the oldest match; `all` returns the filtered+sorted array (0, 1, or many). |
| `return` | `"portal_id" \| "origin" \| "domain" \| "name" \| "jsonata"` | `"portal_id"` | Determines which value(s) to emit. When `"jsonata"`, the sibling `jsonataExpression` is required. |
| `jsonataExpression` | `string` | — | Required when `return: "jsonata"`. With `select: "single"`, evaluated against the matched portal object. With `select: "all"`, evaluated against the full array. |

**Ordering:** When `select: "single"`, the resolver sorts matched portals ascending by `(_created_at, portal_id)` and returns the first. Portals missing `_created_at` (legacy data predating timestamp tracking) sort first — they are treated as oldest. Ordering is deterministic; no warning is emitted when multiple portals match.

**Example: return all enabled end-customer-portal domains as an array**
```json
{
  "attribute": "ecp_domains",
  "portal_ref": {
    "filter": { "origin": "END_CUSTOMER_PORTAL", "enabled": true },
    "select": "all",
    "return": "domain"
  }
}
```

**Example: derive a portal_id from a name pattern using JSONata**
```json
{
  "attribute": "portal_id",
  "portal_ref": {
    "filter": { "origin": "INSTALLER_PORTAL" },
    "select": "single",
    "return": "jsonata",
    "jsonataExpression": "$.portal_id"
  }
}
```

**Monitoring codes:** Three codes are emitted when `portal_ref` resolution does not produce a value:

- `PORTAL_REF_NO_MATCH` (warning) — `select: "single"` found zero portals matching the filter. The attribute is omitted from the resulting entity.
- `PORTAL_REF_AMBIGUOUS` (warning) — `select: "single"` matched more than one portal. The resolver still returns the oldest match (by `_created_at`, then `portal_id`); the warning is informational so authors can tighten their filter.
- `PORTAL_REF_LOOKUP_FAILED` (error) — the portal API call failed (network error, auth failure, downstream outage).
- `PORTAL_REF_JSONATA_FAILED` (error) — `return: "jsonata"` evaluation threw (timeout, runtime error, compile failure).

All three are visible via the standard ERP monitoring stream alongside extraction errors.

**Caching:** Portal configurations are cached for 5 minutes per organization within each Lambda warm pool — config changes propagate within that window.

### Environment Variable Reference Mapping {#env-var-ref-mapping}

When mapping inbound data to entities and you need an org-scoped environment-specific value (e.g. an external ID prefix, a base URL, a domain identifier), use the `env_var_ref` field type to resolve it from the org's epilot environment configuration at runtime. The resolved value is the current configured value for the calling organization — no need to hard-code environment-specific constants in your mapping.

**Configuration:**
```json
{
  "attribute": "external_id_prefix",
  "env_var_ref": {
    "key": "erp_api.external_id_prefix"
  }
}
```

**Example: with a default fallback**
```json
{
  "attribute": "external_id_prefix",
  "env_var_ref": {
    "key": "erp_api.external_id_prefix",
    "default": "EPL"
  }
}
```

When `default` is supplied, the resolver returns the literal default value when the key is missing AND suppresses the `ENV_VAR_REF_NOT_FOUND` warning (the author signalled that the absence is expected).

**Example: with a JSONata transform**
```json
{
  "attribute": "normalized_url",
  "env_var_ref": {
    "key": "erp_api.base_url",
    "return": "jsonata",
    "jsonataExpression": "$lowercase($)"
  }
}
```

**Field reference:**

| Field | Type | Default | Notes |
|---|---|---|---|
| `key` | `string` | _required_ | Must match the regex `^[a-z0-9][a-z0-9_.-]{0,127}$` (mirrors the environments-api key validation). Validated at plan-load time so a typo fails fast. |
| `default` | `string` | _unset_ | String literal returned when the key is missing OR resolves to a secret. When supplied, `ENV_VAR_REF_NOT_FOUND` is NOT emitted. |
| `return` | `"value" \| "jsonata"` | `"value"` | Controls the output shape. With `"value"`, the resolved string is returned as-is. With `"jsonata"`, the sibling `jsonataExpression` is required. |
| `jsonataExpression` | `string` | — | Required when `return: "jsonata"`. Evaluated against the resolved string; `$` in the expression IS the value. |

**JSONata input shape:** When `return: "jsonata"`, the resolved string value is the JSONata input — `$` in your expression refers to the string. Use string functions (`$lowercase($)`, `$uppercase($)`, `$split($, ',')`, etc.) to transform it. The evaluation has a 100ms timeout.

**Secrets handling:** Secrets are never exposed via `env_var_ref`. The runtime filters secret keys out via the environments-api metadata endpoint, treating both 'missing' and 'secret' as identical undefined outcomes (no info disclosure via error code). For secret-resolving contexts (e.g. authorization headers in managed-call or file-proxy), use the templated `{{ env.<key> }}` syntax instead — that mechanism DOES decrypt secrets at runtime. The two systems share `@epilot/environments` under the hood but are semantically distinct: `env_var_ref` is a typed field variant for non-secret config; `{{ env.<key> }}` is template interpolation that resolves secrets.

**Monitoring codes:** Three codes are emitted when `env_var_ref` resolution does not produce a value:

- `ENV_VAR_REF_NOT_FOUND` (warning) — Key was missing OR resolves to a secret, and no `default` was supplied. The attribute is omitted from the resulting entity.
- `ENV_VAR_REF_LOOKUP_FAILED` (error) — The environments-api call failed (Lambda invoke error, network failure), OR the IntegrationContext is missing env-var lookup capability.
- `ENV_VAR_REF_JSONATA_FAILED` (error) — `return: "jsonata"` expression threw at evaluation time (timeout, runtime error, compile failure).

All three are visible via the standard ERP monitoring stream alongside extraction errors.

**Caching:**
- The non-secret key set used for secret filtering is cached in-memory per Lambda warm pool for **5 minutes per organization**, with in-flight request coalescing so concurrent `env_var_ref` resolutions share one metadata fetch.
- Resolved values are cached for **60 seconds per `(org, key)`** by the `@epilot/environments` package.
- Adding or removing an env var becomes visible to `env_var_ref` within 5 minutes; changing the value of an existing non-secret var becomes visible within 60 seconds.

## Repeatable Fields

Email and phone fields in epilot are stored as arrays. Use `_type` to specify the field type:

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
| `upsert-prune-scope` | (Meter readings only) Upsert readings from array, then delete all other readings for the same meter+counter that weren't upserted |

:::note
The `upsert-prune-scope-*` modes require a `scope` configuration. See [Prune Scope Operations](#prune-scope-operations). The `upsert-prune-scope` mode is for meter readings only and uses the meter+counter as natural scope. See [Meter Reading Prune Scope Operations](#meter-reading-prune-scope-operations).
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

The `upsert-prune-scope-purge` and `upsert-prune-scope-delete` modes upsert all entities from an array in the payload, then delete/purge entities within a defined scope that weren't included in the upsert.

This is ideal for synchronizing child entity collections, such as billing events for a billing account.

#### Scope Configuration

Prune-scope modes require a `scope` configuration that defines which existing entities are eligible for deletion. The scope resolves against the **original event payload** (not individual array items).

##### scope_mode Options

| Mode | Description |
|------|-------------|
| `relations` | Find scope by looking at all entities related to a specific entity (both direct and reverse relations) |
| `query` | Find scope entities directly via query parameters |

#### Example: Sync Billing Events for a Billing Account

Sync all billing events for a billing account and remove any that are no longer in the payload:

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

### Meter Reading Prune Scope Operations

The `upsert-prune-scope` mode for meter readings upserts all readings from the payload for a given meter/counter, then permanently deletes all other readings for that meter/counter that weren't part of the upsert.

The scope is naturally defined by **meter + counter** — no explicit `scope_mode` is needed. An optional `scope` object can restrict pruning to readings from a specific source.

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

Upserts all readings from the `readings` array, then deletes any other readings for the same meter+counter not in the payload.

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

Updates the meter status to "DECOMMISSIONED" while purging associated billing events.

## Field Mapping Priority

When multiple mapping options are specified, they are evaluated in this order:

:::info
1. `constant` -- Fixed value (highest priority)
2. `jsonataExpression` -- Computed value
3. `field` -- Direct field mapping (lowest priority)
:::

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
- [Pricing](./pricing) - Map ERP line items and calculate prices
- [Meter Readings](./meter-readings) - Handle meter reading data
