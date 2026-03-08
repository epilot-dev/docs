---
sidebar_position: 4
title: Types
---

# Types

Every API client exports TypeScript types generated directly from its OpenAPI spec. No manual type definitions to maintain. Types are always in sync with the API.

## Schema types

Import domain types from any API subpath:

```ts
import type { Entity, EntitySchema, RelationAttribute } from '@epilot/sdk/entity'
import type { FileItem } from '@epilot/sdk/file'
import type { AutomationFlow } from '@epilot/sdk/automation'
```

These are the request/response shapes you'll use most often: entity bodies, file metadata, workflow definitions, etc.

## Client types

Use `Client` to type a client reference, and `OperationMethods` or `PathsDictionary` for more granular typing:

```ts
import type { Client } from '@epilot/sdk/entity'

async function fetchContact(entityClient: Client, id: string) {
  const { data } = await entityClient.getEntity({ slug: 'contact', id })
  return data
}
```

## Operation parameter and response types

Each operation method is fully typed. Hover over any call to see the expected params and return type in your editor. If you need to extract these types for reuse:

```ts
import type { OperationMethods } from '@epilot/sdk/entity'

// Extract the params type for createEntity
type CreateEntityParams = Parameters<OperationMethods['createEntity']>

// Extract the response type
type CreateEntityResponse = Awaited<ReturnType<OperationMethods['createEntity']>>
```
