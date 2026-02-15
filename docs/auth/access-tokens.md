---
sidebar_position: 2
---

# Access Tokens

[[API Docs](/api/access-token)]
[[SDK](https://www.npmjs.com/package/@epilot/access-token-client)]

:::info

To call epilot APIs, requests must be authorized using a valid _Access Token_.

:::

## Using Access Tokens

Pass the access token in the `Authorization` request header:

```
Authorization: Bearer <your-access-token>
```

## Creating Access Tokens

Manage Access Tokens from [Settings > Access Tokens](https://portal.epilot.cloud/app/tokens) in the epilot 360 app. Creating tokens requires the `token:create` permission.

By default, a new Access Token inherits the roles and permissions of the creating user.

![Access Token create view](/img/create-access-token.png)

:::note
The generated token is shown only once and must be saved by the user.
:::

## Revoking Access Tokens

Delete an Access Token from the management view to revoke it. After revocation, the token is immediately invalidated.

![Access Token management view](../../static/img/access-token-management.png)

:::caution
epilot doesn't store and cannot recover lost or revoked access tokens.
:::

## Access Token API

Generate access tokens programmatically using the [Access Token API](/api/access-token) `createAccessToken` operation:

```
POST /v1/access-tokens
```

```json
{
  "name": "Token for my application"
}
```

Optionally, pass a list of Role IDs to scope the token to specific roles. By default, the token inherits the caller's roles.

```
POST /v1/access-tokens
```

```json
{
  "name": "Postman Access Token",
  "assume_roles": ["123:owner"]
}
```

Each Access Token generated via the API receives a unique ID.

```json
// 201 - success
{
  "id": "api_5ZugdRXasLfWBypHi93Fk",
  "created_at": "2019-08-24T14:15:22Z",
  "name": "Postman Access Token",
  "assignments": ["123:owner"]
}
```

Revoke access tokens using the `revokeAccessToken` operation:

```
DELETE /v1/access-tokens/api_5ZugdRXasLfWBypHi93Fk
```

```json
// 200 - success
{
  "id": "api_5ZugdRXasLfWBypHi93Fk",
  "created_at": "2019-08-24T14:15:22Z",
  "name": "Postman Access Token",
  "assignments": ["123:owner"]
}
```

## See Also

- [Token Types](/docs/auth/token-types) — comparison of all epilot token types
- [Authentication](/docs/auth/authentication) — OAuth 2.0 login flow
- [Permissions](/docs/auth/permissions) — role-based access control and grants
