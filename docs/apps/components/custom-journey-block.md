---
title: Journey Blocks
hide_title: true
sidebar_position: 4
---

# Custom Journey Blocks

Create custom interactive components for epilot's Journey Builder

## What Are Journey Blocks?

Journey Blocks are the interactive components that make up customer journeys within the epilot platform. They're the building blocks that allow businesses to create seamless, engaging customer experiences from initial contact through completion of a process.

Custom Journey Blocks extend this capability, allowing developers to create specialized components that integrate seamlessly with epilot's Journey Builder. These custom blocks appear alongside native blocks in the Journey Builder palette and can be placed anywhere in a customer journey flow.

## Why Create Custom Journey Blocks?

Custom Journey Blocks enable you to:

- **Fill Functional Gaps**: Create specialized functionality not available in standard blocks
- **Integrate External Systems**: Connect epilot journeys with third-party services and APIs
- **Implement Business Logic**: Add industry-specific calculations and validations
- **Customize UI/UX**: Design tailored experiences for specific customer segments
- **Visualize Data**: Present complex information in intuitive, interactive ways

## Building Your First Journey Block

Custom Journey Blocks are web components that follow standard web technologies, making them accessible to any web developer.

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Web Components standards
- A development environment with Node.js

### Getting Started

The fastest way to scaffold a journey block is with the **epilot CLI**:

```bash title="Scaffold a journey block with the CLI"
# Initialize a new app (if you don't have one yet)
npx epilot app init my-app
cd my-app

# Add a custom journey block component
npx epilot app add-component my-block --type CUSTOM_JOURNEY_BLOCK

# Install dependencies
npm install

# Start the development server
npm run dev
```

This creates a ready-to-use component with all the boilerplate wired up, including the web component wrapper and manifest configuration.

