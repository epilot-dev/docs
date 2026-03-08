---
sidebar_position: 3
title: Client Usage
---

# Client Usage

The SDK gives you three ways to call epilot APIs, from simplest to most flexible.

## Operation methods (recommended)

The fastest way to get started. Call operation methods directly on the `epilot` singleton. The SDK handles client creation, caching, and auth for you.

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<my-token>')

const { data: entity } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })
const { data: user } = await epilot.user.getMe()
```

Operation methods always use the latest config. If you call `epilot.authorize()` with a new token, every subsequent call picks it up automatically.

:::tip Prefer operation methods over raw axios methods
Always use the generated operation methods. They give you full type safety and auto-complete.

```ts
// Good: typed params, typed response
const { data } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })

// Avoid: no type safety, easy to mistype paths
const { data } = await entityClient.get('/v2/entity/schemas/contact/123')
```
:::

## Cached client reference

Use `getClient()` when you need direct access to the underlying axios instance, for example to set custom headers or add interceptors.

```ts
const entityClient = await epilot.entity.getClient()
const { data } = await entityClient.getEntity({ slug: 'contact', id: '123' })
```

`getClient()` returns a cached singleton. Calling it multiple times returns the same instance (until config changes).

:::warning Stale references
If you hold a client reference and then change config, your reference still points to the old client:

```ts
const entityClient = await epilot.entity.getClient()

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

const entityClient = await createClient()
authorize(entityClient, () => '<my-token>')
entityClient.defaults.headers.common['x-epilot-org-id'] = 'org-123'
```

## Tree-shakeable imports

Import only the APIs you use. Other APIs never touch your bundle.

```ts
import { getClient, authorize } from '@epilot/sdk/entity'

const entityClient = await getClient()
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
| `await epilot.entity.getClient()` | At time of call | Can go stale after config changes |
| `await createClient()` | Independent | Not affected by SDK config changes |
