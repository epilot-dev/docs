---
sidebar_position: 6
title: Overrides & Custom APIs
---

# Overrides & Custom APIs

Override built-in API specs or register entirely new APIs via `.epilot/sdk-overrides.json`. Get updated types and operations immediately, without waiting for an SDK release.

## When to use overrides

- You want to pin a specific version of an API spec to avoid unexpected changes from SDK updates
- You need to use an API spec that differs from what's bundled in the current SDK version
- You want to develop against an API that isn't part of the official SDK package yet
- You want to test against a custom or modified API spec

## Setup

Create `.epilot/sdk-overrides.json` in your project root:

```json
{
  "entity": "./specs/entity-openapi.json",
  "pricing": "./specs/pricing-openapi.json"
}
```

Keys are API names (matching `@epilot/sdk/<api-name>` imports). Values are paths to local OpenAPI spec files.

## Override commands

```bash
# Apply all overrides from .epilot/sdk-overrides.json
npx epilot-sdk override

# Override a single API
npx epilot-sdk override entity ./my-local-entity-spec.yaml

# Regenerate types after spec changes
npx epilot-sdk typegen
```

After running these commands, your project has updated types and operation methods matching the overridden spec. No changes to `@epilot/sdk` on npm required.

## Usage

Your code stays the same. The SDK picks up the overridden spec at runtime:

```ts
import { epilot } from '@epilot/sdk'

// Uses your local entity spec instead of the bundled one
const { data } = await epilot.entity.getEntity({ slug: 'contact', id: '123' })
```

