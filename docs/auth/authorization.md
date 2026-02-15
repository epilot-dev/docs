---
sidebar_position: 3
---

# Authorization

:::info

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) tokens (JWT) for authorization.

:::

## Authorization Header

Pass a valid bearer token in the `Authorization` request header to authorize API requests:

```http title="Authorization header"
Authorization: Bearer <your-access-token>
```

## API Gateway Authorizer

All requests to epilot APIs pass through an API Gateway authorizer that validates the bearer token and extracts claims. Backend microservices receive these claims as verified context.

## Permissions API

The JWT token identifies the user (user ID, organization), but does not encode what the user can do. To check whether a user can perform a specific action, call the [Permissions API](/docs/auth/permissions).

```js title="Check permissions"
import { tokenIsPermitted } from '@epilot/permissions'

const isPermitted = await tokenIsPermitted(context.token, 'myaction')
```

See the full [Permissions documentation](/docs/auth/permissions) for details on roles, grants, and evaluation logic.

## See Also

- [Token Types](/docs/auth/token-types) — comparison of all epilot token types
- [Permissions](/docs/auth/permissions) — role-based access control
- [`@epilot/permissions`](https://www.npmjs.com/package/@epilot/permissions) — permissions evaluation package
