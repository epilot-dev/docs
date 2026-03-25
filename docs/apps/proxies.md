---
title: API Proxies
hide_title: true
sidebar_position: 7
---

# API Proxies

API Proxies let your app call external APIs without exposing credentials to the browser. The proxy runs server-side — API keys, OAuth tokens, and secrets never reach the client.

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

### 1. Configure a proxy in the App Builder

Go to your app's **Proxies** section and add a target:

- **Name** — a unique identifier (e.g. `products-api`)
- **Target URL** — the base URL of the external API (must be HTTPS)
- **Auth Type** — how to authenticate with the target API

### 2. Add secret options to your component

If your proxy uses authentication, add a **secret** type option to your component under **Configuration Options**. The installer provides the actual API key or credentials when installing your app.

### 3. Call the proxy from your app

```bash
npm install @epilot/app-sdk
```

```typescript
import { proxy } from '@epilot/app-sdk';

const response = await proxy(
  'products-api',   // proxy name (as configured in step 1)
  '/products',      // path on the target API
  {
    appId: 'your-app-id',  // your app ID
    token: ctx.token,       // auth token from the app context
    method: 'POST',
    body: { category: 'solar' },
  }
);

const data = await response.json();
```

## Authentication types

### None

No credentials are injected. Useful for public APIs.

### Custom Header

Injects a secret value as a custom header (e.g. `X-API-Key`).

```
X-API-Key: <resolved-secret-value>
```

### Bearer Token

Injects a secret value as a Bearer token.

```
Authorization: Bearer <resolved-secret-value>
```

### OAuth 2.0 (Client Credentials)

The proxy handles the full OAuth 2.0 client credentials flow:

1. Resolves `client_id` and `client_secret` from your component's options
2. Exchanges them at the token endpoint for an access token
3. Caches the token until it expires
4. Injects it as a Bearer header

Configure:
- **Token URL** — the OAuth token endpoint (e.g. `https://auth.example.com/oauth/token`)
- **Client ID** — reference to a component option
- **Client Secret** — reference to a secret-type component option
- **Scope** — optional, reference to a component option

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
- **SSRF protection** validates target URLs before forwarding
- Requests require a valid epilot auth token and an active app installation
