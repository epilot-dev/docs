---
sidebar_position: 7
title: Key/Value Maps
description: Re-usable lookup tables for translating enum-like values between epilot and external systems
---

# Key/Value Maps

Key/Value Maps are re-usable lookup tables for enum-like values that differ between epilot and an external system — salutations, country codes, contract status codes, payment methods, tariff identifiers.

A typical example: epilot stores a contact's salutation as `Mr.` or `Ms. / Mrs.`, while the ERP expects `1` or `2`. Instead of repeating the same `? :` chain in every mapping, declare the table once and look it up with `$mapValue` / `$mapKey` in any JSONata expression.

```json title="Map: salutation"
{
  "Mr.": "1",
  "Mr": "1",
  "Ms. / Mrs.": "2",
  "Company": "4"
}
```

## How maps are stored

A map is an [environment variable](/docs/environments/environments-secrets) of type **`JSON`** — a flat JSON object whose keys and values are strings (up to 32 KB). Maps are:

- **Declared on an integration** in the Integration Hub under the **Maps** tab (name, environment key, description, entries). The declaration travels with the integration, so the map is re-created when the integration is set up in another organization.
- **Stored globally** as an environment variable. Saving the integration writes the map to the environment; the environment value is what every lookup uses at runtime. If two integrations declare the same key, the last one saved wins.
- **Editable in both places** — the Integration Hub shows the current environment value, and the variable also appears in [Environments & Secrets](/docs/environments/environments-secrets) with a JSON editor.

Because maps are ordinary environment variables, they are never secret, and they follow the same [naming rules](/docs/environments/environments-secrets#naming-your-variables) (`salutation`, `erp.salutation`, `lima.contract_status`, …).

## Using maps in JSONata

Wherever the Integration Toolkit or Webhooks evaluate JSONata, the organization's non-secret environment variables are available as `$env`, and two helper functions operate on map objects:

| Function | Direction | Returns |
|----------|-----------|---------|
| `$mapValue(map, key, default?)` | key → value | The value stored under `key`, or `default` when the key is missing |
| `$mapKey(map, value, default?)` | value → key | The **first** key whose value equals `value`, or `default` when nothing matches |

```jsonata title="Outbound: epilot value → ERP code"
$mapValue($env.salutation, salutation, "!")
```

```jsonata title="Inbound: ERP code → epilot value"
$mapKey($env.salutation, Person1Anredekennzeichen)
```

Rules worth knowing:

- Lookup keys are compared as strings — `$mapValue($env.salutation, 1)` and `$mapValue($env.salutation, "1")` are the same lookup.
- `$mapKey` compares values with strict equality: a map value `"1"` does not match the number `1`. Coerce with `$string()` when the source field is numeric.
- When no `default` is given and nothing matches, the result is `undefined` and the mapped attribute is simply omitted — the same behaviour as any other undefined JSONata result.
- If the first argument is not an object (for example the environment variable does not exist yet), the expression fails with `$mapValue: first argument must be an object` / `$mapKey: …`. In inbound use cases this surfaces as a mapping error in monitoring; in webhooks the delivery fails.
- Values are read through the environments cache, so a change to a map becomes visible to running integrations within about 60 seconds.

### Where `$env`, `$mapValue` and `$mapKey` are available

- Inbound use cases — every `jsonataExpression` field mapping and entity-level `jsonata` expression, including the mapping simulation endpoint.
- Outbound webhooks — the payload transformation and multipart form-field expressions.
- Outbound file proxy — request body templates and delivery expressions.

## Recommended shape: one map, both directions

Model each map as **epilot value → external value**. The forward lookup (`$mapValue`) then serves outbound integrations and the reverse lookup (`$mapKey`) serves inbound ones, so one table covers both directions.

- **Many-to-one** is expressed with extra keys pointing at the same value (`"Mr": "1"`, `"Mr.": "1"`). On the reverse lookup the *first* matching key wins, so list the canonical epilot value first.
- **Keep external codes in the values, not the keys.** JavaScript orders integer-like object keys (`"0"`, `"1"`, `"10"`) numerically ahead of other keys, which would make "first match" in `$mapKey` depend on the number, not on your ordering. Epilot values such as `"Mr."` keep the order you typed.
- **Defaults belong at the call site**: `$mapValue($env.salutation, salutation, "!")` — the map stays a pure table and different mappings can choose different fallbacks.
- **No implicit normalisation.** Lookups are exact; if the source system sends `herr` or `Herr ` inconsistently, normalise in the expression first: `$mapKey($env.salutation, $trim($lowercase(Anrede)))` against a map whose values are lower-cased.

## Full example

Map `salutation` (declared on the ERP integration):

```json
{ "Mr.": "1", "Mr": "1", "Ms. / Mrs.": "2", "Company": "4" }
```

Inbound field mapping — ERP customer record to contact:

```json title="Inbound use case"
{
  "attribute": "salutation",
  "jsonataExpression": "Adressart = 'FIRMA' ? 'Company' : $mapKey($env.salutation, $string(Person1Anredekennzeichen))"
}
```

Outbound webhook payload transformation — contact to ERP request:

```jsonata title="Webhook payload transformation"
{
  "kundennummer": entity.customer_number,
  "anredekennzeichen": $mapValue($env.salutation, entity.salutation, "!"),
  "nachname": entity.last_name
}
```

## Next Steps

- [Mapping](./inbound/mapping.md) — all inbound field mapping types, including `env_var_ref` for scalar environment values
- [Environments & Secrets](/docs/environments/environments-secrets) — variable types, naming, and API
- [Environments & Secrets in Webhooks](/docs/integrations/webhooks/environments-secrets) — `{{ env.* }}` and `$env` in webhooks
