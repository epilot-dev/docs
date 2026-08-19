---
title: Workflow Functions
hide_title: true
sidebar_position: 3
---

# Workflow Functions

A function with `type: "workflow"` provides the **code behind a flow action**. The pairing works like this: a `CUSTOM_FLOW_ACTION` component is the org-facing contract — its name appears in the flow builder's action picker, it carries the [installation options](/docs/apps/components/configure-options) and the optional per-flow config UI — and its configuration **references the function that runs**:

```json title="manifest.json"
{
  "functions": [
    {
      "name": "check-connection-request",
      "type": "workflow",
      "handler": "./functions/check-connection-request/dist/handler.js"
    }
  ],
  "components": [
    {
      "id": "d493351b-…",
      "component_type": "CUSTOM_FLOW_ACTION",
      "name": { "de": "Netzanschlussprüfung", "en": "Grid Connection Check" },
      "description": { "de": "Prüft die Anschlussanfrage im externen System." },
      "options": [
        { "key": "region", "label": "Region", "type": "text", "required": true }
      ],
      "configuration": { "type": "function", "function_name": "check-connection-request" }
    }
  ]
}
```

Why the split? The component reuses everything components already have — display name and description in the picker, installation options (including secrets), the config surface — while the function stays a pure unit of code. Deploy-time validation checks the reference: the named function must exist in the same version with `type: "workflow"`.

When the org admin adds the action to a flow and the flow reaches that step, epilot runs your handler with the triggering entity.

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

## Installation options

Options declared on the **component** are filled in by the org admin at install time and reach your handler as `input.app_options` (secret options stay encrypted; declare the ones your function needs in the function's `secrets` list — or better, use an [API Proxy](/docs/apps/components/api-proxy)).

## Per-flow configuration UI (optional)

If your action needs configuration when it's added to a flow (mappings, mode switches), ship a config UI on the **component**, exactly as flow actions always have — `surfaces.flow_action_config` plus `assets.zip`. Values saved by your config UI arrive in the handler as `input.action_config.custom_action_config`.

## Waiting for a callback

Set `wait_for_callback: true` in the **component's** configuration when the action starts something asynchronous (e.g. a human approval in your system) and the flow should pause until you confirm. The flow execution pauses at your action and resumes when your system calls the automation resume endpoint with the execution's resume token.

## Failure behavior

- `{ error_reason: "..." }` fails the flow step; the message is shown to the flow's operator and recorded in your app's Insights.
- `{ skip_reason: "..." }` marks the step skipped — use it for "nothing to do here" instead of failing.
