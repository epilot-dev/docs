---
title: Workflow Functions
hide_title: true
sidebar_position: 3
---

# Workflow Functions

A function with `type: "workflow"` becomes a **selectable action in the flow builder** of every organization that installs your app. The org admin drags it into their flow like any built-in action; whenever the flow reaches that step, epilot runs your handler with the triggering entity.

```json title="manifest.json"
{
  "functions": [
    {
      "name": "check-connection-request",
      "type": "workflow",
      "label": { "de": "Netzanschlussprüfung", "en": "Grid Connection Check" },
      "description": { "de": "Prüft die Anschlussanfrage im externen System." },
      "handler": "./functions/check-connection-request/dist/handler.js"
    }
  ]
}
```

- **`label`** is what the org admin sees in the action picker — always provide one.
- No component is needed. The function appears in the picker automatically once the app is installed.

## The run

```ts
async function handler(input, context) {
  const entity = input.entity;          // the entity the flow ran on
  const config = input.action_config;   // per-flow configuration (see below)
  const { token, stage } = input.app_options;

  if (!entity?.my_required_field) {
    return { skip_reason: "Nothing to check for this entity." };
  }

  // ... call your API via the proxy, write results back via the Entity API ...

  return { success: true };
}
```

Workflow runs block a flow step, so keep them fast — do one thing per action. Long-running work belongs in a [scheduled function](/docs/apps/functions/scheduled-functions) or behind `wait_for_callback`.

## Per-flow configuration UI (optional)

If your action needs configuration when it's added to a flow (mappings, mode switches), ship a config UI. Point the function's `assets.zip` at a built web app; the CLI uploads it and the flow builder embeds it when the admin configures the action:

```json
{
  "name": "check-connection-request",
  "type": "workflow",
  "handler": "./functions/check-connection-request/dist/handler.js",
  "assets": { "zip": "./functions/check-connection-request-config/dist/" }
}
```

Values saved by your config UI arrive in the handler as `input.action_config.custom_action_config`.

## Waiting for a callback

Set `wait_for_callback: true` when the action starts something asynchronous (e.g. a human approval in your system) and the flow should pause until you confirm. The flow execution pauses at your action and resumes when your system calls the automation resume endpoint with the execution's resume token.

## Failure behavior

- `{ error_reason: "..." }` fails the flow step; the message is shown to the flow's operator and recorded in your app's Insights.
- `{ skip_reason: "..." }` marks the step skipped — use it for "nothing to do here" instead of failing.