You can also find starter templates for each framework in the [app-templates](https://github.com/epilot-dev/app-templates) repository.

### Technology Recommendations

:::tip
While Journey Blocks can be built with any framework that compiles to web components, we recommend **React** for the best developer experience and access to epilot's Concorde UI library.
:::

React offers several key advantages:

- **Concorde UI Library Access**: Leverage epilot's Concorde component library for consistent styling
- **Alignment with epilot's Theme**: Ensure your blocks visually match the Journey Builder interface
- **Component Reusability**: Build with the same components used throughout the epilot platform
- **Developer Experience**: Benefit from React's robust ecosystem and developer tools

Using React with a web component wrapper gives you the best of both worlds: modern development experience and seamless integration with the Journey Builder.

For detailed examples and implementation guidelines, check our [Custom Block Examples](https://github.com/epilot-dev/epilot-journey-sdk/blob/main/custom-block.md).

### Component Mapping

A powerful feature of Journey Blocks is entity mapping, which lets you:

- **Connect UI Elements to Data**: Link form fields and components to specific entity properties
- **Enable Data Persistence**: Store and retrieve information across journey steps
- **Facilitate Data Processing**: Allow journey automation to use the collected data

Component mapping is defined in your app configuration and establishes the relationship between your UI elements and epilot's entity model. This mapping ensures that data flows properly between your custom block and the rest of the journey.

Example mapping types:
- `string`: For text fields and standard inputs
- `boolean`: For checkboxes and toggle switches
- `date`: For date picker components
- `datetime`: For date and time selection components
- `link`: For link components

### Component Arguments

![Component Arguments](/img/apps/journey-component-args.png)


Journey Blocks can be made configurable through component arguments, which allow:

- **Per-Instance Configuration**: Journey creators can customize each instance of your block
- **Reusable Components**: The same block can be configured differently in various parts of a journey
- **User-Friendly Setup**: Non-technical users can adjust block behavior without coding

Arguments are defined in your app configuration and appear in the block settings panel when a user adds your block to a journey. They can include:

- Text inputs for customizable labels and messages
- Boolean toggles for feature enabling/disabling
- Dropdown selectors for pre-defined options
- And more

This configurability makes your custom blocks more versatile and valuable across different use cases.

## Best Practices

### Performance Considerations

- **Bundle Size**: Keep your bundle under 500KB to ensure quick loading times
- **Lazy Loading**: Load external resources only when needed
- **Asset Optimization**: Compress images and minimize CSS/JS
- **Efficient DOM Operations**: Minimize DOM manipulations and reflows

### Bundling Your Component

:::caution
Your component must be bundled into a **single `bundle.js` file**. This is the only format currently supported. The bundle must include all styles and assets inline.
:::


### UI Design Guidelines

For consistent user experience, your custom blocks should:

- Follow epilot's design language
- Be responsive and accessible
- Provide clear feedback on actions
- Include proper validation and error states

## Testing Your Journey Block

Before submitting your block:

1. Test in different browsers (Chrome, Firefox, Safari)
2. Verify responsiveness on different screen sizes
3. Ensure accessibility standards are met
4. Check for memory leaks during repeated use


## Journey Block Usage

Once your App with a custom Journey Block is installed, you can use it in the Journey Builder and configure it according to your needs:

![Block Usage](/img/apps/component-journey-installed.png)



## Calling External APIs via Proxy

Custom journey blocks run in the browser. If your block needs to call a third-party API that requires credentials (API keys, OAuth tokens, etc.), **never embed those secrets in your client-side code**. Instead, use the [API Proxy](./api-proxy.md) — it runs server-side and injects credentials on your behalf so they never reach the browser.

### Setup

1. **Add an API Proxy component** to your app in the App Builder (see [API Proxy docs](./api-proxy.md) for full setup).
2. **Install the App SDK** in your journey block project:

```bash
npm install @epilot/app-sdk
```

### Using the proxy in a journey block

Journey blocks receive a `publicToken` via the container props. Pass this token to the `proxy` function to authenticate the request:

```typescript
import { proxy } from '@epilot/app-sdk';

function App(props: AppProps<unknown>) {
  useEffect(() => {
    if (!props.container.publicToken) return;

    proxy('my-api', '/endpoint', {
      appId: 'your-app-id',
      token: props.container.publicToken,
      method: 'POST',
      body: { hello: 'world' },
    })
      .then((response) => response.json())
      .then((data) => console.log('Proxy response:', data))
      .catch((error) => console.error('Proxy error:', error));
  }, [props.container.publicToken]);

  return <div>...</div>;
}
```

| Parameter | Description |
| --- | --- |
| `'my-api'` | The proxy name you configured in the App Builder |
| `'/endpoint'` | The path appended to the proxy's target URL |
| `appId` | Your app's ID |
| `token` | The `publicToken` from the journey block container props |
| `method` | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.) |
| `body` | Optional request body (automatically serialized to JSON) |

:::tip
The `publicToken` is only available at runtime when the journey is rendered for an end user. During development, you can test with a hardcoded token — just make sure to remove it before publishing.
:::

### How it works

1. Your journey block calls `proxy()` with the `publicToken`
2. The request is sent to the epilot proxy server (not directly to the third-party API)
3. The proxy resolves the credentials configured in the App Builder (API key, Bearer token, or OAuth 2.0)
4. The proxy forwards the request to the target API with credentials injected server-side
5. The response is returned to your journey block

This means your API keys and secrets are **never exposed** in the journey's client-side bundle or network requests visible to end users.

For full details on authentication types, request signing, and security, see the [API Proxy documentation](./api-proxy.md).

## Useful Resources

### Journey UI Library Concorde (React)

While custom blocks are framework-agnostic, you can reference epilot's UI components for design consistency:

- [Source Code](https://github.com/epilot-dev/concorde-elements)
- [Storybook](https://portal.epilot.cloud/concorde-elements)

### Documentation and Examples

- [Web Components MDN Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
