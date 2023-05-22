---
sidebar_position: 2
---

# Authorization

:::info

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) tokens (JWT) for authorization.

:::

## Authorization Header

A valid bearer token should be passed in the `Authorization` request header to authorize API requests.

```
Authorization: Bearer <your-access-token>
```

## API Gateway Authorizer

Requests to epilot APIs are authorized on the API Gateway level. Token claims are passed to backend microservices.

## Permissions API

While the JWT token contains basic information about the identity of the authorized user such as user id and source organization, to check that the user is allowed to perform actions and access resources, we need to check the Permissions API for claims

Example:

```js
import { tokenIsPermitted } from '@epilot/permissions'

const isPermitted = await tokenIsPermitted(context.token, 'myaction')
```

[Permissions Documentation](/docs/auth/permissions)

## Links

- API Gateway Authorizer project: https://gitlab.com/e-pilot/product/auth/custom-authorizer
- Permissions package: https://www.npmjs.com/package/@epilot/permissions
- Internal Auth package: https://www.npmjs.com/package/@epilot/internal-auth
