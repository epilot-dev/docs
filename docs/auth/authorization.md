---
sidebar_position: 2
---

# Authorization

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) JWT tokens for authorization.

## API Gateway Authorizer

Requests to epilot APIs are authorized on the API Gateway level. Token claims are passed to backend microservices.

## Permissions API

While the JWT token contains basic information about the identity of the authorized user such as user id and source organization, to check that the user is allowed to perform actions and access resources, we need to check the Permissions API for claims

Example:

```js
import { tokenIsPermitted } from "@epilot/permissions";

const isPermitted = await tokenIsPermitted(context.token, "myaction");
```

[Permissions Documentation](/docs/auth/permissions)

## Internal Auth

Sometimes backend microservices need to make internal calls as no specific user.

For this purpose we use a special internal auth service as identity provider, which translates the caller's IAM role to a JWT token accepted by the API Gateway Authorizer.

See [documentation](/docs/auth/internal-auth) for the internal auth service for details.

## Links

- API Gateway Authorizer project: https://gitlab.com/e-pilot/product/auth/custom-authorizer
- Permissions package: https://www.npmjs.com/package/@epilot/permissions
- Internal Auth package: https://www.npmjs.com/package/@epilot/internal-auth
