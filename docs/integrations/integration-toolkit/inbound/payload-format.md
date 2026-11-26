---
sidebar_position: 2.5
title: Payload Format
description: Choose what the root of an inbound mapping is, and map a managed call's response together with the request it answers
---

# Payload Format

`payload_format` on an inbound use case's configuration sets what the root (`$`) of the use case's mappings is. Everything in the mapping reads it: the unique identifiers, the entity-level `jsonataExpression`, the field expressions and the meter readings.

| `payload_format` | Root of the mapping |
|---|---|
| absent or `"1.0"` (default) | The event's payload as it came |
| `"2.0"` | Always one object with the same four keys: `kind`, `body`, `raw` and `original_request` |

:::tip When to use 2.0
- A [managed call](../configuration.md#managed-call-use-cases) routes its response to the use case with `inbound_use_case_slug`, and the response does not contain the identifier the entity is matched by. With 2.0 the mapping also gets the request the call was made with. See [Match the Entity a Managed Call Was Made For](#match-the-entity-a-managed-call-was-made-for).
- The source answers with XML or plain text, or with a different shape from one call to the next, and the mapping has to tell the cases apart.

A use case that receives JSON objects pushed to the inbound API gains nothing from 2.0 and can stay on 1.0.
:::

## Payload Format 1.0

The mapping gets the event's payload as it came:

- **An event pushed to the inbound API:** its parsed JSON.
- **A managed call's response:** the external API's JSON object or array as it came back. Anything else, such as XML, plain text, an empty body or a JSON number, is wrapped as `{ "raw": <value> }`.

With a managed call, the shape of the root therefore depends on what the API answered on each call. The request the response belongs to is not available to the inbound mapping at all. Only the managed call's own `response_mapping` sees it, as `original_request`, and the output of that mapping goes back to the caller of the managed call, not to the inbound use case.

## Payload Format 2.0

The mapping always gets one object with the same four keys, whatever produced the event: a push to the inbound API, a managed call, or the mapping simulation.

```json title="Root of a mapping with payload format 2.0"
{
  "kind": "object",
  "body": { "customerNumber": "C-1" },
  "raw": null,
  "original_request": null
}
```

| Key | Value |
|---|---|
| `kind` | What the payload is: `object`, `array`, `scalar`, `raw` or `empty` (see below) |
| `body` | The JSON value when `kind` is `object`, `array` or `scalar`, otherwise `null` |
| `raw` | The text when `kind` is `raw`, otherwise `null` |
| `original_request` | For the response of a managed call: the payload the managed call was executed with, before its `request_mapping`. It is the same value the managed call's `response_mapping` sees as `original_request`. `null` for every other event |

| `kind` | The payload is | Value in |
|---|---|---|
| `object` | A JSON object | `body` |
| `array` | A JSON array | `body` |
| `scalar` | A JSON number, boolean or `null` | `body` |
| `raw` | Text that is not JSON (XML, CSV, HTML, plain text) or a JSON string. An event sent with format `xml` is always `raw`, and so is a JSON payload that does not parse | `raw` |
| `empty` | Nothing, or only whitespace | neither: `body` and `raw` are both `null` |

Some examples:

| Source | Payload | Root of the mapping |
|---|---|---|
| Push, format `json` | `{"customerNumber":"C-1"}` | `{ "kind": "object", "body": { "customerNumber": "C-1" }, "raw": null, "original_request": null }` |
| Push, format `xml` | `<customer><id>C-1</id></customer>` | `{ "kind": "raw", "body": null, "raw": "<customer><id>C-1</id></customer>", "original_request": null }` |
| Managed call, JSON array response | `[{"id":1}]` | `{ "kind": "array", "body": [{ "id": 1 }], "raw": null, "original_request": { … } }` |
| Managed call, empty response body | | `{ "kind": "empty", "body": null, "raw": null, "original_request": { … } }` |

The text in `raw` is passed on as it was received. It is not parsed, so XML is read with JSONata's string functions, as in the [example below](#match-the-entity-a-managed-call-was-made-for).

The event itself is not changed. Monitoring shows the payload as it arrived; only the input of the mapping is built from it.

## Set the Payload Format

Set `payload_format` on the inbound use case's `configuration`:

```json title="Inbound use case configuration"
{
  "payload_format": "2.0",
  "entities": [ "..." ]
}
```

- The option is optional, and absent means `1.0`. The API does not write a default into a stored configuration, so a configuration without the option reads back without it. An explicit `"1.0"` is stored as sent.
- It applies to mapped use cases. A use case in [Direct Mode](./direct-mode.md) (`direct: true`) has no mapping and ignores it.
- Like any configuration change, a new payload format can take up to **5 minutes** to take effect for incoming events.

## Match the Entity a Managed Call Was Made For

A managed call is often made for one entity: check a company register for an account, look up a credit score for a contact, fetch the current state of a contract. When the response is routed to an inbound use case, that use case has to find the entity again.

With 1.0 it can only match by values in the response. When the external API does not echo the identifier back, or formats it differently, the mapping finds no entity and creates a new one instead of updating the entity the call was made for.

With 2.0 the request is in `original_request`. Send the entity's id with the call and match the entity by it, with `"unique_ids": ["_id"]` and `_id` mapped from `original_request`. An `_id` identifier is looked up directly by the id, without a search (see [Direct Entity ID](./unique-identifiers.md#direct-entity-id-_id)).

### Example: A Company Register Lookup

A connector integration has a managed call `check-register`. It queries an external register API, which answers in XML, and routes the response to the inbound use case `register-check-result`:

```json title="Managed call use case"
{
  "name": "Check company register",
  "slug": "check-register",
  "type": "managed_call",
  "enabled": true,
  "configuration": {
    "operation": {
      "method": "GET",
      "path": "/register/search",
      "query_params": { "number": "{{registerNumber}}" },
      "headers": { "Accept": "application/xml" }
    },
    "inbound_use_case_slug": "register-check-result"
  }
}
```

The caller executes the managed call for an account and sends the account's `_id` along with the values the API needs:

```bash title="Execute the managed call"
curl -X POST 'https://integration-toolkit.sls.epilot.io/v1/managed-call/check-register/execute' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "integration_id": "<integration-id>",
    "payload": {
      "accountId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "registerNumber": "123",
      "companyName": "Example GmbH"
    }
  }'
```

The register API answers without the account's id:

```xml title="Response of the external API"
<Response>
  <Status>FOUND</Status>
  <Name>Example GmbH</Name>
  <RegistryCourt>Amtsgericht Musterstadt</RegistryCourt>
</Response>
```

With payload format 2.0, the mapping of `register-check-result` gets the response as text and the request next to it:

```json title="Root of the inbound mapping"
{
  "kind": "raw",
  "body": null,
  "raw": "<Response>\n  <Status>FOUND</Status>\n  <Name>Example GmbH</Name>\n  …</Response>",
  "original_request": {
    "accountId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "registerNumber": "123",
    "companyName": "Example GmbH"
  }
}
```

The inbound use case reads the values out of `raw`, takes the account's id from `original_request`, and updates that account:

```json title="Inbound use case configuration (register-check-result)"
{
  "payload_format": "2.0",
  "entities": [
    {
      "entity_schema": "account",
      "unique_ids": ["_id"],
      "jsonataExpression": "kind = \"raw\" and $contains(raw, \"<Status>FOUND</Status>\") ? { \"accountId\": original_request.accountId, \"name\": $contains(raw, \"<Name>\") ? $substringBefore($substringAfter(raw, \"<Name>\"), \"</Name>\"), \"registryCourt\": $contains(raw, \"<RegistryCourt>\") ? $substringBefore($substringAfter(raw, \"<RegistryCourt>\"), \"</RegistryCourt>\") }",
      "fields": [
        { "attribute": "_id", "field": "accountId" },
        { "attribute": "name", "field": "name" },
        { "attribute": "registry_court", "field": "registryCourt" }
      ]
    }
  ]
}
```

The entity-level `jsonataExpression`, formatted:

```jsonata
kind = "raw" and $contains(raw, "<Status>FOUND</Status>")
  ? {
      "accountId": original_request.accountId,
      "name": $contains(raw, "<Name>")
        ? $substringBefore($substringAfter(raw, "<Name>"), "</Name>"),
      "registryCourt": $contains(raw, "<RegistryCourt>")
        ? $substringBefore($substringAfter(raw, "<RegistryCourt>"), "</RegistryCourt>")
    }
```

- When the register found the company, the expression returns one object, and the account with the id `7c9e6679-…` gets the `name` and `registry_court` from the response.
- When it did not, or the API answered with something other than text, the expression returns nothing, and the use case writes no entity for this event.
- A tag missing from the response leaves its key out of the object, so that attribute is not changed.

### Pitfalls

- **`$substringAfter` and `$substringBefore` return their whole input when the text they look for is not there.** Without the `$contains(raw, "<Name>")` guard, a response without a `<Name>` tag would write the complete XML text into the account's name.
- **String functions fail when `raw` is `null`.** `$contains(raw, …)` and `$substringAfter(raw, …)` stop the mapping with an error when the response was JSON or empty. Check `kind = "raw"` before them: the `and` is not evaluated further once the `kind` does not match.
- **The text is not decoded.** An XML escape such as `&amp;` stays `&amp;` in the value. Replace the escapes the API uses, for example with `$replace(…, "&amp;", "&")`.
- **An id that no longer exists creates an entity.** If no `account` has the id from `original_request`, for example because it was deleted after the call was made, the update creates a new account.
- **Only successful responses are routed.** A response with a status of `400` or above is returned to the caller of the managed call as an error, and nothing reaches the inbound use case.
- **A replayed response has no request.** A managed call's inbound event that is [replayed](../monitoring/investigating.md#replaying-events) from monitoring is processed like a pushed event with the payload it arrived with: `original_request` is `null`, and a text response arrives as `{ "kind": "object", "body": { "raw": "…" } }`. Execute the managed call again instead of replaying its event.

## Move a Use Case from 1.0 to 2.0

With 2.0 the payload is one level deeper, so a 1.0 mapping has to be adapted:

- **JSON payloads:** the fields of a JSON object or array move under `body`. Either prefix the paths and expressions with `body.` (for example `body.customerNumber`, or `body.meters` in an entity-level expression that selects an array), or, for an entity without an entity-level `jsonataExpression` of its own, add `"jsonataExpression": "body"`. That restores the old root for the entity's fields for JSON objects.
- **Meter readings:** the `jsonataExpression` of each `meter_readings` entry reads the root as well, so it needs the `body.` prefix too.
- **Text and XML from a managed call:** already under `raw` with 1.0 (`{ "raw": <value> }`), and still under `raw` with 2.0. An expression that reads `raw` keeps working; add a `kind = "raw"` check where the API can also answer with JSON or an empty body.

Change `payload_format` and the mapping in the same save. Both are part of the use case configuration, so an event is always mapped with a payload format and a mapping that belong together. Try the new mapping with the [mapping simulation](#simulate-the-mapping) first.

## Simulate the Mapping

The v2 mapping simulation reads `payload_format` from the `event_configuration` it is given and builds the same root as live processing. To simulate the response of a managed call, pass the request it answers as `original_request`. It becomes the `original_request` of the root with payload format 2.0, and is ignored with 1.0.

```bash title="Simulate the register lookup"
curl -X POST 'https://integration-toolkit.sls.epilot.io/v2/erp/updates/mapping_simulation' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "event_configuration": {
      "payload_format": "2.0",
      "entities": [ "<the entities of the use case>" ]
    },
    "format": "xml",
    "payload": "<Response><Status>FOUND</Status><Name>Example GmbH</Name><RegistryCourt>Amtsgericht Musterstadt</RegistryCourt></Response>",
    "original_request": {
      "accountId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "registerNumber": "123",
      "companyName": "Example GmbH"
    }
  }'
```

```json title="Response"
{
  "entity_updates": [
    {
      "entity_slug": "account",
      "unique_identifiers": { "_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7" },
      "attributes": {
        "_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        "name": "Example GmbH",
        "registry_court": "Amtsgericht Musterstadt"
      },
      "mode": "upsert"
    }
  ]
}
```

The simulation writes nothing. A text response can be simulated with format `xml`, as above, or with format `json` and a payload that is not JSON: both are `raw`.

## Next Steps

- [Mapping](./mapping.md) - Fields, entity-level JSONata and operation modes
- [Unique Identifiers](./unique-identifiers.md) - How entities are matched, including `_id`
- [Managed Call Use Cases](../configuration.md#managed-call-use-cases) - Configure and execute managed calls
