---
sidebar_position: 4
---

# Web Components

Web Components allow you to embed epilot Journeys directly into your website as native custom HTML elements. Unlike iframes, Web Components run within the page itself using the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), which keeps styles and scripts encapsulated while offering faster performance, better accessibility, and tighter integration with your host application.

:::tip Why Web Components over iframes?

- **Performance** — no iframe overhead; the Journey renders directly in your page.
- **Integration** — communicate with the Journey through standard HTML attributes instead of cross-frame messaging.
- **Accessibility** — screen readers and keyboard navigation work seamlessly.
- **Style encapsulation** — Shadow DOM prevents style collisions in both directions, with optional inheritance.

:::

## Quick Start

### 1. Add the embed script

Place the following script tag in your page, preferably within the `<head>` section:

```html title="Embed script"
<script
  src="https://journey.epilot.io/stable/assets/embed.js"
  type="module"
  async
></script>
```

For Canary updates, use the canary script

```html title="Canary Embed script"
<script
  src="https://journey.epilot.io/canary/assets/embed.js"
  type="module"
  async
></script>
```

Loading the script with `async` ensures it downloads without blocking your page and executes as soon as it's available. The script auto-registers the `<epilot-journey>` custom element on load.

### 2. Add the Journey element

Place the `<epilot-journey>` custom element wherever you want the Journey to appear:

```html title="Basic usage"
<epilot-journey
  journey-id="<your-journey-id>"
  mode="inline"
  lang="de"
  top-bar="true"
></epilot-journey>
```

Replace `<your-journey-id>` with the ID of the Journey you want to embed.

### 3. You're all set

The Journey will render inline on your page. Read on for the full attribute reference and advanced configuration options.

## Attribute Reference

All attributes are set as standard HTML attributes on the `<epilot-journey>` element. Boolean attributes accept `"true"` or `"false"` as string values.

