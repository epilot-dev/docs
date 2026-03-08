---
sidebar_position: 7
title: Migration from @epilot/*-client
---

# Migration from `@epilot/*-client`

`@epilot/sdk` replaces the individual `@epilot/*-client` packages. All APIs are now available under a single package with tree-shakeable imports. One dependency instead of dozens.

:::info Key change
`getClient()` and `createClient()` are now **async** and return a `Promise`. Add `await` to all calls.
:::

## Client imports

```ts
// Before
import { getClient } from '@epilot/entity-client'
const entityClient = getClient()

// After
import { getClient } from '@epilot/sdk/entity'
const entityClient = await getClient()
```

## Fresh client

```ts
// Before
import { createClient } from '@epilot/entity-client'
const entityClient = createClient()

// After
import { createClient } from '@epilot/sdk/entity'
const entityClient = await createClient()
```

## Types

Schema types are now re-exported directly. No more `Components.Schemas` nesting.

```ts
// Before
import type { Client, Components } from '@epilot/entity-client'
type MyEntity = Components.Schemas.Entity

// After
import type { Client, Entity } from '@epilot/sdk/entity'
```

## Authorization

```ts
// Before
import { createClient } from '@epilot/entity-client'
const client = createClient()
client.defaults.headers['Authorization'] = `Bearer ${token}`

// After
import { getClient, authorize } from '@epilot/sdk/entity'
const client = await getClient()
authorize(client, () => token)
```

Or use global authorization to set the token once for all clients:

```ts
import { epilot } from '@epilot/sdk'
epilot.authorize(() => token)
```
