---
title: Deploying & Updating
hide_title: true
sidebar_position: 5
---

# Deploying & Updating Functions

## Adding a function

```bash
# workflow function (flow builder action)
npx @epilot/cli app add-function reserve-slot --type workflow --label "Reserve slot"

# scheduled function (--schedule implies --type scheduled)
npx @epilot/cli app add-function sync-things --schedule "rate(30 minutes)"
```

This scaffolds `functions/<name>/` as its own workspace package (TypeScript, `tsc` build to `dist/handler.js`) and registers the function in `manifest.json`. The `handler` path in the manifest points at the **built** file:

```json
{ "name": "sync-things", "type": "scheduled", "handler": "./functions/sync-things/dist/handler.js", "schedule": "rate(30 minutes)" }
```

## Deploying

```bash
npm run build                 # compile all functions
npx @epilot/cli app validate  # same checks the platform runs (schedule rules, code contract)
npx @epilot/cli app deploy
```

`deploy` reads each function's built handler, inlines the code into your app version, and uploads any config-UI assets. The manifest is the single source of truth: the deployed set of functions **always exactly matches** the manifest — removing a function from the manifest removes it (and its schedules) from the version.

## How updates reach installations

Functions are **versioned with your app**. An installation runs the function code of its *installed version* — deploying new code does not silently change what runs in customer organizations:

1. **Unpublished version** (still in development): `deploy` updates the version in place. Installations move to the new code when they update to the version.
2. **Published (public) versions are immutable**: `deploy` automatically creates a new version. Installing orgs receive it through the regular update flow ("Update to latest" / automatic updates), which also reconciles schedules — new scheduled functions start, removed ones stop, changed cron expressions take effect.
3. **Your own dev org**: with [development mode](/docs/apps/development-mode), your test installation follows the development version so you can iterate without version-bumping.

There is no separate "function update" mechanism to think about: ship a version, installations that move to it run its functions. Run bookkeeping (last run, failure counts) survives version updates as long as the function keeps its name.

## Renaming and removing

- **Renaming** a function is a remove-plus-add: the old schedule (and its run history context) is dropped, a fresh one is created. Flows that referenced a renamed **workflow** function by its old name will fail their action step until the org admin re-selects the action — treat workflow function names as a public contract and prefer changing the `label`, not the `name`.
- **Removing** a scheduled function stops its schedules in every installation on their next version update; removing a workflow function breaks flows that use it (the flow builder shows the action as unavailable). Both are legitimate — just changelog them.

## Publishing review

Functions are part of the app review when you [publish](/docs/apps/publishing/verification-process): reviewers see the code, the declared schedules and permissions. Dense schedules, unbounded loops or undeclared data access are the typical rejection reasons — the [limits](/docs/apps/functions/writing-functions#limitations) exist so a published app can never degrade the platform for anyone else.
