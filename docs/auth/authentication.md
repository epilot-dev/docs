---
sidebar_position: 1
---

# Authentication

:::info

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) to authenticate.

:::

## Quick Start

You can login to obtain a token for testing epilot APIs quickly via the command line. (Requires [Node.js](https://nodejs.org/en/download/))

```sh
$ npx @epilot/auth

? Email email@example.com
? Password [hidden]

# <access token printed here>
```

:::tip

OAuth tokens expire after a short period (60 min) and must be refreshed using a refresh token.

For integration purposes we recommend using long term [Access Tokens](/docs/auth/access-tokens).

:::

```typescript
import { authorizeWithToken } from '@epilot/auth'
import entityClient from '@epilot/entity-client'

authorizeWithToken(entityClient, '<my_access_token>')

// you can now use entity client
```

## Cognito User Pools

Each epilot tenant gets their own Cognito User Pool for login.

Cognito also provides SSO and MFA functionality, configurable via Organisation Settings in epilot.

## User API

The epilot user API provides functionality to invite and manage users in epilot organisations.

The Cognito sync service part of the User API takes care of managing users in each User Pool.

## Login with SDK

While we recommend using [Access Tokens](/docs/auth/access-tokens), you can also authenticate with your username and password using the the [SDK](/docs/architecture/sdk):

```sh
npm install --save @epilot/auth
```

```typescript
import { authenticate } from '@epilot/auth'
import entityClient from '@epilot/entity-client'

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
})
credentials.configureClient(entityClient)

// entityClient is now authorized with epilot OAuth2 tokens
```
