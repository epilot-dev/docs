---
title: Overview
hide_title: true
sidebar_position: 1
---

# App Functions

Functions are **server-side JavaScript that runs inside epilot** — no infrastructure of your own, no exposed endpoints, no credentials in the browser. You write a handler, declare it in your app's manifest, deploy with the CLI, and epilot executes it in a secured sandbox on your behalf.

Functions are the unit for all custom server-side logic in an app. Where they run is decided by their **type**:

| Type | Triggered by | Typical use |
|---|---|---|
| `workflow` | An org admin adds your function as an **action in the flow builder**; it runs whenever the flow reaches that step, with the triggering entity as input | Enrich an entity, call your API through the [API Proxy](/docs/apps/components/api-proxy), validate data, reserve something in an external system |
| `scheduled` | A **cron schedule**, automatically, once per installation | Poll a system that has no webhooks, sync a catalog nightly, refresh cached data |

```json title="manifest.json"
{
  "functions": [
    {
      "name": "reserve-slot",
      "type": "workflow",
      "label": { "de": "Slot reservieren", "en": "Reserve slot" },
      "handler": "./functions/reserve-slot/dist/handler.js"
    },
    {
      "name": "sync-open-requests",
      "type": "scheduled",
      "handler": "./functions/sync-open-requests/dist/handler.js",
      "schedule": "rate(30 minutes)"
    }
  ]
}
```

## Functions vs. components

Components are the **surfaces** of your app — journey blocks, custom pages, portal blocks, API proxies. Functions are its **behavior**. They complement each other:

- A `workflow` function appears **automatically** in the flow builder of every organization that installs your app — you do not create a component for it. (Flow action components still exist, but only for [external integrations](/docs/apps/components/custom-action): webhook calls to *your* servers.)
- A `scheduled` function runs without any user interaction at all.
- Functions can call external APIs through your app's **API Proxy** component, so external credentials stay on the installation and never appear in function code.

## Code-first by design

There is no code editor in the epilot UI. Functions live in your app repository, are validated at deploy time, versioned with your app, and reviewed when you publish. This is deliberate: scheduled and flow-triggered code must be reproducible per version and per installation — a UI-edited snippet can be neither.

```bash
npx @epilot/cli app add-function reserve-slot --type workflow --label "Reserve slot"
npm run build
npx @epilot/cli app deploy
```

## What installing organizations see

- **Workflow functions** show up in the flow builder's action picker under your app's name, using the function's `label`.
- The installed app's details page has a read-only **Functions** tab listing every function with its label, type and — for scheduled functions — the cron expression: full transparency about what the app runs on the org's behalf.
- Every run is recorded in the app's **Insights**, so you (the developer) can monitor failures per version and component.

Continue with [Writing functions](/docs/apps/functions/writing-functions) for the runtime contract.
