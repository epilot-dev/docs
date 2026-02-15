---
sidebar_position: 6
title: Token Types
---

# Token Types

epilot uses three token types for authentication. Choose the right one for your integration:

## Token Comparison

| | OAuth 2.0 Token | Access Token | Publishable Token |
|---|---|---|---|
| **Lifetime** | 60 minutes | Long-lived (no expiry) | Long-lived (no expiry) |
| **Use case** | Interactive user sessions | Server-side API integrations | Client-side public apps (journeys, portals) |
| **Format** | JWT (Cognito-issued) | JWT (epilot-issued) | JWT (epilot-issued, public key) |
| **Refresh** | Via refresh token | Not needed | Not needed |
| **Scope** | Full user permissions | Scoped to assigned roles | Limited to public API access |
| **Security** | Keep confidential | Keep confidential | Safe for client-side use |

## OAuth 2.0 Tokens

epilot uses [Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) as the OAuth 2.0 identity provider.

### Token Set

On successful authentication, Cognito issues three tokens:

- **ID Token** — Contains user identity claims (`sub`, `email`, `custom:org_id`). epilot APIs use this token for authorization.
- **Access Token** — Standard Cognito access token for the user pool.
- **Refresh Token** — Obtains new ID/access tokens without re-authenticating.

### Lifetime

OAuth tokens expire after **60 minutes**. Use the refresh token to obtain new tokens transparently.

:::tip
OAuth tokens suit interactive user sessions. For API integrations, use long-lived [Access Tokens](/docs/auth/access-tokens) instead.
:::

## Access Tokens

Access Tokens are long-lived JWTs for server-side integrations — the recommended authentication method for backend systems, scripts, and third-party applications. See [Access Tokens](/docs/auth/access-tokens) for full management details.

### How They Work

The epilot Access Token service issues JWTs with claims compatible with Cognito-issued tokens, so all epilot APIs accept them seamlessly via the standard `Authorization` header.

```
Authorization: Bearer <your-access-token>
```

### Creating Access Tokens

Create tokens in the epilot portal under **Settings > Access Tokens**, or programmatically via the [Access Token API](/api/access-token):

```typescript title="create-access-token.ts"
import { authorize, getClient } from '@epilot/access-token-client';

const accessTokenClient = getClient();
authorize(accessTokenClient, cognitoIdToken);

const { data } = await accessTokenClient.createAccessToken(null, {
  name: 'SAP Integration',
  assume_roles: ['123:sap_integration_role'],
});

// data.access_token contains the token — save it securely
```

### Role Assignment

Scope each Access Token to specific roles via `assume_roles`. If omitted, the token inherits the creating user's roles.

```json title="Role assignment"
{
  "assume_roles": ["123:sap_integration_role"]
}
```

:::warning
Creating access tokens requires the `token:create` permission. The generated token is shown **only once** and cannot be recovered.
:::

### Revoking Access Tokens

Revoke tokens from the management UI or via the API:

```http title="Revoke an access token"
DELETE /v1/access-tokens/{id}
```

Revoked tokens are immediately invalidated.

## Publishable Tokens

Publishable Tokens are safe to embed in client-side code for public-facing applications like journeys and customer portals.

### Characteristics

- **Limited scope** — Only grants access to public-facing APIs (submissions, product catalog, file uploads)
- **Tenant identity** — Encodes the organization ID, eliminating the need for `x-epilot-org-id` headers
- **Separate signing key** — Verified via a dedicated public JWKS endpoint, separate from Access Token keys
- **Revocable** — Can be rotated or revoked from the Access Token management UI

### Usage

Pass Publishable Tokens as a bearer token in the `Authorization` header:

```http
Authorization: Bearer <publishable-token>
```

Journeys and portals use the Publishable Token from their configuration automatically. You typically don't need to manage these tokens manually.

## JWT Structure

All token types use JWT (JSON Web Token) format, signed with RS256.

### OAuth 2.0 ID Token Claims

| Claim | Description |
|---|---|
| `sub` | Cognito user ID |
| `email` | User's email address |
| `custom:org_id` | Organization ID |
| `iss` | Cognito User Pool issuer URL (`https://cognito-idp.<region>.amazonaws.com/<pool-id>`) |
| `exp` | Expiration timestamp |

### Access Token Claims

| Claim | Description |
|---|---|
| `token_id` | Unique token identifier (e.g., `api_5ZugdRXasLfWBypHi93Fk`) |
| `token_name` | Human-readable token name |
| `org_id` | Organization ID |
| `user_id` | User identifier (same as `token_id` for API tokens) |
| `token_type` | Token type: `api`, `journey`, `portal`, `assume`, `app` |
| `assume_roles` | List of role IDs (e.g., `["123:owner"]`) |
| `iss` | Access Token service issuer URL |
| `iat` | Issued-at timestamp |

### Token Verification

The epilot API Gateway authorizer verifies all tokens automatically using JWKS (JSON Web Key Set) endpoints:

| Token Type | JWKS Endpoint |
|---|---|
| OAuth (Cognito) | `https://cognito-idp.<region>.amazonaws.com/<pool-id>/.well-known/jwks.json` |
| Access Token | `/v1/access-tokens/.well-known/jwks.json` |
| Publishable Token | `/v1/access-tokens/public/.well-known/jwks.json` |

## Choosing a Token Type

| Scenario | Token Type | Action |
|---|---|---|
| Backend integration | [Access Token](/docs/auth/access-tokens) | Create under **Settings > Access Tokens** with scoped roles |
| Interactive user sessions | OAuth Token | Issued automatically on portal login |
| Embedding a journey or portal | Publishable Token | Configured automatically — no action needed |

## See Also

- [Authentication](/docs/auth/authentication) — OAuth 2.0 login flows and SDK usage
- [Security Architecture](/docs/architecture/security) — Platform security overview
- [Access Tokens](/docs/auth/access-tokens) — Creating and managing Access Tokens
- [Permissions](/docs/auth/permissions) — Role-based access control and grants
