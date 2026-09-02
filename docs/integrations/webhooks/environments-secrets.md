---
sidebar_position: 6
title: "Environments & Secrets in Webhooks"
---

# Environments & Secrets in Webhooks

:::tip
For the full guide on environment variables -- including setup, API reference, and all supported contexts -- see [Environments & Secrets](/docs/environments/environments-secrets).
:::

Webhooks support `{{ env.* }}` references in URLs, headers, and authentication fields. This lets you keep credentials out of your webhook configuration and share the same setup across sandbox and production via Blueprints.

## Supported fields

You can use environment variable references in:

- **Webhook URL** -- `{{ env.erp_api.base_url }}/webhooks/orders`
- **HTTP headers** -- `Authorization: Bearer {{ env.erp_api.api_key }}`
- **Basic Auth** -- username and password fields
- **API Key Auth** -- key value
- **OAuth 2.0** -- token URL, client ID, and client secret

## Example

```json title="Webhook using environment variables"
{
  "url": "{{ env.erp_api.base_url }}/webhooks/orders",
  "authentication": {
    "type": "oauth2",
    "token_url": "{{ env.erp_api.oauth_token_url }}",
    "client_id": "{{ env.erp_api.oauth_app_id }}",
    "client_secret": "{{ env.erp_api.oauth_secret }}"
  }
}
```

When the webhook fires, all `{{ env.* }}` references are resolved server-side to the organization's actual values before the HTTP request is sent. SecretString values are decrypted only at this point and never logged.

## JSON maps in payload transformations

Environment variables are also available inside the JSONata **payload transformation** (and multipart form-field expressions) as `$env.<key>`. This is most useful with variables of type `JSON`, which hold [Key/Value Maps](/docs/integrations/integration-toolkit/key-value-maps) — lookup tables for translating epilot values into the codes your endpoint expects:

```jsonata title="Payload transformation"
{
  "kundennummer": entity.customer_number,
  "anredekennzeichen": $mapValue($env.salutation, entity.salutation, "!")
}
```

- `$mapValue(map, key, default?)` — forward lookup (epilot value → external code)
- `$mapKey(map, value, default?)` — reverse lookup, first matching key wins

`$env` exposes non-secret variables only; SecretString values are never available to JSONata. If a referenced map does not exist, the transformation fails and the delivery is reported as failed, like any other JSONata error.

## Autocomplete

The webhook configuration UI provides autocomplete when you type `{{ env.`. It suggests matching variable keys from your organization and auto-completes the closing braces.

## Error handling

If a referenced variable does not exist in your organization, the webhook call fails with an error indicating which variable could not be resolved. Check your [Environments settings](https://portal.epilot.cloud/app/settings/environments) to verify the variable exists.
