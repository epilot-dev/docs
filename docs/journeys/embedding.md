---
sidebar_position: 3
---

# Embedding Journeys

Journeys can easily be embedded on any website by placing an embed script tag provided by epilot on your website, and then optionally customizing it for advanced use.

## Embed Script

An embed script is a simple way to publish an epilot journey on your website. The script loads the journey using a Journey ID and a secure token to embed the journey securely on your website.

This page guides you through the different options available to embed a Journey into your web page.

## Embed Configurator

Configure and copy the embed script via the Journey Builders' Embed Configurator after saving the Journey. You can choose:

- Whether the Journey should be shown in a full-screen overlay, or inline to your website (Default: Fullscreen)
- The language of the journey (Default: German DE)
- The label of the button that suppose to open the journey (Default: Inhalt anzeigen)
- The alignment of the button, left, right, or center (Default: Left)
- Overwride the journey option to scroll the user to the top of the new step once the end user clicks on the next button in any step (Default: ON)

Depending on the embedding type, you can change additional settings.

![Embedding Configuration](../../static/img/journey-builder-embed.png)

## Journey Data Injection

It is possible by using the Embed Script to modify the initial state of the journey. There are the following posibilities:

1. Setting an intial data for the journey: doing this will prefill the blocks with data.
2. Starting the journey from a specific step: doing this will start the journey from the specified step if it was combined with the initial data, one can achieve a case when a product is selection is done in an external website, injected into the journey, then the in journey selection step skipped.
3. Set display options for the journey fields (for now disabling fields)

