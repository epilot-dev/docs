---
sidebar_position: 2
---

# Authorization

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) JWT tokens for authorization.

## API Gateway Authorizer

Requests to non-public epilot APIs are authorized by a custom Lambda authorizer that verifies the passed JWT Token and parses the user's claims contained in the token.

The claims are passed to the API service as context:

```json
// Example ID token:
{
  "token_use": "id",
  "sub": "0cd63e9c-42b4-4a38-97b8-1e41e42677e3",
  "cognito:username": "v.kuosmanen@epilot.cloud",
  "email": "v.kuosmanen@epilot.cloud",
  "custom:ivy_org_id": "66",
  "custom:ivy_user_id": "29216",
  "email_verified": true,
  "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_hhz2uIClH",
  "aud": "gj9p0jreihtq00cri6a0fe306",
  "event_id": "cf3df1cd-2aac-433c-8576-d2834c579ebb",
  "auth_time": 1641386601,
  "exp": 1642357470,
  "iat": 1642353870,
}
```

## Permissions API

While the JWT token contains basic information about the identity of the authorized user such as user id and source organization, to check that the user is allowed to perform actions and access resources, we need to check the Permissions API for claims

Example:
```js
import { tokenIsPermitted } from '@epilot/permissions';

const isPermitted = await tokenIsPermitted(context.token, 'myaction');
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
