---
title: Writing Functions
hide_title: true
sidebar_position: 2
---

# Writing Functions

Every function is a single JavaScript file that declares a top-level handler:

```ts title="functions/my-function/src/handler.ts"
async function handler(input, context) {
  // your logic
  return { success: true };
}
```

That's the whole contract — **no `export`**, no framework, no wrapper. The file you deploy is the built output (`dist/handler.js`); the CLI inlines it into your app version on `epilot app deploy`. Scaffolding via `epilot app add-function` gives you a TypeScript setup that compiles to exactly this shape.

## The `input` object

What your handler receives depends on the trigger:

```ts
{
  // Always present
  trigger: {
    type: "workflow" | "schedule",
    // scheduled runs additionally carry:
    schedule?: "rate(30 minutes)",
    scheduled_time?: "2026-08-18T03:00:00Z"
  },
  app_options: {
    token: "<epilot app token>",   // see "Calling epilot APIs" below
    stage: "prod",                 // deployment stage, for deriving API base URLs
    ...optionValues                // ALL app option values of the installation,
                                   // including sensitive and secret ones —
                                   // functions always run server-side
  },

  // Workflow runs
  entity: { _id, _schema, ... },   // the entity the flow ran on
  action_config: { app_id, ... },  // the action's configuration from the flow builder,
                                   // including values from your custom config UI

  // Scheduled runs
  org_id: "739224",                // the installation this run belongs to
  app_id: "your-app-id"
}
```

## The `context` object

```ts
context.epilot  // the full @epilot/sdk, pre-authorized with your app token
context.fetch   // standard fetch() for everything else
```

The **epilot SDK is bundled into the sandbox** — you don't import or install anything, and `epilot.authorize()` is already called with `input.app_options.token`. Every epilot API is available as `context.epilot.<api>.<operationId>(...)`, fully typed against the platform's OpenAPI specs.

`console.log()` output is captured per run; for scheduled functions the last ~20 lines are attached to the run's event in your app's **Insights**, so a summary log at the end of your handler doubles as run diagnostics.

## Return values

| Return | Effect |
|---|---|
| any object, e.g. `{ success: true }` | Run succeeded |
| `{ skip_reason: "..." }` | Run intentionally skipped — a workflow action is marked skipped, a scheduled run counts as skipped |
| `{ error_reason: "..." }` | Run failed — a workflow action fails the flow step, a scheduled run is recorded as an error |
| throwing an exception | Same as `error_reason`, with a generic message shown to the user |

## Calling epilot APIs

Use the bundled SDK — no auth wiring, no base URLs, typed operations:

```ts
async function handler(input, context) {
  const { epilot } = context;

  // Search entities
  const { data } = await epilot.entity.searchEntities(null, {
    q: "_schema:opportunity AND _exists_:my_field",
    size: 25,
  });

  // Update an entity
  for (const entity of data.results ?? []) {
    await epilot.entity.patchEntity(
      { slug: "opportunity", id: entity._id },
      { my_field: "synced" }
    );
  }

  return { success: true, updated: data.results?.length ?? 0 };
}
```

Everything the SDK offers is there: `epilot.entity`, `epilot.pricing`, `epilot.workflow`, `epilot.message`, … — see the [SDK reference](https://github.com/epilot-dev/sdk-js) for the full list of APIs and operations.

**What the SDK runs as:** the SDK is pre-authorized with `input.app_options.token` — an **app token**, short-lived, minted per run, scoped to the installing organization and to exactly the [permissions](/docs/apps/configure-permissions) your manifest declares. If your manifest declares `entity:view` on `opportunity`, that is all your function can do — in that organization's data, never anyone else's.

:::note Non-production stages
The bundled SDK targets epilot's production APIs. When testing an app against a non-production epilot environment, call the APIs with `context.fetch` instead, deriving the base URL from `input.app_options.stage` (e.g. `https://entity.${stage}.sls.epilot.io`) and sending `Authorization: Bearer ${input.app_options.token}` yourself. In customer organizations (production) the SDK is always the right tool.
:::

## Calling external APIs

Route external calls through your app's [API Proxy](/docs/apps/components/api-proxy) component. Credentials (API keys, OAuth secrets) are configured per installation as secret [app options](/docs/apps/app-options) and injected server-side by the proxy — your function never sees them.

The nicest way is the proxy wrapper from **`@epilot/app-sdk`** — the same one your frontend components use. Since function code ships as a single file, bundle your handler (e.g. with esbuild) so the import is inlined:

```ts
import { createProxyClient } from "@epilot/app-sdk";

async function handler(input, context) {
  const client = createProxyClient({
    appId: input.app_id,
    token: input.app_options.token,
  });

  const order = await client.proxy("my-api", "/orders/4711");
  const created = await client.proxy("my-api", "/reservations", {
    method: "POST",
    body: { slot: "2026-09-01T10:00" },
  });
  // ...
}
```

If your build is plain `tsc` (no bundler), call the proxy URL directly with `context.fetch` — same request, just hand-rolled:

```ts
const { token, stage } = input.app_options;
const base = `https://app${stage !== "prod" ? `.${stage}` : ""}.sls.epilot.io`;
const res = await context.fetch(
  `${base}/v1/public/app/${input.app_id}/proxy/my-api/orders/4711`,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

Both forms hit `POST/GET …/v1/public/app/{appId}/proxy/{proxyName}/{path}` with the app token as Bearer — the proxy injects the real credentials server-side. (The wrapper also takes `baseUrl` if you target a non-production stage.)

If a function genuinely needs a raw secret (rare — prefer the proxy), just read it from `input.app_options` — functions receive **all** [app option](/docs/apps/app-options) values, including sensitive and secret ones, since they always run server-side. (The per-function `secrets` allowlist that older manifests declared is deprecated and ignored.)

## Limitations

| Limit | Value |
|---|---|
| Code size | 300 KB hard limit per function (warning above 100 KB) — ship a single bundled file, no `node_modules` at runtime |
| Execution time | Workflow runs: seconds (they block a flow step). Scheduled runs: **60 seconds hard** |
| Memory | 10 MB sandbox default |
| Language | JavaScript/TypeScript syntax, script context — no `import`/`export`, no `require`. The epilot SDK is built in as `context.epilot`; other libraries must be bundled into your handler file |
| Forbidden | `eval()`, the `Function()` constructor — rejected at deploy time |
| Environment | No filesystem, no environment variables, no Node.js APIs — network via `context.epilot` and `context.fetch` only |
| Isolation | One run = one installation. The token, options and data access are always scoped to a single organization |

Deploy-time validation enforces the contract: syntax is parsed, a `handler` declaration is required, size and security rules are checked — `epilot app validate` runs the same checks locally before you deploy.
