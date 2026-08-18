---
title: App CLI
hide_title: true
sidebar_position: 6
---

# The App CLI

The epilot CLI is the primary way to build, validate and deploy apps. Everything it does is driven by your [`manifest.json`](/docs/apps/app-manifest) — commands scaffold code, keep the manifest in sync, and push the result to the platform.

```bash
# no install needed
npx @epilot/cli app <command>

# or globally
npm install -g @epilot/cli
```

## Authentication

```bash
epilot auth login              # browser-based login
epilot auth login --token …    # or paste a token
```

Every `app` command also accepts `--token` / the `EPILOT_TOKEN` env var, and `--profile` for switching between accounts. Use `--server https://app.dev.sls.epilot.io` to target a non-production environment.

## Commands

### `epilot app init <name>`

Scaffolds a new app project: a monorepo with `manifest.json`, `components/`, Turborepo config and a `SKILL.md` that teaches AI coding agents how to work with the project.

### `epilot app add-component <name> --type <TYPE>`

Adds a component package under `components/<name>/` from a template and registers it in the manifest. Types: `CUSTOM_CAPABILITY`, `CUSTOM_PAGE`, `CUSTOM_JOURNEY_BLOCK`, `CUSTOM_PORTAL_BLOCK`, `CUSTOM_FLOW_ACTION_EXTERNAL`, `PORTAL_EXTENSION`, `EXTERNAL_PRODUCT_CATALOG`, `API_PROXY`.

### `epilot app add-function <name> [--type workflow|scheduled] [--schedule "<expr>"] [--label "<text>"]`

Adds a server-side [function](/docs/apps/functions/overview) under `functions/<name>/` and registers it in the manifest. `--schedule` implies `--type scheduled`; workflow functions should get a `--label` (that's what org admins see in the flow builder).

```bash
epilot app add-function reserve-slot --type workflow --label "Reserve slot"
epilot app add-function nightly-sync --schedule "0 3 * * *"
```

### `epilot app remove-component <name>`

Removes a component from the manifest (and optionally its directory).

### `epilot app validate`

Validates `manifest.json` locally with the same rules the platform enforces on deploy — schema shape, function types, schedule expressions (minimum interval, format), counts. Run it in CI.

### `epilot app deploy [--dry-run] [--new-version]`

The sync command. It:

1. creates the app on first deploy (writes `app_id` back into the manifest),
2. updates metadata, permissions and blueprint references,
3. inlines each function's built `handler` as code and uploads function config UIs,
4. uploads component bundles/zips and upserts all components,
5. deletes remote components/functions that are no longer in the manifest,
6. creates a new version automatically when the latest one is published (published versions are immutable),
7. re-syncs your own org's installation if the app is installed there.

`--dry-run` prints what would change without touching anything.

### `epilot app dev`

Local development loop — serve components locally and preview them in epilot via [development mode](/docs/apps/development-mode) without deploying.

### `epilot app export`

Reconstructs a local `manifest.json` from a deployed app — useful for migrating an app that was originally created in the UI to the CLI workflow.

### `epilot app versions` / `epilot app review`

List an app's versions, and submit a version for [marketplace review](/docs/apps/publishing/verification-process).

### `epilot app api <operation>`

Escape hatch: call any App API operation directly (`epilot app api getInstallation`, …) with your CLI credentials.

## Recommended workflow

```bash
epilot app init my-app && cd my-app
epilot app add-component my-tab --type CUSTOM_CAPABILITY
epilot app add-function nightly-sync --schedule "0 3 * * *"
npm install && npm run build
epilot app validate
epilot app deploy
```

Commit the whole project — manifest and code together are the reproducible definition of your app. The UI's app builder remains available for exploring, but repository + CLI is the recommended path for anything you intend to maintain.
