---
sidebar_position: 1
---

# Authentication

The epilot application uses standard [OAuth 2.0](https://oauth.net/2/) for user authentication.

## Quick Start

```sh
npm install --save @epilot/auth
```

```typescript
import { authenticate, authorizeClient } from '@epilot/auth';
import { getClient } from '@epilot/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(credentials))

// entityClient will be authorized using epilot OAuth tokens
```

## Cognito User Pools

Each tenant organisation in epilot has their own Cognito user pool backend and OAuth configuration to provide login and 3rd party Single Sign-On.

## User API

The epilot user API provides functionality to invite and manage users in epilot organisations.

The Cognito sync service part of the User API takes care of managing users in each User Pool.