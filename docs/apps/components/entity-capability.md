---
title: Entity Capability
hide_title: true
sidebar_position: 3
description: "Embed your own interface on entity pages in epilot 360, as a tab, a group or a widget."
---

# Entity Capability

An Entity Capability embeds your own interface on entity pages in epilot 360, for example to show data from an external system next to a contact, a contract or an order.

Your interface is a small web app. It runs in an iframe and uses the [App Bridge](/docs/apps/app-surfaces) to get a token, the user's language and the entity being viewed.

## Where it appears

The `type` of the capability decides where it is shown on the entity page:

| Type | Where it appears |
| --- | --- |
| `tab` | As a tab of its own next to the entity's built-in tabs. Gives you the most space |
| `group` | As a collapsible section inside the entity's detail view |
| `widget` | As a card in the entity's widget area |

## Creating an Entity Capability

Add the component in the App Builder, or with the CLI:

```bash
epilot app add-component my-tab --type CUSTOM_CAPABILITY --capability-type tab
```

In the [manifest](/docs/apps/app-manifest) it looks like this:

```json
{
  "id": "4f3c…",
  "component_type": "CUSTOM_CAPABILITY",
  "name": { "de": "Mein Tab", "en": "My Tab" },
  "configuration": { "type": "tab", "allowed_schemas": ["contact", "opportunity"] },
  "surfaces": { "capability_config": { "app_url": "./components/my-tab/dist/index.html" } },
  "assets": { "zip": "./components/my-tab/dist/" }
}
```

| Field | Required | Description |
| --- | --- | --- |
| `configuration.type` | — | `tab`, `group` or `widget`. The CLI defaults to `tab` |
| `configuration.allowed_schemas` | — | The entity schemas the capability is offered on, e.g. `contact`. Leave it empty to offer it on all schemas |
| `surfaces.capability_config.app_url` | ✓ | Entry file of your interface |
| `assets.zip` | ✓ | Directory that is uploaded on deploy |

## Implementing the interface

Initialize the App Bridge and read the entity context:

```typescript
import { initialize, getEntityContext, updateContentHeight } from '@epilot/app-bridge';

const { token, lang } = await initialize();
const { entityId, schema, entity } = await getEntityContext();

// render your interface, then tell epilot how tall it is
updateContentHeight(document.body.scrollHeight);
```

The context contains the full `entity`, so you usually don't need to fetch it yourself.

See [App Surfaces](/docs/apps/app-surfaces#entity-surface-implementation) for the details: keeping the height in sync, reacting to a tab becoming visible, reading [app options](/docs/apps/app-options) and authorizing API clients.
