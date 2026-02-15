---
sidebar_position: 6
title: "Environments & Secrets"
---

# Environments & Secrets

Org-level configuration for storing environment variables and secrets, usable across webhooks, templates, and integrations. Environment variables let you define shared configuration once and reference it everywhere, avoiding duplication and enabling safe Blueprint syncs between sandbox and production.

## Variable Types

| Type | Behavior |
|------|----------|
| `String` | Readable key/value pair. Value returned by API. |
| `SecretString` | Write-only. Value is never returned by the API or interpolated into user-facing outputs. Consumed only by backend services. |

## Hierarchical Namespacing

Keys use dot-separated namespacing to group related variables:

```
erp_api.oauth_token_url
erp_api.oauth_app_id
erp_api.oauth_secret
erp_lima.base_url
erp_lima.api_key
```

Key format: lowercase alphanumeric with dots, underscores, and hyphens. Max 128 characters. Pattern: `^[a-z0-9][a-z0-9_.-]{0,127}$`

## Variable Resolution

Reference environment variables in webhooks and templates using the `env` namespace:

```
{{ env.erp_api.base_url }}
{{ env.erp_api.oauth_token_url }}
{{ env.erp_api.oauth_secret }}
{{ env.n8n.metering_webhook_url }}
```

Resolution rules:

- Variables are resolved **server-side at runtime**
- `SecretString` values are only available in trusted backend contexts (webhooks, integrations)
- The Template Variables API excludes secrets from its response

## API Operations

Base path: `/v2/organization/environments`

| Operation | Method | Path | Description |
|-----------|--------|------|-------------|
| `listEnvironmentVariables` | `GET` | `/v2/organization/environments` | List all variables (metadata only, secret values omitted) |
| `createEnvironmentVariable` | `POST` | `/v2/organization/environments` | Create a new variable. Returns `409` if key already exists |
| `getEnvironmentVariable` | `GET` | `/v2/organization/environments/{key}` | Get a variable. Value included only for `String` type |
| `updateEnvironmentVariable` | `PUT` | `/v2/organization/environments/{key}` | Update a variable. Changes take effect immediately for all consumers |
| `deleteEnvironmentVariable` | `DELETE` | `/v2/organization/environments/{key}` | Delete a variable |

## Blueprint Interaction

Environment variables are **excluded from Blueprints**:

- Export does not include environment variables
- Import never overwrites environment values
- This prevents sandbox credentials from leaking to production

This is the key difference from Custom Variables, which transfer with Blueprints and can cause sandbox values to appear in production after a sync.

## Use Cases

### Sandbox/Production Parity

Deploy the same webhook configuration via Blueprints to both environments. URLs and credentials resolve to environment-specific values automatically, with no manual reconfiguration needed after import.

### ERP Integration Credentials

Define OAuth endpoints, API keys, and base URLs once as environment variables. All webhooks reference the same variables, so credential rotation requires updating a single value rather than editing every webhook individually.

### Reusable Global Variables

Store shared URLs, portal domains, and configuration flags as `String` variables. Reference them across templates and integrations without duplicating values or embedding them in complex handlebars logic.

## Security Considerations

- **KMS encryption** -- All values are encrypted at rest using per-org AWS KMS keys (envelope encryption)
- **Write-only secrets** -- `SecretString` values cannot be read back through the API
- **No frontend access** -- Secrets are resolved only in trusted backend contexts
- **No template interpolation** -- Secrets are never interpolated into user-facing template outputs
- **Log redaction** -- Secret values are redacted from all logs

## Examples

### Creating a Variable

```bash title="Create a String variable"
curl -X POST https://api.epilot.io/v2/organization/environments \
  -H "Authorization: Bearer $EPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "erp_api.base_url",
    "type": "String",
    "value": "https://erp.example.com/api/v1",
    "description": "ERP API base URL"
  }'
```

```bash title="Create a SecretString variable"
curl -X POST https://api.epilot.io/v2/organization/environments \
  -H "Authorization: Bearer $EPILOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "erp_api.oauth_secret",
    "type": "SecretString",
    "value": "sk_live_abc123...",
    "description": "ERP OAuth client secret"
  }'
```

### Using in Webhook Configuration

Reference environment variables in your webhook URL and authentication fields:

```json title="Webhook config using environment variables"
{
  "url": "{{ env.erp_api.base_url }}/webhooks/orders",
  "auth": {
    "type": "oauth",
    "token_url": "{{ env.erp_api.oauth_token_url }}",
    "client_id": "{{ env.erp_api.oauth_app_id }}",
    "client_secret": "{{ env.erp_api.oauth_secret }}"
  }
}
```

When this webhook fires, all `{{ env.* }}` references are resolved server-side to their org-specific values before the request is sent.
