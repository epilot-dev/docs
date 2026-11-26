---
title: API Proxy
hide_title: true
sidebar_position: 6
---

# API Proxy

API Proxy components let your app call external APIs without exposing credentials to the browser. The proxy runs server-side — API keys, OAuth tokens, and secrets never reach the client.

This is especially useful for **client-facing components** like journey blocks, portal blocks, and capabilities that need to call external APIs.

## How it works

```
Browser (your app component)
  │
  │  proxy('my-api', '/products', { appId, token })
  │
  ▼
epilot Proxy (server-side)
  │  ✓ Injects auth credentials
  │  ✓ Signs request with Ed25519
  │  ✓ SSRF protection
  │
  ▼
External API (https://api.example.com/products)
```

## Quick start

### 1. Add an API Proxy component to your app

In the App Builder, add a new **API Proxy** component and configure:

- **Display Name** — the name shown in the App Builder
- **Proxy Name** — the identifier you call the proxy by (e.g. `products-api`): letters, digits, `-` and `_`, at most 64 characters
- **Target URL** — the base URL of the external API (must be HTTPS). It can contain `{{option_key}}` placeholders that are filled from your app options, e.g. `https://{{api_host}}/v1`
- **Auth Type** — how to authenticate with the target API

### 2. Add secret options to your app

If your proxy uses authentication, declare the [app options](/docs/apps/app-options) that hold the credentials at the top level of your manifest. The proxy looks them up by fixed keys, listed under [Authentication types](#authentication-types). The installer provides the actual API key or credentials when installing your app; the proxy resolves the value server-side and injects it into the forwarded request — it never reaches the browser.

### 3. Call the proxy from your app

```bash
npm install @epilot/app-sdk
```

```typescript
import { proxy } from '@epilot/app-sdk';

const data = await proxy(
  'products-api',   // proxy name (as configured in step 1)
  '/products',      // path on the target API
  {
    appId: 'your-app-id',  // your app ID
    token: ctx.token,       // auth token from the app context
    method: 'POST',
    body: { category: 'solar' },
  }
);
```

`proxy()` returns the parsed response body: JSON when the target answers with JSON, text otherwise. Set `responseType` to `json`, `text`, `blob` or `arrayBuffer` to choose explicitly. A response with an error status throws a `ProxyRequestError` carrying the status and body.

Further options are `params` (query parameters) and `headers`. Supported methods are `GET`, `POST`, `PUT`, `PATCH` and `DELETE`.

## Authentication types

### None

No credentials are injected. Useful for public APIs.

The proxy reads the credentials from app options with fixed keys. Declare the options under exactly these keys:

| Auth type | Option keys |
|---|---|
| Custom Header, Bearer Token | `secret` |
| Basic | `username`, `password` |
| OAuth 2.0 | `client_id`, `client_secret`, optionally `scope` |

### Custom Header

Injects the value of the `secret` option as a custom header (e.g. `X-API-Key`).

```
X-API-Key: <resolved-secret-value>
```

### Bearer Token

Injects the value of the `secret` option as a Bearer token.

```
Authorization: Bearer <resolved-secret-value>
```

### Basic

Builds a Basic `Authorization` header from the `username` and `password` options. Basic auth can be configured in the [manifest](/docs/apps/app-manifest) (`auth_type: "basic"`) and with the CLI, not in the App Builder.

### OAuth 2.0 (Client Credentials)

The proxy handles the full OAuth 2.0 client credentials flow:

1. Resolves `client_id` and `client_secret` from your app's options
2. Exchanges them at the token endpoint for an access token
3. Caches the token until it expires
4. Injects it as a Bearer header

Configure the **Token URL** — the OAuth token endpoint (e.g. `https://auth.example.com/oauth/token`) — and declare the app options `client_id`, `client_secret` and, if needed, `scope`.

## What is forwarded

- **Request headers**: only `Content-Type`, `Accept`, `Accept-Language`, `Accept-Encoding`, `Cache-Control`, `If-None-Match` and `If-Modified-Since` are passed on. The caller's `Authorization` header and cookies are never forwarded.
- **Extra headers**: static headers configured on the proxy (`headers` in the component configuration) are added to every request. Their values can use `{{option_key}}` placeholders.
- **Timeouts**: the target has 25 seconds to answer; an OAuth token exchange has 10 seconds.
- **Binary responses** are supported up to 4 MB.

## Request signing

Every proxy request is signed with Ed25519 so the target API can verify it came from epilot. Three headers are added to every forwarded request:

| Header | Example |
| --- | --- |
| `webhook-id` | `msg_a1b2c3d4e5f6...` |
| `webhook-timestamp` | `1711360000` |
| `webhook-signature` | `v1a,base64...` |

The signed content is `{webhook-id}.{webhook-timestamp}.{body}`.

### Verifying signatures with the App SDK

The `@epilot/app-sdk` provides a `verifyEpilotSignature` helper to verify incoming requests:

```typescript
import { verifyEpilotSignature } from '@epilot/app-sdk';

// Express / Node.js example
app.post('/webhook', async (req, res) => {
  const isValid = await verifyEpilotSignature(req);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the verified request
  res.json({ ok: true });
});
```

The SDK automatically fetches and caches the public key from `https://cdn.app.sls.epilot.io/v1/.well-known/public-key`.

:::tip
Make sure the raw request body is available as `req.body` (string or Buffer). If you're using a JSON body parser, configure it to also preserve the raw body — the signature is verified against the raw body, not the parsed object.
:::

### Manual verification

If you prefer to verify manually, fetch the public key and use Ed25519:

```bash
curl https://cdn.app.sls.epilot.io/v1/.well-known/public-key
```

```json
{
  "public_key": "-----BEGIN PUBLIC KEY-----\n...",
  "algorithm": "ed25519",
  "issuer": "epilot"
}
```

```typescript
import { verify } from 'node:crypto';

const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
const isValid = verify(
  null,
  Buffer.from(signedContent, 'utf8'),
  publicKeyPem,
  Buffer.from(signature, 'base64')
);
```

## Security

- Secrets are **encrypted at rest** with KMS — never stored in plaintext
- Secret values are **never returned** to client-side components
- Only **HTTPS** targets are allowed
- **SSRF protection** validates target URLs before forwarding: private, loopback and link-local addresses and internal host names are refused
- Requests require a valid epilot auth token and an active app installation
