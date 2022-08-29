---
sidebar_position: 1
---

# Authentication

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) tokens for user authentication.

## Quick Start

You can obtain a token for testing epilot APIs quickly via the command line.

Requires [Node.js](https://nodejs.org/en/download/) to be installed.

```sh
$ npx @epilot/auth

? Email email@example.com
? Password [hidden]

# <access token printed here>
```

Using [Access Tokens](/docs/auth/access-tokens) with the [SDK](/docs/architecture/sdk):

```sh
npm install --save @epilot/auth
```

```typescript
import { authorizeWithToken } from '@epilot/auth';
import entityClient from '@epilot/entity-client';

authorizeWithToken(entityClient, '<my_access_token>');

// you can now use authorized entity client
```

## Cognito User Pools

Each tenant organisation in epilot has their own Cognito user pool backend and OAuth configuration to provide login and 3rd party Single Sign-On.

## User API

The epilot user API provides functionality to invite and manage users in epilot organisations.

The Cognito sync service part of the User API takes care of managing users in each User Pool.

## Login using API

While we recommend using [Access Tokens](/docs/auth/access-tokens), you can also authenticate with your username and password using the the [SDK](/docs/architecture/sdk):

```sh
npm install --save @epilot/auth
```

```typescript
import { authenticate } from '@epilot/auth';
import entityClient from '@epilot/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});
credentials.configureClient(entityClient);

// entityClient is now authorized with epilot OAuth2 tokens
```
