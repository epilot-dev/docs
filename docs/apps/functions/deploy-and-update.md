---
title: Deploying & Updating
hide_title: true
sidebar_position: 5
description: "Add, deploy and update App functions with the epilot CLI: scaffold workflow or scheduled functions, deploy them and learn how updates reach installations."
---

# Deploying & Updating Functions

## Adding a function

```bash
# workflow function (code behind a flow action component)
npx @epilot/cli app add-function reserve-slot --type workflow
npx @epilot/cli app add-component reserve-slot-action --type CUSTOM_FLOW_ACTION_FUNCTION

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
npx @epilot/cli app validate  # checks the manifest and schedule rules locally
npx @epilot/cli app deploy
```

`deploy` reads each function's built handler, inlines the code into your app version, and uploads any config-UI assets. The manifest is the single source of truth: the deployed set of functions matches the manifest's `functions` list — removing a function from the list removes it (and its schedules) from the version. If you remove the `functions` key altogether, nothing is sent and the previously deployed functions stay; use an empty list to remove them all.

## How updates reach installations

Functions are **versioned with your app**. An installation runs the function code of its *installed version* — deploying new code does not silently change what runs in customer organizations:

1. **Unpublished version** (still in development): `deploy` updates the version in place. Installations move to the new code when they update to the version.
2. **Published (public) versions are immutable**: `deploy` automatically creates a new version. Installing orgs receive it through the regular update flow ("Update to latest" / automatic updates), which also reconciles schedules — new scheduled functions start, removed ones stop, changed cron expressions take effect.
3. **Your own dev org**: `epilot app deploy` re-syncs your own organization's installation, so it runs the functions you just deployed. [Development mode](/docs/apps/development-mode) applies to components and options only, not to functions.

There is no separate "function update" mechanism to think about: ship a version, installations that move to it run its functions. Run bookkeeping (last run, failure counts) survives version updates as long as the function keeps its name.

## Renaming and removing

- **Renaming** a scheduled function is a remove-plus-add: the old schedule (and its run bookkeeping) is dropped, a fresh one is created. Renaming a **workflow** function requires updating the referencing component's `function_name` in the same deploy — the reference is validated when the component is saved. Removing a function does not check for components that still reference it, so update those in the same deploy.
- **Removing** a scheduled function stops its schedules in every installation on their next version update; removing a workflow function requires removing (or repointing) its referencing component too. Flows that used the removed action show it as unavailable — legitimate, just changelog it.

## Publishing review

Functions are part of the app review when you [publish](/docs/apps/publishing/verification-process): reviewers see the code, the declared schedules and permissions. Dense schedules, unbounded loops or undeclared data access are the typical rejection reasons — the [limits](/docs/apps/functions/writing-functions#limitations) exist so a published app can never degrade the platform for anyone else.
