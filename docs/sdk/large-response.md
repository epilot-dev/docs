---
sidebar_position: 5
title: Built-in Middleware
---

# Built-in Middleware

The SDK includes middleware that handles common production concerns automatically. Both features are enabled by default. No configuration needed for most use cases.

## Large response handling

Some epilot API responses can exceed standard payload size limits. When this happens, the API returns a presigned URL pointing to the full payload instead of the payload itself.

The SDK handles this transparently. It detects the redirect, fetches the full payload, and returns it as if it were a normal response.

```ts
import { epilot } from '@epilot/sdk'

// Disable if you want to handle large responses yourself
epilot.largeResponse({ enabled: false })
```

For tree-shakeable imports, apply the interceptor manually:

```ts
import { getClient, authorize } from '@epilot/sdk/entity'
import { applyLargeResponseInterceptor } from '@epilot/sdk'

const entityClient = getClient()
authorize(entityClient, () => '<my-token>')
applyLargeResponseInterceptor({ client: entityClient, config: { enabled: true } })
```

## Auto-retry on 429

The SDK automatically retries requests that receive a `429 Too Many Requests` response, respecting the `Retry-After` header to determine wait time.

Enabled by default with up to 3 retries.

```ts
import { epilot } from '@epilot/sdk'

// Customize retry behavior
epilot.retry({ maxRetries: 5, defaultDelayMs: 2000 })

// Disable retries entirely
epilot.retry({ maxRetries: 0 })
```

| Option | Default | Description |
| --- | --- | --- |
| `maxRetries` | `3` | Maximum retry attempts. Set to `0` to disable. |
| `defaultDelayMs` | `1000` | Fallback delay (ms) when `Retry-After` header is missing. |

For tree-shakeable imports, apply the interceptor manually:

```ts
import { getClient, authorize } from '@epilot/sdk/entity'
import { applyRetryInterceptor } from '@epilot/sdk'

const entityClient = getClient()
authorize(entityClient, () => '<my-token>')
applyRetryInterceptor({ client: entityClient, config: { maxRetries: 3 } })
```
