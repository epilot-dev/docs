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

## Autocomplete

The webhook configuration UI provides autocomplete when you type `{{ env.`. It suggests matching variable keys from your organization and auto-completes the closing braces.

## Error handling

If a referenced variable does not exist in your organization, the webhook call fails with an error indicating which variable could not be resolved. Check your [Environments settings](https://portal.epilot.cloud/app/settings/environments) to verify the variable exists.
