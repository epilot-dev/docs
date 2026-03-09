---
sidebar_position: 3
title: Client Usage
---

# Client Usage

The SDK gives you three ways to call epilot APIs, from simplest to most flexible.

## Operation methods (recommended)

Call operation methods directly on the SDK client. The SDK handles client creation, caching, and auth for you.

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-token>')

const { data: entity } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })
const { data: user } = await epilot.user.getMe()
```

Operation methods always use the latest config. If you call `epilot.authorize()` with a new token, every subsequent call picks it up automatically.

### Function arguments

Every operation method accepts up to three positional arguments:

```ts
client.operationId(parameters?, data?, config?)
```

| Argument | Purpose | Example |
| --- | --- | --- |
| `parameters` | Path and query parameters | `{ slug: 'contact', id: '123' }` |
| `data` | Request body (JSON payload, FormData, etc.) | `{ name: 'John' }` |
| `config` | Axios request config overrides | `{ headers: { 'x-custom': 'value' } }` |

**When the operation has path/query params and a body**, pass both:

```ts
// PATCH /v1/entity/{slug}/{id}
await epilot.entity.patchEntity(
  { slug: 'contact', id: '123' },  // parameters
  { name: 'Jane Doe' },             // request body
)
```

**When the operation has path/query params but no body**, pass only parameters:

```ts
// GET /v1/entity/{slug}/{id}
await epilot.entity.getEntity({ slug: 'contact', id: '123' })
```

**When the operation has a body but no path/query params**, pass `null` as the first argument:

```ts
// POST /v1/entity/search
await epilot.entity.searchEntities(
  null,                              // no parameters — pass null
  { q: '_schema:contact AND John' }, // request body
)
```

:::caution Forgetting to pass `null`
This is a common mistake. If you skip the first argument, the request body gets interpreted as parameters and the API call will fail silently or return unexpected results:

```ts
// Wrong — body is treated as parameters
await epilot.entity.searchEntities({ q: '_schema:contact AND John' })

// Correct — null tells the client "no parameters"
await epilot.entity.searchEntities(null, { q: '_schema:contact AND John' })
```
:::

**When the operation has no params and no body** (e.g. a simple GET), call with no arguments:

```ts
await epilot.user.getMe()
```

### IntelliSense and types

Operation methods are fully typed. Your editor will autocomplete operation names, parameter keys, request bodies, and response shapes.

```ts
// Parameters and response are both typed — hover to see the shape
const { data } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })
//      ^? { entity: Entity; relations: Entity[] }
```

You can also import the generated types directly for use in your own code:

```ts
import type { Client, Entity, EntityItem } from '@epilot/sdk/entity'
```

:::tip Prefer operation methods over raw axios methods
Operation methods give you type safety and autocomplete. Raw axios calls don't.

```ts
// Good: typed params, typed response
const { data } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })

// Avoid: no type safety, easy to mistype paths
const { data } = await entityClient.get('/v2/entity/schemas/contact/123')
```
:::

## Tree-shakeable imports

Import only the APIs you use. Other APIs never touch your bundle.

```ts
import { getClient, authorize } from '@epilot/sdk/entity'

const entityClient = getClient()
authorize(entityClient, () => '<my-token>')

const { data } = await entityClient.getEntity({ slug: 'contact', id: '123' })
```

Each API subpath also exports a handle for calling operation methods directly:

```ts
import { entity } from '@epilot/sdk/entity'

const { data } = await entity.getEntity({ slug: 'contact', id: '123' })
```

## Multiple SDK instances

Create isolated SDK instances when you need to work with multiple orgs or tokens simultaneously.

```ts
import { createSDK } from '@epilot/sdk'

const sdk1 = createSDK()
sdk1.authorize(() => '<token-for-org-1>')
sdk1.headers({ 'x-epilot-org-id': 'org-1' })

const sdk2 = createSDK()
sdk2.authorize(() => '<token-for-org-2>')
sdk2.headers({ 'x-epilot-org-id': 'org-2' })
```

## Interceptors

Clients are standard axios instances, so you can use interceptors for logging, tracing, or request transformation.

**Per-client interceptor:**

```ts
entityClient.interceptors.response.use((response) => {
  console.debug(`${response.config.method?.toUpperCase()} ${response.config.url}`, {
    status: response.status,
    data: response.data,
  })
  return response
})
```

**Global interceptor** (applied to all clients):

```ts
epilot.interceptors.request((config) => {
  config.headers['x-correlation-id'] = generateTraceId()
  return config
})
```

## Client lifecycle

When you call `authorize()`, `headers()`, `retry()`, `largeResponse()`, or `interceptors`, the SDK invalidates all cached clients. The next operation creates a fresh client with the updated config.

| Pattern | Always up to date? | Notes |
| --- | --- | --- |
| `epilot.entity.getEntity(...)` | Yes | Re-resolves the client on every call |
| `epilot.entity.getClient()` | At time of call | Can go stale after config changes |
| `createClient()` | Independent | Not affected by SDK config changes |

## Cached client reference

Use `getClient()` when you need direct access to the underlying axios instance, for example to set custom headers or add interceptors.

```ts
const entityClient = epilot.entity.getClient()
const { data } = await entityClient.getEntity({ slug: 'contact', id: '123' })
```

`getClient()` is synchronous and returns a cached singleton. Calling it multiple times returns the same instance (until config changes).

:::warning Stale references
If you hold a client reference and then change config, your reference still points to the old client:

```ts
const entityClient = epilot.entity.getClient()

epilot.authorize(() => 'new-token') // invalidates cached clients

// entityClient still uses the old token!
// epilot.entity.getEntity(...) already uses the new one
```

Re-call `getClient()` after config changes, or use operation methods directly to avoid this entirely.
:::

## Fresh client instance

Use `createClient()` when you need a completely independent client that is not shared or cached. Useful for one-off requests with different credentials or headers.

```ts
import { createClient, authorize } from '@epilot/sdk/entity'

const entityClient = createClient()
authorize(entityClient, () => '<my-token>')
entityClient.defaults.headers.common['x-epilot-org-id'] = 'org-123'
```

## Migration from `@epilot/*-client`

Drop-in replacement — just change the import path:

```ts
// Before
import { getClient, createClient, authorize } from '@epilot/entity-client'
import type { Client, Entity } from '@epilot/entity-client'

// After
import { getClient, createClient, authorize } from '@epilot/sdk/entity'
import type { Client, Entity } from '@epilot/sdk/entity'
```
