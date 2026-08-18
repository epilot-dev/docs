---
title: App Manifest
hide_title: true
sidebar_position: 5
---

# The App Manifest

`manifest.json` is the **declarative source of truth** for your entire app. It lives in the root of your app repository, is updated by the [CLI](/docs/apps/cli), and every `epilot app deploy` syncs the platform to exactly what it declares — components and functions not in the manifest are removed from the deployed version.

```json title="manifest.json"
{
  "$schema": "https://cdn.app.sls.epilot.io/v1/schema.json",
  "manifest_version": 1,
  "app_id": "b1b9…",
  "name": "My Integration",
  "description": { "de": "Beschreibung (Pflicht)", "en": "Optional English description" },
  "category": "integration",
  "author": { "company": "ACME GmbH", "name": "Jane Doe", "email": "dev@acme.example" },
  "documentation_url": "https://docs.acme.example",
  "support_email": "support@acme.example",
  "pricing": { "pricing_type": "FREE" },
  "notifications": { "email": "dev@acme.example", "events": ["app.installed", "app.uninstalled"] },
  "permissions": [
    { "action": "entity:view", "resource": "opportunity" }
  ],
  "assets": { "logo": "./assets/logo.png" },
  "functions": [
    {
      "name": "sync-things",
      "type": "scheduled",
      "handler": "./functions/sync-things/dist/handler.js",
      "schedule": "rate(30 minutes)"
    }
  ],
  "components": [
    {
      "id": "4f3c…",
      "component_type": "CUSTOM_CAPABILITY",
      "name": { "de": "Mein Tab" },
      "configuration": { "type": "tab", "allowed_schemas": ["opportunity"] },
      "surfaces": { "capability_config": { "app_url": "./components/my-tab/dist/index.html" } },
      "assets": { "zip": "./components/my-tab/dist/" }
    }
  ]
}
```

The `$schema` reference gives you validation and autocompletion in editors like VS Code.

## Top-level fields

| Field | Required | Description |
|---|---|---|
| `manifest_version` | ✓ | Always `1` |
| `app_id` | — | Set automatically after the first `deploy` — never set it by hand |
| `name` | ✓ | App name shown everywhere |
| `description` | ✓ | `de` is required; `en` optional |
| `category` | — | Marketplace category, e.g. `integration` |
| `author` | — | `company` required when set |
| `pricing` | — | `FREE`, `SUBSCRIPTION`, `USAGE_BASED`, `ONE_TIME`, `CUSTOM` |
| `notifications` | — | Email + events (`app.installed`, `app.uninstalled`) you want to be notified about |
| `permissions` | — | The grants your app's server-side code needs — shown to the installing org for consent, see [Permissions](/docs/apps/configure-permissions) |
| `blueprint` | — | `manifest_id` of a blueprint to install alongside the app |
| `assets.logo` | — | Local path to the app logo, uploaded on deploy |
| `functions` | — | Server-side [functions](/docs/apps/functions/overview) (workflow actions and cron), see below |
| `components` | ✓ | The app's [components](/docs/apps/components/overview) (may be empty) |

## The `functions` block

| Field | Required | Description |
|---|---|---|
| `name` | ✓ | Unique kebab-case identifier (max 64 chars) — treat it as a public contract |
| `type` | ✓ | `workflow` (flow builder action) or `scheduled` (cron per installation) |
| `handler` | ✓ | Local path to the **built** JavaScript file — inlined as code on deploy |
| `label` | — | Display name (TranslatedString) shown to org admins, e.g. in the flow builder picker |
| `description` | — | TranslatedString |
| `schedule` | scheduled | 5-field cron or `rate(...)` — see [Scheduled Functions](/docs/apps/functions/scheduled-functions) |
| `schedule_timezone` | — | IANA timezone for cron evaluation (default `Europe/Berlin`) |
| `secrets` | — | Keys of secret options to decrypt into `input.app_options` — prefer the [API Proxy](/docs/apps/components/api-proxy) instead |
| `wait_for_callback` | — | Workflow only — pause the flow until your system calls back |
| `assets.zip` | — | Workflow only — built config UI shown in the flow builder |

Limits: at most 10 functions per app, at most 5 of them scheduled, 300 KB code per function.

## Local-only fields

Some fields exist only for the CLI and are never sent to the platform:

- `_dir` on components — maps a component to its directory under `components/`
- `handler` and `assets` paths — resolved and uploaded/inlined at deploy time
- Secret **option values** are never in the manifest; installing orgs enter them per installation

## Golden rules

1. **The manifest wins.** Deploy is a sync, not a merge — what's not declared gets removed from the version.
2. **Don't hand-edit `app_id`** or component `id`s of deployed components; they are identity.
3. **`description.de` is always required** — the platform's primary market is German-speaking.
4. Validate before deploying: `npx @epilot/cli app validate` runs the same checks as the platform.
