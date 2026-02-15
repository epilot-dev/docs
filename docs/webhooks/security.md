---
sidebar_position: 2
title: "Security"
---

## Endpoint Authentication

epilot supports three methods for authenticating requests to your webhook endpoint:

### API Key

epilot sends your configured API key in the `X-API-Key` header with each request. Validate this key before processing any payload.

### Basic Auth

epilot Base64-encodes the configured username and password and sends them in the `Authorization: Basic` header. Always use HTTPS to prevent credential exposure.

### OAuth

epilot obtains an access token from your authorization server and sends it in the `Authorization: Bearer` header. Token expiration and refresh are handled automatically.

## Webhook Signature Verification

Every webhook request from epilot includes three signature headers:

| Header | Description |
|--------|-------------|
| `webhook-id` | Unique message identifier (e.g. `msg_2a4f8b...`) |
| `webhook-timestamp` | Unix timestamp (seconds) when the request was signed |
| `webhook-signature` | Space-separated signatures: `v1a,<asymmetric> v1,<symmetric>` |

## Two Signatures, Two Purposes

epilot sends **two** signatures with each webhook request:

- **`v1a`** (asymmetric, Ed25519) — Proves the request came from your organization. Verified using your organization's public key, which is specific to your tenant and never shared across organizations.
- **`v1`** (symmetric, HMAC-SHA256) — Proves the request is intended for your specific webhook. Verified using the `whsec_...` signing secret you received when the webhook was created.

Both signatures are computed over the same content:

```
signed_content = ${webhook-id}.${webhook-timestamp}.${request_body}
```

## Verification

### Option 1: Symmetric Verification (recommended for most use cases)

Use the [`standardwebhooks`](https://www.npmjs.com/package/standardwebhooks) npm package to verify the `v1` signature with your webhook's signing secret.

```typescript
import { Webhook } from "standardwebhooks";

const signingSecret = "whsec_..."; // from webhook creation response

function verifyWebhook(req: Request): boolean {
  const payload = req.body; // raw request body as string
  const headers = req.headers;

  // Extract the v1 signature and convert prefix for standardwebhooks compatibility
  const signatureHeader = headers["webhook-signature"];
  const v1sSig = signatureHeader
    .split(" ")[1]

  if (!v1sSig) {
    throw new Error("No symmetric signature found");
  }

  const wh = new Webhook(signingSecret);

  // verify() throws if the signature is invalid or timestamp is too old
  wh.verify(payload, {
    "webhook-id": headers["webhook-id"],
    "webhook-timestamp": headers["webhook-timestamp"],
    "webhook-signature": v1sSig,
  });

  return true;
}
```

### Option 2: Asymmetric Verification

Use Node.js `crypto` to verify the `v1a` Ed25519 signature with your organization's public key. Each tenant has their own key pair.

```typescript
import crypto from "node:crypto";

// Fetch your organization's public key (per-tenant)
// Requires org_id query parameter
async function getOrgPublicKey(orgId: string): Promise<string> {
  const response = await fetch(
    `https://webhooks.sls.epilot.io/v1/webhooks/.well-known/public-key?orgId=${orgId}`
  );
  const data = await response.json();
  return data.public_key;
}

async function verifyAsymmetric(req: Request, orgId: string): Promise<boolean> {
  const payload = req.body; // raw request body as string
  const headers = req.headers;

  // Fetch and cache your organization's public key (rarely changes)
  // The public key is specific to your organization (org_id)
  const orgPublicKey = await getOrgPublicKey(orgId);

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
    orgPublicKey,
    signature
  );
}
```

### Option 3: Verify Both

For maximum security, verify both signatures:

```typescript
async function verifyWebhookFull(req: Request, orgId: string): Promise<boolean> {
  // 1. Check timestamp freshness (reject requests older than 5 minutes)
  const timestamp = Number(req.headers["webhook-timestamp"]);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    throw new Error("Webhook timestamp too old — possible replay attack");
  }

  // 2. Verify asymmetric signature (proves it came from your organization)
  const isFromOrg = await verifyAsymmetric(req, orgId);
  if (!isFromOrg) {
    throw new Error("Invalid asymmetric signature");
  }

  // 3. Verify symmetric signature (proves it's for your webhook)
  verifyWebhook(req); // throws on failure

  return true;
}
```

## Fetching the Public Key

To fetch your organization's public key, include your organization ID as a query parameter:

```bash
curl "https://webhooks.sls.epilot.io/v1/webhooks/.well-known/public-key?orgId=YOUR_ORG_ID"
```

Response:

```json
{
  "public_key": "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA...\n-----END PUBLIC KEY-----\n"
}
```

Cache this key — it's unique to your organization and rarely changes. The public key is derived from your organization's private Ed25519 key pair, which is stored encrypted and never leaves epilot's systems.

## Signing Secret

The `whsec_...` signing secret is returned **only once** in the response when you create a webhook. Store it securely. If lost, you'll need to recreate the webhook to get a new one.
