---
title: Custom Portal Block
hide_title: true
sidebar_position: 4
description: "Build your own block that portal builders can place on pages of epilot customer and installer portals."
---

# Custom Portal Block

A Custom Portal Block is a block of your own that appears in the Portal Builder next to the built-in blocks. A portal builder places it on a portal page and, if you offer settings, configures each placement separately.

Use a Portal Block when you want to show your own interface inside a portal. To connect a portal to your backend without an interface, for example to check a registration or load consumption data, use a [Portal Extension](/docs/apps/components/portal-extension) instead.

## Creating a Portal Block

Add the component in the App Builder (**Portal Block**), or with the CLI:

```bash
epilot app add-component my-widget --type CUSTOM_PORTAL_BLOCK
```

In the [manifest](/docs/apps/app-manifest) it looks like this:

```json
{
  "id": "7b2a…",
  "component_type": "CUSTOM_PORTAL_BLOCK",
  "name": { "de": "Mein Widget", "en": "My Widget" },
  "configuration": {},
  "surfaces": {
    "portal_block": {
      "app_url": "./components/my-widget/dist/index.html",
      "supported_surfaces": ["main"]
    }
  },
  "assets": { "zip": "./components/my-widget/dist/" }
}
```

| Field | Required | Description |
| --- | --- | --- |
| `surfaces.portal_block.app_url` | ✓ | Entry file of your block's interface |
| `surfaces.portal_block.supported_surfaces` | — | Where in a portal the block may be placed, see below. Defaults to `["main"]` |
| `surfaces.portal_block.settings` | — | Settings a portal builder can set per placed block, see [Block settings](#block-settings) |
| `assets.zip` | ✓ | Directory that is uploaded on deploy |

### Where a block can be placed

| Value | Placement |
| --- | --- |
| `main` | In the main content of a portal page |
| `footer_inline` | In the footer, as part of the page flow |
| `footer_left_absolute` | Fixed to the bottom left of the page |
| `footer_right_absolute` | Fixed to the bottom right of the page |

## Block settings

Settings let a portal builder configure each placed instance of your block, for example a headline or which journey a button opens. The Portal Builder renders a form from the fields you declare, stores the values on the block, and the portal passes them to your block as `config.settings`.

```json
"settings": {
  "version": 1,
  "fields": [
    { "key": "headline", "type": "translated_text", "label": { "de": "Überschrift", "en": "Headline" } },
    { "key": "showPrices", "type": "boolean", "label": { "de": "Preise anzeigen", "en": "Show prices" }, "default": true },
    { "key": "journey", "type": "journey", "label": { "de": "Journey", "en": "Journey" }, "required": true }
  ]
}
```

A block can declare up to 30 fields. Each field needs a `key`, a `type` and a `label`.

| Field type | What the portal builder enters |
| --- | --- |
| `text` | A text. `maxLength` limits its length |
| `translated_text` | A text per language |
| `number` | A number. `min`, `max` and `step` constrain it |
| `boolean` | A toggle |
| `select` | One of the `options` you declare (`value` and `label` each) |
| `entity_schema` | An entity schema. `allowed` limits the choice |
| `page` | A page of the portal |
| `journey` | A journey |
| `color_token` | A color from the portal's design |

Further field properties are `description`, `required` and `default`.

:::caution
Setting values reach the end customer's browser. Never use them for secrets: keep credentials in [app options](/docs/apps/app-options) and use them server-side, for example through an [API Proxy](/docs/apps/components/api-proxy).
:::

Increase `version` when you change the fields. A stored value that no longer fits a field falls back to the field's default.
