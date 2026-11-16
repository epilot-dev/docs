---
title: Custom Portal Blocks
hide_title: true
sidebar_position: 5
description: "Build your own block for epilot customer portals: a small web app that admins place on portal pages and configure per placed block in the Portal Builder."
---

<h1 align="center">Custom Portal Blocks</h1>

<p align="center">Add your own blocks to epilot customer portals</p>

A custom portal block is a small web app that an epilot customer portal embeds on a page. Admins add it in the Portal Builder like any other block, and fill in its settings separately for each place they put it. The block reads the logged-in customer's data through the portal, in the portal's language and theme.

Use a custom portal block when you want to show something on a portal page. To link out to a third-party system or hook into portal logic (registration checks, data retrieval), use a [Portal Extension](/docs/apps/components/portal-extension) instead.

```
Use cases: Customer dashboards, contract and request overviews, energy and device views, guided self-service steps
```

## Quick start

```sh
npm create @epilot/spark-block meine-vertraege -- --title "Meine Verträge"
cd meine-vertraege
npm install
npm run dev
```

`npm run dev` opens a playground on http://localhost:4400. It embeds your block the way a portal does and shows the settings form admins will see.

When the block is ready, deploy it to your organization:

```sh
EPILOT_TOKEN=<access token for the target org> npm run deploy -- --env prod
```

The deploy creates the app, uploads your build, registers the `CUSTOM_PORTAL_BLOCK` component and installs the app in the token's organization. In the Portal Builder, add a block and pick yours under **Custom Blocks**.

The full walkthrough, from an empty folder to a block in a live portal, is the [Create a block guide](https://spark-ui.epilot.io/docs/sdk/create-a-block).

## Settings per placed block

A block declares its settings in `spark-block.json`. The Portal Builder turns them into a form, and the block reads the values with `getSettings()` and reacts to edits with `onSettingsChange()` from [`@epilot/spark-sdk`](https://www.npmjs.com/package/@epilot/spark-sdk).

```json
{
  "key": "limit",
  "type": "number",
  "label": { "de": "Anzahl", "en": "Number of contracts" },
  "min": 1,
  "max": 20,
  "default": 5
}
```

Field types: `text`, `translated_text`, `number`, `boolean`, `select`, `entity_schema`, `page`, `journey`, `color_token`.

Settings reach the customer's browser, so they are never secret. Keep API keys in the app's [options](/docs/apps/app-options) or an integration, and call external systems through the portal with `executeUseCase`.

## Updates

Raise the version in `package.json` and deploy again. Blocks already placed in a portal load the new version on their next page load: new settings start at their default, and the values admins saved stay.

## Learn more

- [Create a block](https://spark-ui.epilot.io/docs/sdk/create-a-block): the step-by-step guide
- [Spark SDK](https://spark-ui.epilot.io/docs/sdk): session, entities, use cases, theming and localization
- [Spark UI](https://spark-ui.epilot.io/docs/ui/components): the components portal blocks are built with, in the portal's theme
