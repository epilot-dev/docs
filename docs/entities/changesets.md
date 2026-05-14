---
sidebar_position: 8
title: Changesets & Edit Modes
description: Configurable attribute edit modes for pending updates that wait for ERP confirmation or human approval
---

# Changesets & Edit Modes

[[API Docs](/api/entity/#tag/Changesets)]

Changesets let you mark an entity attribute update as **pending** instead of immediately mutating the stored value. The proposed value is parked in a `_changesets` field on the entity until either an external system (e.g. an ERP) confirms the change, or a human explicitly approves it. The live attribute value is only changed once the change is resolved.

This solves three common problems when entity data needs to round-trip through an external system:

- **Optimistic updates getting reverted** — the local value is never changed until the ERP confirms, so there is nothing to revert.
- **Inbound sync overwriting pending changes** — the live attribute always reflects the confirmed ERP value; the proposed value lives in a separate field.
- **No visibility into pending state** — portals and the 360 UI can read `_changesets` and show the pending value alongside the confirmed one.

:::info
Changesets are an entity-level feature. They are most commonly used with ERP integrations (see [Use in ERP Integrations](#use-in-erp-integrations)) but work for any scenario where an attribute update needs confirmation before being applied.
:::

## Edit Modes

Each attribute in an entity schema can declare one of three **edit modes**:

| Mode | Behaviour |
|------|-----------|
| `direct` | **Default.** Updates are applied immediately to the attribute. No changeset is created. This is how entity updates have always worked. |
| `external` | Updates create a changeset instead of mutating the attribute. The changeset is **auto-cleared** when a trusted source (e.g. ERP inbound sync using `?direct=true`) writes a value that matches the proposed value. |
| `approval` | Updates create a changeset instead of mutating the attribute. The changeset is **applied explicitly** by a human via the 360 UI or the `:apply` endpoint. |

Attributes that do not set `edit_mode` default to `direct`, so existing schemas behave unchanged.

## Schema Configuration

Edit modes are set on the attribute definition in the entity schema (configured via Entity Builder, or by updating the schema directly):

```json
{
  "slug": "contract",
  "name": "Contract",
  "attributes": [
    {
      "name": "iban",
      "label": "IBAN",
      "type": "string",
      "edit_mode": "external",
      "edit_mode_config": {
        "match_strategy": "fuzzy",
        "fuzzy_config": {
          "type": "suffix",
          "suffix_length": 4
        }
      }
    },
    {
      "name": "address",
      "label": "Billing Address",
      "type": "address",
      "repeatable": true,
      "has_primary": true,
      "edit_mode": "approval"
    },
    {
      "name": "customer_name",
      "label": "Customer Name",
      "type": "string",
      "edit_mode": "direct"
    }
  ]
}
```

`edit_mode_config` only applies to `external` mode — it configures how [auto-clearing](#auto-clearing-external-mode) decides whether an inbound value matches the pending proposal. It is ignored for `approval` mode, where resolution is always an explicit `:apply` or `:dismiss` call (see [Applying & Dismissing](#applying--dismissing-approval-mode)).

## The `_changesets` Field

A changeset is a pending proposed value for a single attribute. Changesets are stored on the entity under the `_changesets` system field, keyed by attribute name.

**Constraints:**

- At most one pending changeset per attribute. A new changeset overwrites the previous one for the same attribute.
- `_changesets` is managed automatically by the API based on the attribute's `edit_mode`. It is not mutated by regular `PATCH` / `PUT` payloads.

Example entity with two pending changesets:

```json
{
  "_id": "uuid-123",
  "_schema": "contract",
  "_title": "Contract #1001",

  "iban": "DE89370400440532013000",
  "address": [
    {
      "_tags": ["billing"],
      "street": "Old Street",
      "street_number": "1",
      "city": "Cologne",
      "postal_code": "50100",
      "country": "DE"
    }
  ],

  "_changesets": {
    "iban": {
      "proposed_value": "DE02120300000000202051",
      "previous_value": "DE89370400440532013000",
      "created_at": "2026-02-20T10:30:00Z",
      "created_by": { "type": "portal_user", "id": "portal-user-uuid" },
      "edit_mode": "external",
      "match_strategy": "fuzzy",
      "fuzzy_config": { "type": "suffix", "suffix_length": 4 },
      "source": "end_customer_portal"
    },
    "address": {
      "proposed_value": [
        { "_tags": ["billing"], "street": "New Street", "street_number": "2", "city": "Dusseldorf", "postal_code": "40200", "country": "DE" }
      ],
      "previous_value": [
        { "_tags": ["billing"], "street": "Old Street", "street_number": "1", "city": "Cologne", "postal_code": "50100", "country": "DE" }
      ],
      "created_at": "2026-02-20T10:32:00Z",
      "created_by": { "type": "portal_user", "id": "portal-user-uuid" },
      "edit_mode": "approval",
      "source": "end_customer_portal"
    }
  }
}
```

Each changeset entry has:

| Field | Description |
|-------|-------------|
| `proposed_value` | The value the caller wanted to apply. Same type as the attribute. |
| `previous_value` | The attribute value at the moment the changeset was created. Useful for conflict detection and UI diffing. |
| `created_at` | ISO timestamp. |
| `created_by` | `{ type, id }` — where `type` is `user`, `portal_user`, `api_client`, or `automation`. |
| `edit_mode` | `external` or `approval`. |
| `match_strategy` | `exact`, `fuzzy`, or `any`. Only used by `external` mode; ignored by `approval` mode. |
| `fuzzy_config` | Matching configuration for the `fuzzy` strategy. Only used by `external` mode. |
| `source` | Optional free-form label (e.g. `end_customer_portal`, `journey`, `automation`). |
| `related_values` | Map of related suffix fields for compound attributes (e.g. `price_decimal`, `price_currency` for a `currency` attribute). |

## Creating Changesets

### Implicit: regular entity updates

When a `PATCH /v1/entity/{slug}/{id}` or `PUT /v1/entity/{slug}/{id}` payload targets an attribute with `edit_mode: external` or `approval`, the Entity API automatically redirects the value into `_changesets` instead of writing to the attribute.

```http
PATCH /v1/entity/contract/uuid-123
Content-Type: application/json

{ "iban": "DE02120300000000202051" }
```

Response (truncated):

```json
{
  "iban": "DE89370400440532013000",
  "_changesets": {
    "iban": {
      "proposed_value": "DE02120300000000202051",
      "previous_value": "DE89370400440532013000",
      "created_at": "2026-02-20T10:30:00Z",
      "created_by": { "type": "user", "id": "user-uuid" },
      "edit_mode": "external",
      "match_strategy": "fuzzy",
      "fuzzy_config": { "type": "suffix", "suffix_length": 4 }
    }
  }
}
```

Note the `iban` field is **unchanged** — only `_changesets.iban` was written.

Mixed payloads work cleanly: direct attributes in the same request are applied immediately; non-direct attributes are intercepted and become changesets.

### The `?direct=true` override

To bypass changeset creation and write directly to the attribute regardless of its edit mode, set the `direct` query parameter:

```http
PATCH /v1/entity/contract/uuid-123?direct=true
Content-Type: application/json

{ "iban": "DE02120300000000202051" }
```

`?direct=true` is intended for **trusted integrations** writing already-confirmed data — most notably ERP inbound sync. A direct write on an `external` attribute also triggers [auto-clearing](#auto-clearing-external-mode) of any pending changeset.

:::warning
ERP integration middleware **must** use `?direct=true` for all inbound sync calls. Without it, an inbound sync on an `external` attribute would create a new changeset instead of confirming the pending one — leading to an infinite loop of proposed changes.
:::

## Matching Modes

:::info Only applies to `external` mode
Match strategies drive **auto-clearing**, which is an `external`-mode-only behaviour. `approval`-mode changesets never auto-clear regardless of what arrives on the attribute — they are resolved exclusively via [`:apply` or `:dismiss`](#applying--dismissing-approval-mode). Setting `match_strategy` or `fuzzy_config` on an `approval`-mode attribute has no effect.
:::

When an `external`-mode attribute receives a direct write (`?direct=true`), the API checks whether the incoming value matches the pending changeset. If it does, the changeset is auto-cleared. Matching is governed by `match_strategy` (and, for fuzzy matching, `fuzzy_config`).

| Strategy | Behaviour | Typical use |
|----------|-----------|-------------|
| `exact` | Incoming value must be deep-equal to `proposed_value`. Default when `match_strategy` is not set. | Strings and primitive values the ERP echoes back verbatim. |
| `any` | Any direct write clears the changeset, regardless of value. | Fields the ERP may transform unpredictably, but where any update signals confirmation. |
| `fuzzy` | Normalised comparison using the configured `fuzzy_config.type`. Falls back to `exact` (with a warning) if `fuzzy_config` is missing. | IBAN masking, phone formatting, addresses with dropped fields, etc. |

### Fuzzy match types

All fuzzy variants compare the incoming direct-write value against the changeset's `proposed_value`.

| `fuzzy_config.type` | Compares | Config | Example |
|---------------------|----------|--------|---------|
| `suffix` | Last N characters of strings | `{ "type": "suffix", "suffix_length": 4 }` | Proposed `DE02120300000000202051`, incoming `****2051` → match |
| `digits_only` | Strips all non-digits, then compares | `{ "type": "digits_only" }` | Proposed `+49 170 1234567`, incoming `004917012345670` → both strip to digits and compare |
| `normalize_phone` | For repeatable `phone` arrays: normalises country-code prefixes on the `match_on` field in each entry, then deep-equals | `{ "type": "normalize_phone", "country_code": "49", "match_on": "phone" }` | Proposed `[{ phone: "0170 1234567" }]`, incoming `[{ phone: "+49 170 1234567" }]` → both reduce to `1701234567` |
| `ignore_fields` | For arrays of objects: omits `fields_to_ignore` on each entry before comparing | `{ "type": "ignore_fields", "fields_to_ignore": ["country"] }` | Proposed address includes `country: "DE"`; ERP drops it → still matches |
| `contains_entry` | For repeatable arrays: every proposed entry must appear somewhere in the incoming array, matched on `match_on` key | `{ "type": "contains_entry", "match_on": "email" }` | ERP returns the requested entries plus extras in any order → still matches |
| `regex` | Tests incoming value against a regex pattern | `{ "type": "regex", "pattern": ".*2051$", "regex_flags": "i" }` | Proposed `DE02...2051`, incoming `XXXX2051` → match |

:::note Field name gotchas
- Suffix length is `suffix_length` (not `length`).
- Ignored fields live under `fields_to_ignore` (not `fields`).
- `match_on` is a string in the schema; it selects the object key used when comparing entries.
:::

### Fuzzy examples

#### IBAN masked by the ERP

```json
{
  "name": "iban",
  "type": "string",
  "edit_mode": "external",
  "edit_mode_config": {
    "match_strategy": "fuzzy",
    "fuzzy_config": { "type": "suffix", "suffix_length": 4 }
  }
}
```

```text
proposed_value: "DE02120300000000202051"
incoming:       "****2051"
→ last 4 chars: "2051" == "2051" → match → auto-clear
```

#### Address without country code

```json
{
  "name": "address",
  "type": "address",
  "repeatable": true,
  "edit_mode": "external",
  "edit_mode_config": {
    "match_strategy": "fuzzy",
    "fuzzy_config": {
      "type": "ignore_fields",
      "fields_to_ignore": ["country", "country_code"]
    }
  }
}
```

```text
proposed: [{ "_tags": ["billing"], "street": "Hauptstr.", "street_number": "5", "city": "Köln", "postal_code": "50667", "country": "DE" }]
incoming: [{ "_tags": ["billing"], "street": "Hauptstr.", "street_number": "5", "city": "Köln", "postal_code": "50667" }]
→ compare each entry without "country" → match → auto-clear
```

#### Phone number normalisation

```json
{
  "name": "phone",
  "type": "phone",
  "repeatable": true,
  "edit_mode": "external",
  "edit_mode_config": {
    "match_strategy": "fuzzy",
    "fuzzy_config": {
      "type": "normalize_phone",
      "country_code": "49",
      "match_on": "phone"
    }
  }
}
```

```text
proposed: [{ "phone": "0170 1234567", "_tags": ["mobile"] }]
incoming: [{ "phone": "+49 170 1234567", "_tags": ["mobile"] }]
→ both normalise to "1701234567" → match → auto-clear
```

#### Additional email added via self-service

```json
{
  "name": "email",
  "type": "email",
  "repeatable": true,
  "edit_mode": "external",
  "edit_mode_config": {
    "match_strategy": "fuzzy",
    "fuzzy_config": { "type": "contains_entry", "match_on": "email" }
  }
}
```

```text
proposed: [{ "email": "existing@example.com" }, { "email": "new-billing@example.com" }]
incoming: [{ "email": "new-billing@example.com" }, { "email": "existing@example.com" }, { "email": "erp-generated@example.com" }]
→ every proposed entry is present in incoming (by email) → match → auto-clear
```

## Auto-Clearing (External Mode)

```text
1. Entity has _changesets["iban"] with proposed_value = "DE02...2051"
2. ERP inbound: PATCH ?direct=true { "iban": "****2051" }
3. Entity API writes "****2051" directly to iban  (because ?direct=true)
4. Entity API checks _changesets["iban"]:
   - Runs configured match_strategy against proposed_value and incoming value
   - If match: removes _changesets["iban"]
   - If no match: changeset stays (the ERP applied a different correction)
5. Standard EntityUpdated event fires with the confirmed value
```

If the match fails, the changeset remains — this signals that the original request was not fulfilled as proposed and the service agent / automation can react.

## Applying & Dismissing (Approval Mode)

Attributes in `approval` mode never auto-clear. Resolution is always explicit.

### Apply a changeset

```http
POST /v1/entity/{slug}/{id}/changesets/{attribute}:apply
```

- Writes `proposed_value` (and any `related_values`) to the attribute.
- Removes the changeset entry.
- Fires a `ChangesetApplied` activity and a standard `EntityUpdated` event.
- Requires `entity:update` permission on the slug.

### Dismiss a changeset

```http
POST /v1/entity/{slug}/{id}/changesets/{attribute}:dismiss
Content-Type: application/json

{ "reason": "IBAN validation failed at ERP" }
```

- Leaves the attribute value **unchanged**.
- Removes the changeset entry.
- Fires a `ChangesetDismissed` activity (with the optional `reason`) and a standard `EntityUpdated` event.
- Requires `entity:update` permission on the slug.

### List changesets

```http
GET /v1/entity/{slug}/{id}/changesets
```

Returns the `_changesets` map for the entity. Read-only; requires `entity:view` permission.

## Changeset Preview Hydration (`apply_changesets`)

When an outbound webhook or client needs to see **the entity as it would look if pending changesets were accepted**, use the `apply_changesets` hydration flag. The live attribute values are returned with each changeset's `proposed_value` merged in place. `_changesets` stays present in the payload, so consumers can still tell which values are pending.

### On `getEntity` v2

```http
GET /v2/entity/contract/uuid-123?apply_changesets=true
```

Without the flag (default):

```json
{
  "iban": "DE89370400440532013000",
  "_changesets": { "iban": { "proposed_value": "DE02120300000000202051", "...": "..." } }
}
```

With `apply_changesets=true`:

```json
{
  "iban": "DE02120300000000202051",
  "_changesets": { "iban": { "proposed_value": "DE02120300000000202051", "...": "..." } }
}
```

### On the entity graph

Set `apply_changesets: true` alongside `hydrate: true` in the `GraphQueryRequest` body.

### On webhook payloads

`payloadConfiguration.apply_changesets: true` on an outbound webhook causes the event's entity payload to be rendered with changesets applied — the ERP receives the proposed new values directly on the entity fields, without needing to parse `_changesets`.

```json
{
  "event_name": "PaymentMethodUpdated",
  "endpoint_url": "https://erp-middleware.example.com/inbound",
  "payloadConfiguration": {
    "hydrate_entity": true,
    "apply_changesets": true,
    "include_relations": true,
    "include_changed_attributes": true
  }
}
```

## Events

Changesets do **not** introduce new event types. Because writing to `_changesets` is an entity update, the existing [core events](/docs/integrations/core-events) fire normally.

The `entity_operation` attribute matcher treats a changeset created or cleared for attribute `X` as a change to `X`. This means the same core event fires twice per lifecycle:

1. **Changeset created** — entity payload contains `_changesets.<attribute>`. With `apply_changesets: true`, the attribute field already shows the proposed value.
2. **Changeset cleared** — entity payload no longer contains `_changesets.<attribute>`. The attribute field shows the confirmed value.

Webhook consumers that need to distinguish the two phases can check for the presence of `_changesets.<attribute>` in the payload.

Additional activity types fire for explicit resolution:

- `ChangesetApplied` — when `:apply` is called.
- `ChangesetDismissed` — when `:dismiss` is called (with optional `reason` in the payload).

## Use in ERP Integrations

Changesets are the default pattern for ERP-backed self-service in the [ERP Toolkit](/docs/integrations/erp-toolkit/overview). They make end-to-end flows safe and legible:

1. End-customer or service agent submits a change (portal, journey, 360 UI, automation).
2. Entity API intercepts the write, parks it in `_changesets`, and leaves the live value untouched.
3. A core event fires. An outbound webhook (configured with `apply_changesets: true`) delivers the **proposed** entity to the ERP middleware.
4. The middleware processes the change — synchronously or via overnight batch.
5. On confirmation, the middleware calls `PATCH ?direct=true` with the confirmed value.
6. Entity API writes the value directly and auto-clears the changeset if the fuzzy matcher says it matches.
7. The core event fires again — this time with `_changesets.<attribute>` absent. An automation turns this into a confirmation notification to the customer.

### Example: end-customer changes IBAN

**Setup** — on the `contract` schema, `iban` is configured with `edit_mode: external`, `match_strategy: fuzzy`, `fuzzy_config: { type: "suffix", suffix_length: 4 }`.

```text
1. Portal → PATCH /v1/entity/contract/uuid-123 { "iban": "DE02...2051" }
2. Entity API creates _changesets.iban (proposed "DE02...2051"); iban itself unchanged
3. Portal UI shows "pending confirmation" next to the old IBAN
4. Core event (e.g. BillingAccountUpdated) fires → outbound webhook → ERP middleware
   - payloadConfiguration.apply_changesets=true → ERP receives entity with iban="DE02...2051"
5. ERP processes (may take hours / overnight)
6. ERP middleware → PATCH /v1/entity/contract/uuid-123?direct=true { "iban": "****2051" }
7. Entity API writes "****2051" to iban, matches last 4 chars ("2051") against proposed ("2051")
   → match → _changesets.iban removed
8. Same core event fires again — this time without _changesets.iban
9. Automation: notify end-customer "IBAN updated"
10. Portal shows confirmed IBAN, no pending indicator
```

### ERP rejection

If the ERP rejects the change, the middleware can either:

- Leave the attribute alone (no `?direct=true` call), so the changeset stays pending, and update a status field or raise a ticket entity to communicate rejection, **or**
- Call `POST /v1/entity/contract/uuid-123/changesets/iban:dismiss` with a `reason` to remove the changeset without applying it. An automation watching `ChangesetDismissed` (or the generic `EntityUpdated`) can notify the customer.

### Why this pattern works

| Concern | How changesets solve it |
|---------|-------------------------|
| Optimistic update gets reverted | Never happens — the attribute is not changed until the ERP confirms. |
| Inbound sync overwrites a pending change | Never happens — the attribute always holds the confirmed ERP value; the proposal lives in `_changesets`. |
| End-customer has no visibility | Portal reads `_changesets` and renders the pending state. |
| Service agent has no context | 360 UI shows the changeset with `created_by`, `created_at`, `source`. |
| Manual handover on failure | A service agent can see the original proposed value on the entity and take over processing. |
| Workflow / request tracking | Workflows can wait for changeset resolution (same core event fires on create and clear). |

## Integration with Other Features

### Journeys & Entity Mapping

When a journey submits entity updates, the mapping respects the attribute's edit mode — non-direct attributes land in `_changesets`. Journey mappings can opt into `?direct=true` when they need to bypass this.

### Automations

The `UpdateEntity` automation action follows the same rules: non-direct attributes become changesets. Use `direct: true` on the action when the automation represents a trusted inbound write.

### Portals (ECP / Installer Portal)

Portal UIs read `_changesets` and render:

- Current confirmed value
- Pending proposed value with timestamp
- Status indication (`pending external confirmation` vs. `pending approval`)

### Workflows

A workflow step can be configured to wait for changeset resolution before proceeding. This maps cleanly to ERP round-trips: submit change → event fires → webhook sent to ERP → workflow waits → ERP confirms → changeset clears → event fires again → workflow advances.

### Currency attributes and related fields

Currency attributes are stored as two suffix fields (`price_decimal`, `price_currency`). When the parent currency attribute is in `external` or `approval` mode, the API automatically groups the suffix values into the parent changeset's `related_values` so the pair stays consistent. On `:apply`, both suffix fields are written in one operation.

## Migration & Backwards Compatibility

- The default edit mode is `direct`, so existing attributes behave exactly as before.
- `_changesets` is a new system field — existing entities have no `_changesets` until one is created.
- `?direct=true` defaults to `false` and is additive.
- When the Entity API cannot resolve a schema (e.g. orphaned entities), all attributes fall back to `direct` behaviour.

## Reference

- **RFC** — _Changesets + Entity Attribute Edit Modes_ (Viljami Kuosmanen, 2026-02-18). Source of truth for design intent.
- **Implementation** — [`entity-api`](https://github.com/epilot-dev/entity-api): `lambda/ApiHandlerFunction/src/entity/changeset-service.ts` (interception and hydration), `changeset-matching.ts` (match strategies), `changeset-handlers.ts` (`:apply`, `:dismiss`, list endpoints).
- **API schemas** — `Changeset`, `ChangesetMap`, `ChangesetCreator`, `MatchStrategy`, `FuzzyConfig`, `EditModeConfig` in the Entity API OpenAPI spec.
