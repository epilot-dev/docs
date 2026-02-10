---
sidebar_position: 2
title: "Security"
---

## API Key

API Key authentication allows you to secure your webhook endpoint by requiring a secret key to be included in the request headers. When configuring your webhook, you can specify an API key that epilot will send with each request.

The API key is typically sent in the `X-API-Key` header. Your endpoint should validate this key before processing any webhook payload to ensure the request originates from epilot.

## Basic Auth (Username + Password)

Basic Authentication provides a simple way to secure your webhook endpoint using a username and password combination. When configured, epilot encodes the credentials using Base64 and includes them in the `Authorization` header with the `Basic` scheme.

Your server should decode and validate these credentials before accepting the webhook payload. This method is widely supported and easy to implement, though it should always be used over HTTPS to prevent credential exposure.

## OAuth

OAuth authentication enables secure, token-based access to your webhook endpoints. This method is particularly useful when integrating with systems that already use OAuth for authentication.

When configured with OAuth, epilot will obtain an access token from your authorization server and include it in the `Authorization` header with the `Bearer` scheme. This approach provides enhanced security through token expiration and refresh mechanisms.


# Webhook Signature Verification

Every webhook request from epilot includes three signature headers:

| Header | Description |
|--------|-------------|
| `webhook-id` | Unique message identifier (e.g. `msg_2a4f8b...`) |
| `webhook-timestamp` | Unix timestamp (seconds) when the request was signed |
| `webhook-signature` | Space-separated signatures: `v1a,<asymmetric> v1s,<symmetric>` |

## Two Signatures, Two Purposes

epilot sends **two** signatures with each webhook request:

- **`v1a`** (asymmetric, Ed25519) — Proves the request came from epilot. Verified using epilot's public key, which you can fetch from the `/v1/webhooks/.well-known/public-key` endpoint.
- **`v1s`** (symmetric, HMAC-SHA256) — Proves the request is intended for your specific webhook. Verified using the `whsec_...` signing secret you received when the webhook was created.

Both signatures are computed over the same content:

```
signed_content = ${webhook-id}.${webhook-timestamp}.${request_body}
```

## Signed Payload Fields

Every webhook payload includes two system-injected fields that are **always set by epilot after any payload transformations** (including JSONata). These fields cannot be modified or spoofed:

- `_org_id` — The epilot organization ID that owns the webhook
- `_webhook_event_id` — The unique event ID for this webhook invocation

## Verification

### Option 1: Symmetric Verification (recommended for most use cases)

Use the [`standardwebhooks`](https://www.npmjs.com/package/standardwebhooks) npm package to verify the `v1s` signature with your webhook's signing secret.

```typescript
import { Webhook } from "standardwebhooks";

const signingSecret = "whsec_..."; // from webhook creation response

function verifyWebhook(req: Request): boolean {
  const payload = req.body; // raw request body as string
  const headers = req.headers;

  // Extract the v1s signature and convert prefix for standardwebhooks compatibility
  const signatureHeader = headers["webhook-signature"];
  const v1sSig = signatureHeader
    .split(" ")
    .find((s) => s.startsWith("v1s,"));

  if (!v1sSig) {
    throw new Error("No symmetric signature found");
  }

  // standardwebhooks expects "v1," prefix, so replace "v1s," -> "v1,"
  const standardSig = v1sSig.replace("v1s,", "v1,");

  const wh = new Webhook(signingSecret);

  // verify() throws if the signature is invalid or timestamp is too old
  wh.verify(payload, {
    "webhook-id": headers["webhook-id"],
    "webhook-timestamp": headers["webhook-timestamp"],
    "webhook-signature": standardSig,
  });

  return true;
}
```

### Option 2: Asymmetric Verification

Use Node.js `crypto` to verify the `v1a` Ed25519 signature with epilot's public key.

```typescript
import crypto from "node:crypto";

// Fetch once and cache — this key rarely changes
// GET /v1/webhooks/.well-known/public-key
const epilotPublicKey = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA...
-----END PUBLIC KEY-----`;

function verifyAsymmetric(req: Request): boolean {
  const payload = req.body; // raw request body as string
  const headers = req.headers;

  const signatureHeader = headers["webhook-signature"];
  const v1aSig = signatureHeader
    .split(" ")
    .find((s) => s.startsWith("v1a,"));

  if (!v1aSig) {
    throw new Error("No asymmetric signature found");
  }

  const signature = Buffer.from(v1aSig.replace("v1a,", ""), "base64");

  const signedContent = `${headers["webhook-id"]}.${headers["webhook-timestamp"]}.${payload}`;

  return crypto.verify(
    null,
    new TextEncoder().encode(signedContent),
    epilotPublicKey,
    signature
  );
}
```

### Option 3: Verify Both

For maximum security, verify both signatures:

```typescript
function verifyWebhookFull(req: Request): boolean {
  // 1. Check timestamp freshness (reject requests older than 5 minutes)
  const timestamp = Number(req.headers["webhook-timestamp"]);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    throw new Error("Webhook timestamp too old — possible replay attack");
  }

  // 2. Verify asymmetric signature (proves it came from epilot)
  const isFromEpilot = verifyAsymmetric(req);
  if (!isFromEpilot) {
    throw new Error("Invalid asymmetric signature");
  }

  // 3. Verify symmetric signature (proves it's for your webhook)
  verifyWebhook(req); // throws on failure

  return true;
}
```

## Fetching the Public Key

```bash
curl https://webhooks.sls.epilot.cloud/v1/webhooks/.well-known/public-key
```

```json
{
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA...\n-----END PUBLIC KEY-----\n"
}
```

Cache this key — it only changes if epilot rotates signing keys.

## Signing Secret

The `whsec_...` signing secret is returned **only once** in the response when you create a webhook. Store it securely. If lost, you'll need to recreate the webhook to get a new one.