The following DataInjectionOptions type shows what is possible. However we ask devs to go to our [Embed Script Docs](https://github.com/epilot-dev/epilot-journey-sdk/tree/main/examples/embed-script) to view some examples.

**Type Definition**

```typescript
export type DataInjectionOptions = {
  /** the initial step index of the journey. aka, where to start the journey from */
  initialStepIndex?: number
  /** 
   * the initial state of the journey. aka, what data to prefill the journey with 
   * Read section below to understand how to populate this
   * */
  initialState?: Record<string, unknown>[]
  /** the display options to be passed to the journey, for now it is used to disable some fields */
  blocksDisplaySettings?: BlockDisplaySetting[]
}
```

To populate `intialState` in `DataInjectionOptions` properly, open the journey in **debug mode** (see video below) and copy the journey state per step.

![Journey Embed Mode](../../static/img/journey-debug-mode.gif)

**Note**: `initialState` must be filled sequentially based on the order of steps; steps that are not injected into must be an **empty object**.
See example below to inject data into Step 2 and Step 3. Notice that Step 1 needs to be empty for this to work properly

```typescript
  initialState: [
    {},
    {
      "Binary Input": false,
    },
    {
      "Personal Data Input": {
        "salutation": "Ms. / Mrs.",
        "firstName": "Test Name",
        "lastName": "",
        "email": "",
        "telephone": "",
        "_isValid": false
      }
    },
    {}
  ]
}
```

## Configuration Possibilities

For more advanced configuration options, you can modify the embed script yourself, as it adds an interface to your website to interact with the journey: `__epilot`
Below we explain all possibile configuration options

### init

**Description**  
Used to initialize one or more journeys given individual options. Multiple Journeys with different configurations can be passed

**Type Definition**

```typescript
type Init = (options?: OptionsInit[] | undefined, initOnLoad?: boolean) => void
type JourneyMode = 'inline' | 'full-screen'

type OptionsInit = {
  /** id of the journey to initialise (load configuration) */
  journeyId: string
  /** url to override iframe src */
  journeyUrl?: string
  /** mode the journey runs in -> inline | full-screen */
  mode: JourneyMode
  /** the minimum height the journey runs in when in inline mode */
  minHeight?: string
  /**
   * whether to show or hide the topBar
   * @default true
   */
  topBar?: boolean
  /**
   * whether to scroll to the top after step navigation
   * @default true
   */
  scrollToTop?: boolean
  /**
   * whether to show the closeButton if in inline mode
   * @default true
   */
  closeButton?: boolean
  /** additional data passed to the journey + submission */
  contextData?: Record<string, unknown>
  /** the language the journey should be initialised in */
  lang?: string
  /** the data injext options that will be passed to the journey */
  dataInjectionOptions?: DataInjectionOptions
  /**
   * Used as iframe name/title attribute if provided
   */
  name?: string
}
```

**Usage**

```typescript
__epilot.init([{ journeyId: '123', mode: 'full-screen', topBar: false }])
```

### update

**Description**  
Used to update an initialized journey by passed options.

**Type Definition**

```typescript
type Update = (journeyId: string, payload?: OptionsUpdate) => void
type OptionsUpdate = Omit<OptionsInit, 'journeyId'>
```

**Usage**

```typescript
__epilot.update('123', { journeyId: '123', mode: 'full-screen', topBar: false })
```

### on

**Description**  
Sets up an event listener to execute custom logic based on journey events.

**Uses cases:**

- Execute logging, or tracking
- Adjust website CSS, e.g. if full screen exited

**Type Definition**

```typescript
type JourneyEvent =
  | 'init'
  | 'enterFullScreen'
  | 'exitFullScreen'
  | 'closeJourney'
  | 'formChange'

type On = (
  eventName: JourneyEvent,
  cb: (payload: Record<string, unknown>, event: CustomEvent) => void
) => void
```

**Usage**

```typescript
__epilot.on('init', function ({ journeys }) {
  console.log('Journey Initialized')
})
```

### enterFullScreen

**Description**  
If a journey is initialized in full-screen mode, executes the command to open the journey.

**Type Definition**

```typescript
type EnterFullScreen = (
  journeyId: string,
  payload?: Record<string, unknown> | undefined
) => void
```

**Usage**

```typescript
__epilot.enterFullScreen('123')
```

### exitFullScreen

**Description**  
If a journey is in full-screen mode, executes the command to close the journey. It is also internally used at the Journeys “Close button”.

**Type Definition**

```typescript
type ExitFullScreen = (
  journeyId: string,
  payload?: Record<string, unknown> | undefined
) => void
```

**Usage**

```typescript
__epilot.exitFullScreen('123')
```

### isInitialized

**Description**  
Checks whether a journey is initialized already initialized or not.

**Type Definition**

```typescript
type IsInitialized = (journeyId: string) => boolean
```

**Usage**

```typescript
if (__epilot.isInitialized('123') === true) {
  __epilot.enterFullScreen('123')
}
```

## Scenarios

### Full-Screen

The default embed method covers most of the use cases. A button will be placed on your website which opens the journey, covering the complete screen when clicked.

**Code Snippet**  
The below code snippet provides the configured embed script and a button opening the journey when clicked. Don’t forget to change the placeholder ids to your own journey ids!

```html
<!-- Clicking this button will open your Journey -->
<button onclick="__epilot.enterFullScreen('<your-journey-id>')">
  Open Journey
</button>

<!-- Embed script managing your Journey -->
<script
  data-ep-mode="full-screen"
  data-ep-journeyIds="<your-journey-id>"
  src="https://embed.journey.epilot.io/bundle.js"
></script>
```

**Attributes explained**  
`data-ep-mode` - sets the mode the journey runs in  
`data-ep-journeyIds` the journey to be created via it’s id

**Outcome**

![Embedding Fullscreen Outcome](../../static/img/journey-embed-outcome-full-screen.gif)

### Inline

This method will place the journey into a provided container element, or, if not provided, at the end of the web page. The height of the journey will automatically be recalculated based on the current content. In order to provide a better user experience, navigating to a different step will cause the browser to move back to the top position of the journey. The close button of the top bar is hidden.

**Code Snippet**  
The below code snippet provides the configured embed script required to set up the inline mode and a container where the journey is being placed in. Don’t forget to change the placeholder ids to your own journey ids!

```html
<!-- Your Journey will go into this container -->
<div id="epilot-journey-<your-journey-id>"></div>

<!-- Embed script managing your Journey -->
<script
  data-ep-mode="inline"
  data-journeyIds="<your-journey-id>"
  src="https://embed.journey.epilot.io/bundle.js"
></script>
```

**Attributes explained**  
`data-ep-mode` - sets the mode the journey runs in
`data-ep-journeyIds` the journey to be created via it’s id

**Outcome**

![Embedding Inline Outcome](../../static/img/journey-embed-outcome-inline.gif)

### Multiple Journeys

The best way to embed multiple journeys is to use the `__epilot` interface described [here](#init). Simply pass multiple items to the `init` function

**Code Snippet**

```html
<button onclick="__epilot.enterFullScreen('<your-journey-id-1>')">
  Open Journey
</button>
<button onclick="__epilot.enterFullScreen('<your-journey-id-2>')">
  Open Journey
</button>
<script src="https://embed.journey.epilot.io/bundle.js"></script>
<script>
  __epilot.init([
      {
           { journeyId: '<your-journey-id-1>', mode: 'full-screen' },
           { journeyId: '<your-journey-id-2>', mode: 'full-screen' },
      }
  ])
</script>
```

**Attributes explained**  
In this example, we dont need any `data-ep-` attributes, as we use the `__epilot` interface to initialize the Journeys

**Outcome**

![Embedding Multiple Outcome](../../static/img/journey-embed-outcome-multiple.gif)
