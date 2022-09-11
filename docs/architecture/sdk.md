---
sidebar_position: 3
---

# SDK

[[GitHub](https://github.com/epilot-dev/sdk-js)]
[[NPM](https://www.npmjs.com/package/epilot-sdk)]

:::tip

We provide a JavaScript / TypeScript SDK with types and Intellisense support for developers building with epilot APIs.

:::

## Getting Started

Install the SDK

```sh
npm install --save epilot-sdk
```

Authorize a client module with an [Access Token](/docs/auth/access-tokens) and call epilot APIs:

```typescript
import { authorizeWithToken } from 'epilot-sdk/auth'
import entityClient from 'epilot-sdk/entity-client'

// See https://docs.epilot.io/api/access-token
authorizeWithToken(entityClient, '<my_access_token>')

// See https://docs.epilot.io/api/entity/
await entityClient.createEntity('contact', {
  first_name: 'Example',
  last_name: 'Contact',
})
```

## SDK packages

The full SDK library is available both as a single package [`epilot-sdk`](https://www.npmjs.com/package/epilot-sdk) for convenience, but also as separate dependencies:

```typescript
import entityClient from 'epilot-sdk/entity-client'
import { getClient } from '@epilot/entity-client' // latest
```

## SDK Packages

View full list of API clients in our GitHub repository:

https://github.com/epilot-dev/sdk-js/tree/main/clients