| Attribute                | Type                          | Default         | Description                                                                                                                                                             |
| ------------------------ | ----------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `journey-id`             | `string`                      | —               | **Required.** The ID of the Journey to render.                                                                                                                          |
| `mode`                   | `"inline"` \| `"full-screen"` | `"full-screen"` | The display mode. `inline` renders the Journey within the page flow. `full-screen` renders it as an overlay.                                                            |
| `lang`                   | `"de"` \| `"en"` \| `"fr"`    | `"de"`          | Overrides the UI language. This affects UI labels and copy, but does not automatically translate static content configured in the Journey Builder.                      |
| `top-bar`                | `"true"` \| `"false"`         | `"true"`        | Whether to show the top navigation bar.                                                                                                                                 |
| `scroll-to-top`          | `"true"` \| `"false"`         | `"true"`        | Whether to scroll the page to the top of the Journey when the user navigates to a new step.                                                                             |
| `close-button`           | `"true"` \| `"false"`         | `"true"`        | Whether to show the close button in the top bar.                                                                                                                        |
| `context-data`           | JSON string                   | —               | Additional contextual data passed to the Journey and included with the submission. Must be a JSON-encoded string of key-value pairs. See [Context Data](#context-data). |
| `data-injection-options` | JSON string                   | —               | Pre-fill Journey fields and control the starting step. Must be a JSON-encoded string. See [Data Injection](#data-injection).                                            |
| `journey-token`          | `string`                      | —               | A JWT token used for [post-qualification Journeys](./post-qualification).                                                                                               |
| `is-full-screen-entered` | `"true"` \| `"false"`         | `"false"`       | Controls whether a full-screen Journey is visible. Set to `"true"` to open it. Only applies when `mode` is `"full-screen"`.                                             |
| `is-embedded`            | `"true"` \| `"false"`         | `"false"`       | Indicates the Journey is embedded on a host app.                                                                                                                        |
| `debug`                  | `"true"` \| `"false"`         | `"false"`       | Enables debug mode for development and troubleshooting.                                                                                                                 |

## Examples

### Inline Mode

Render the Journey directly within the page flow:

```html title="Inline mode"
<epilot-journey
  journey-id="<your-journey-id>"
  mode="inline"
  lang="de"
  top-bar="true"
  scroll-to-top="true"
></epilot-journey>
```

### Full-Screen Mode

In full-screen mode, the Journey is hidden by default. Use the `is-full-screen-entered` attribute to control its visibility:

```html title="Full-screen mode"
<epilot-journey
  journey-id="<your-journey-id>"
  mode="full-screen"
  lang="en"
  top-bar="true"
  close-button="true"
></epilot-journey>

<button onclick="openJourney()">Open Journey</button>

<script>
  function openJourney() {
    const el = document.querySelector('epilot-journey')
    el.setAttribute('is-full-screen-entered', 'true')
  }
</script>
```

To close the Journey, set the attribute back to `"false"`:

```javascript title="Closing the Journey"
document
  .querySelector('epilot-journey')
  .setAttribute('is-full-screen-entered', 'false')
```

:::info Live Examples

Interactive examples are available at [Storybook Examples](https://embed.journey.epilot.io/stories/?path=/docs/next-web-component--docs) for only **Public Journeys**, where you can browse different embedding scenarios and configurations.

:::

## Limitations

### Single instance per page

Only one `<epilot-journey>` element is supported per page. Placing multiple instances on the same page is not supported and may lead to unexpected behavior.

To load a different Journey, update the attributes on the existing element rather than adding a new one:

```html title="Single element"
<epilot-journey
  journey-id="<journey-id-1>"
  mode="inline"
  lang="de"
></epilot-journey>

<button onclick="switchJourney()">Load another Journey</button>

<script>
  function switchJourney() {
    const el = document.querySelector('epilot-journey')
    el.setAttribute('journey-id', '<journey-id-2>')
    el.setAttribute('lang', 'en')
  }
</script>
```

If you need multiple Journeys visible simultaneously, use the [iframe embedding](./embedding) approach instead.

## Context Data

Use the `context-data` attribute to pass additional key-value pairs to the Journey. This data is included with the submission and can be used for tracking, attribution, or pre-configuring behavior.

The value must be a JSON-encoded string. Only **string** and **numeric** values are supported:

```html title="Passing context data"
<epilot-journey
  journey-id="<your-journey-id>"
  mode="inline"
  context-data='{"source": "landing-page", "campaign": "summer-2025", "count": 3}'
></epilot-journey>
```

Numeric values are coerced to strings internally.

## Data Injection

Data injection allows you to pre-fill Journey fields with data and optionally start from a specific step. This is useful when your website has already collected some information (e.g. a product selection or address) and you want to carry it into the Journey.

The `data-injection-options` attribute accepts a **JSON string** with the following structure:

```typescript title="DataInjectionOptions"
type DataInjectionOptions = {
  /** The step index to start the Journey from (0-based) */
  initialStepIndex?: number
  /** Pre-fill data for each step */
  initialState?: Record<string, unknown>[]
  /** Control which blocks/fields are disabled */
  blocksDisplaySettings?: BlockDisplaySetting[]
}

type BlockDisplaySetting = {
  type: 'DISABLED'
  blockName: string
  stepIndex: number
  blockFields?: string[]
}
```

### Setting data injection options

Pass the JSON directly as a string attribute using single quotes around the attribute value:

```html title="Pre-filling journey data"
<epilot-journey
  journey-id="<your-journey-id>"
  mode="inline"
  data-injection-options='{"initialState":[{"Date":{"startDate":"2026-02-19","endDate":null,"_isValid":true},"Number Input":{"numberInput":"3","numberUnit":"","_isValid":true},"Binary Input":true}]}'
></epilot-journey>
```

You can also set it dynamically via JavaScript:

```javascript title="Setting data injection dynamically"
const el = document.querySelector('epilot-journey')

el.setAttribute(
  'data-injection-options',
  JSON.stringify({
    initialStepIndex: 1,
    initialState: [
      {
        'Product Selection': {
          selectedProduct: 'solar-panel-basic',
          _isValid: true,
        },
      },
      {},
      {},
    ],
    blocksDisplaySettings: [
      {
        type: 'DISABLED',
        blockName: 'Product Selection',
        stepIndex: 0,
        blockFields: ['selectedProduct'],
      },
    ],
  })
)
```

### Populating `initialState`

`initialState` is an array where each element corresponds to a Journey step (by index). Each step entry is an object keyed by block name, containing the field values for that block.

- Steps that should not be pre-filled must be empty objects `{}`.
- The array must be ordered sequentially to match step order.

To discover the correct block names and field structure, open your Journey in **debug mode** from the Journey Builder and inspect the state for each step.

## Dynamic Attribute Updates

The `<epilot-journey>` element reacts to attribute changes. You can update attributes dynamically via JavaScript, and the Journey will re-render with the new configuration:

```javascript
const journey = document.querySelector('epilot-journey')

// Change language
journey.setAttribute('lang', 'en')

// Update context data
journey.setAttribute('context-data', JSON.stringify({ source: 'checkout' }))
```

You can also call the `refresh()` method on the element to force a re-render:

```javascript
document.querySelector('epilot-journey').refresh()
```

## Content-Security-Policy (CSP)

If you don’t have Content-Security-Policy defined for your pages, you can skip this. If you have but can temporarily disable to perform the this test, go for that. Otherwise, please ensure you update your policy to allow the below

```text title="Minimum CSP for Web Components"
  script-src https://journey.epilot.io;
  style-src  'unsafe-inline' https://journey.epilot.io https://fonts.googleapis.com;
  img-src    data: blob: https://file.sls.epilot.io https://file-preview.sls.epilot.io https://journey.epilot.io;
  font-src   data: https://journey.epilot.io https://fonts.gstatic.com;
  connect-src 'self' https://*.sls.epilot.io https://*.epilot.io https://portal.epilot.cloud https://epilot-dev-user-content.s3.eu-central-1.amazonaws.com;
  frame-src  https://journey.epilot.io https://portal.epilot.cloud;
  form-action https://submission.sls.epilot.io https://journey.epilot.io;
```

:::tip

These rules are subject to change as we’re rolling out new features and web components themselves. Depending on your Journey setups, you might also need to give additional permissions in case you’re using third-party apps or apps of your own.

:::

See the dedicated [Content-Security-Policy](./content-security-policy) page for additional guidance on nonces and inline script handling.

## Migrating from iframes

If you are currently embedding Journeys using iframes with the `__epilot` embed script, migrating to Web Components involves:

1. **Replace the embed script** — swap the iframe bundle script for the Web Component embed script:

   ```diff
   - <script src="https://embed.journey.epilot.io/bundle.js"></script>
   + <script src="https://journey.epilot.io/stable/assets/embed.js" type="module" async></script>
   ```

2. **Replace the initialization code** — instead of calling `__epilot.init()`, use the `<epilot-journey>` custom element directly:

   ```diff
   - <div id="epilot-journey-<id>" style="width:100%;text-align:left"></div>
   - <script>
   -   __epilot.init([{
   -     journeyId: '<id>',
   -     mode: 'inline',
   -     topBar: true,
   -     lang: 'de',
   -   }])
   - </script>
   + <epilot-journey
   +   journey-id="<id>"
   +   mode="inline"
   +   top-bar="true"
   +   lang="de"
   + ></epilot-journey>
   ```

3. **Update CSP rules** — the same epilot domain rules apply. See [Content-Security-Policy](./content-security-policy).

The attribute names on the Web Component map directly to the options you previously passed to `__epilot.init()`, converted to kebab-case (e.g. `topBar` becomes `top-bar`, `scrollToTop` becomes `scroll-to-top`).
