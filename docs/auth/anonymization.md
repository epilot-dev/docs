---
sidebar_position: 2.5
title: PII Anonymization
---

# PII Anonymization

[[Library source](https://github.com/epilot-dev/anonymization)]
[[npm](https://www.npmjs.com/package/@epilot/anonymization)]

epilot can mask personal data (PII) in API responses, so that AI assistants, analytics, and integrations get the shape and relations of your data without the personal identifiers in it. This page explains how anonymization works, what it covers, where its limits are, and how you control it through your entity schemas.

:::caution Anonymization is best effort
Anonymization reliably masks standard fields such as names, emails, phone numbers, addresses, and IBANs. It **cannot know** which of your custom attributes contain personal data. A custom attribute with an unusual name, or a name typed into a generic text field, is returned **as is** unless you [mark the attribute as PII](#control-anonymization-in-the-entity-schema) in the entity schema.

Treat anonymization as data minimization, not as a guarantee that no personal data leaves epilot. Before you connect an AI assistant or a third-party tool to an anonymized token, [review your custom attributes](#review-your-schemas).
:::

## When anonymization applies

Anonymization is turned on per request or per access token:

| How                                                                                     | Who can turn it off                     | Used by                                                                          |
| --------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| Access token created with `anonymize: true`                                             | Nobody. The token can never see raw PII | [MCP server](/docs/agent-toolkit/setup#pii-anonymization) connections (always on), CLI sessions in **Anonymize mode**, your own [access tokens](/docs/auth/access-tokens#anonymized-tokens) |
| `?anonymize=true` query parameter (or `"anonymize": true` in an Entity API search body) | The caller, by leaving it out           | Callers that want anonymized output from a normal token                          |

The token flag is enforced server-side and is one-way: an anonymized token can only create further anonymized tokens, and no request parameter turns anonymization off.

### Which APIs anonymize

| API                                   | What is anonymized                                                                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Entity API](/api/entity)             | All entity data in successful JSON responses: get, search, relations, activity feed, and autocomplete. Uses the entity schema to classify every attribute. Anonymized responses carry the header `x-epilot-anonymized: true`. |
| [Audit Log API](/docs/audit-logs)     | Audit log entries. There is no schema for log payloads, so detection relies on field names and on email, phone, and IBAN patterns.                                                                                             |
| APIs that read entities with your token | Inherit anonymization from the Entity API, for example email templates that resolve entity variables.                                                                                                                       |

Entity exports (`exportEntities`) are **blocked** for anonymized callers, because export files are written outside the anonymized response pipeline.

:::warning Other APIs are not anonymized
APIs that keep their own data, rather than reading it from the Entity API with your token, return their data unchanged, even to an anonymized token. Combine anonymization with a [read-only](/docs/auth/access-tokens) token and least-privilege roles, so a token can only reach the data it needs.
:::

## How values are masked

Anonymization is implemented by the open-source library [`@epilot/anonymization`](https://github.com/epilot-dev/anonymization). The complete list of what is classified as PII lives in its [`defaults.ts`](https://github.com/epilot-dev/anonymization/blob/main/src/defaults.ts) as plain, reviewable data.

Values are replaced with **deterministic pseudonyms**: the same person gets the same pseudonym across requests within your organization, so an assistant can still group, join, and deduplicate records without seeing the real values. Pseudonyms differ between organizations and cannot be reversed without epilot's secret.

| Data                                                            | Anonymized value                                                        |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Names (`first_name`, `last_name`, contact title, …)             | `person_4f2a9b1c`                                                       |
| Company names, tax and registration IDs                         | `company_4f2a9b1c`, `value_4f2a9b1c`                                    |
| Email, phone, IBAN (by attribute type or field name)            | Format-preserving: `4f2a9b1c@anonymized.invalid`, `+0083920174`, `iban_7c01d2aa` |
| Addresses                                                       | Postal code, city, and country kept; street pseudonymized; the rest dropped |
| Birthdates                                                      | Truncated to the year: `1985-06-14` → `1985-01-01`                      |
| Payment methods                                                 | IBAN and account holder pseudonymized; bank name and BIC kept           |
| User relations (for example `contact_owner`)                    | Name and email pseudonymized, credentials removed, IDs kept             |
| Consents                                                        | Email or phone pseudonymized; consent status and history kept           |
| Known free text (note and comment content, message subject and body, opportunity description) | `[REDACTED]`                               |
| Emails, phone numbers, and IBANs **inside** other string values | Replaced with pseudonyms                                                |
| Everything else (IDs, status, dates, numbers, unclassified text) | **Unchanged**                                                          |

### How an attribute is classified

For each attribute, the first matching rule wins:

1. `data_classification: "public"` on the schema attribute: never anonymized.
2. `data_classification: "pii"` on the schema attribute: always anonymized.
3. A curated field name, such as `first_name`, `birthdate`, or `iban` on any schema, or `note:content`.
4. The attribute type: `email`, `phone`, `address`, `payment`, `relation_user`, and `consent` attributes.
5. Otherwise the value is kept, with emails, phone numbers, and IBANs embedded in it replaced.

Rules 3 to 5 are the **best-effort** part. They cover epilot's standard attributes, but they don't know what your custom attributes mean.

## What is not anonymized

Personal data can still come through in these cases:

- **Custom attributes** that don't match a curated name or a PII type, for example a `string` attribute `ansprechpartner` containing a name. Only emails, phone numbers, and IBANs typed into such a field are caught.
- **Free text** in custom text fields, such as a name or a customer ID written into an internal remark.
- **Values in unusual formats**, for example a phone number without a country prefix.
- **Other APIs** that do not read their data through the Entity API. See [Which APIs anonymize](#which-apis-anonymize).
- **Configuration data**, such as journey texts, workflow names, email template bodies, or automation settings. This isn't entity data and is returned as configured.
- **Combinations of kept values.** Postal code, city, birth year, and consumption data together can narrow down a person in small populations.
- **Search by value.** A caller who already knows an email address can still search for it and confirm that a matching record exists.

Anonymization is pseudonymization in the sense of GDPR Art. 4(5): anonymized data is still personal data from a legal perspective.

## Control anonymization in the entity schema

Every entity schema attribute supports a `data_classification` property. It takes precedence over all built-in defaults.

| `data_classification` | Effect                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `pii`                 | Always anonymized. Use it for every custom attribute and free-text field that can contain personal data.                            |
| `public`              | Never anonymized, not even the embedded email, phone, and IBAN scrubbing. Use it for fields the defaults mask by mistake, such as a non-personal ID. |
| unset                 | Built-in best-effort defaults apply.                                                                                                |

For an attribute marked `pii`, the value is masked based on its type:

- Email, phone, address, and payment attributes use their type-specific masking.
- Dates are truncated to the year.
- Multiline text is replaced with `[REDACTED]`.
- Other single-line values get a stable pseudonym, such as `value_4f2a9b1c`, so they stay joinable.

### In the Entity Builder

Open the attribute in the Entity Builder and check **Anonymize** (German: **Anonymisieren**, "Mask this value in anonymized API responses") in its configuration. This sets `data_classification: "pii"`. Unchecking it removes the classification, and the built-in defaults apply again. To set `public`, use the Entity API.

The checkbox is available for all attribute types except sequences and headlines.

### Through the Entity API

Set `data_classification` on the attribute when you update the schema, for example with [`putSchema`](/api/entity#tag/schemas/operation/putSchema):

```json title="Marking a custom attribute as PII"
{
  "name": "internal_remarks",
  "label": "Internal remarks",
  "type": "string",
  "multiline": true,
  "data_classification": "pii"
}
```

```json title="Opting a non-personal identifier out"
{
  "name": "customer_number",
  "label": "Customer number",
  "type": "string",
  "data_classification": "public"
}
```

The change applies to every anonymized response from then on, including everything an AI assistant reads through the MCP server. You don't have to recreate tokens.

### Review your schemas

Before you connect an AI assistant, the CLI in **Anonymize mode**, or an integration to an anonymized token:

1. List the custom attributes of each schema that holds personal data, typically contact, account, opportunity, order, contract, meter, and your custom entities.
2. Mark every attribute that can contain personal data with **Anonymize**, including free-text fields such as remarks or descriptions.
3. Check the result: fetch an entity with `?anonymize=true` and look for real values.

```bash
epilot entity getEntity contact <entity-id> -p anonymize=true
```

## Don't edit data through an anonymized connection

An anonymized token sees pseudonyms instead of real values. If a tool writes an entity it has read back, it stores the pseudonyms in place of the real values, for example `4f2a9b1c@anonymized.invalid` instead of the customer's email address.

- Use anonymized connections for reading and analysis. Create them **read-only** where possible.
- The epilot MCP server refuses writes through its generic API route that contain pseudonyms or `[REDACTED]` placeholders, but other clients don't check this.
- To change data, update only the fields you intend to change, with values you know are real.

## Related

- [Access Tokens](/docs/auth/access-tokens#anonymized-tokens): create anonymized tokens
- [CLI authentication](/docs/cli/overview#anonymized-sessions): anonymized CLI sessions
- [MCP server setup](/docs/agent-toolkit/setup#pii-anonymization): anonymization for AI assistants
- [Entity attributes](/docs/entities/attributes#data-classification): the `data_classification` property
