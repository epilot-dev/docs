---
title: App Surfaces
hide_title: true
sidebar_position: 2
---

# App Surfaces

App Surfaces are specific locations within the epilot platform where your custom app can be embedded. Each surface type provides a different context and set of capabilities, allowing you to extend epilot's functionality in targeted ways.

## Overview

When you build an app for epilot, it runs inside an iframe embedded within the epilot XRM. The `@epilot/app-bridge` library enables communication between your app and the parent epilot application, providing:

- **Authentication** - OAuth tokens for epilot API calls
- **Localization** - Access to the user's language preference
- **Context** - Entity, page, or action configuration data
- **Messaging** - Two-way communication with the parent app

```bash title="Install the App Bridge"
npm install @epilot/app-bridge
```

## Available Surface Types

### Entity Capability

A collapsible section within an entity detail view. Use this surface to display entity-specific data, metrics, or custom UI elements directly on the entity page.

```
┌─────────────────────────────────────┐
│ Entity: Contact - John Doe          │
├─────────────────────────────────────┤
│ ▼ Overview                          │
│   Name: John Doe                    │
│   Email: john@example.com           │
├─────────────────────────────────────┤
│ ▼ Your App Capability ← Your App    │
│   ┌─────────────────────────────┐   │
│   │   Custom content here       │   │
│   │   (iframe)                  │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Use cases:**
- Display external data related to an entity
- Show metrics or analytics
- Provide quick actions or tools
- Integrate third-party services

### Entity Tab

A dedicated tab within the entity detail view. Tabs provide more space than capabilities and are ideal for comprehensive features that require a full-page layout.

```
┌─────────────────────────────────────┐
│ Entity: Contact - John Doe          │
├─────────────────────────────────────┤
│ Overview │ History │ Your Tab ←     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │   Your full-page content        │ │
│ │   (iframe)                      │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Use cases:**
- Complex data visualizations
- Full-featured integrations
- Document management
- Detailed analytics dashboards

### Flow Action Config

Configuration UI for custom automation actions. When users add your custom action to an automation workflow, this surface displays your configuration interface.

```
┌─────────────────────────────────────┐
│ Automation: New Order Processing    │
├─────────────────────────────────────┤
│ Trigger: Order Created              │
│           ↓                         │
│ Action: Your Custom Action          │
│ ┌─────────────────────────────────┐ │
│ │ Configuration:                  │ │
│ │ Webhook URL: [____________]     │ │
│ │ Enable: [✓]                     │ │
│ │ (iframe)                        │ │
│ └─────────────────────────────────┘ │
│           ↓                         │
│ Action: Send Email                  │
└─────────────────────────────────────┘
```

**Use cases:**
- Configure webhook endpoints
- Set up third-party service credentials
- Define action parameters
- Map data fields

### Custom Page

A full standalone page within the epilot 360 portal. Custom Pages register their own `/app/<slug>` route, use the standard 360 layout (sidebar navigation + topbar), and appear as navigation items in the **Custom** workplace. They support sub-pages and deep-linking.

**Use cases:**
- Data dashboards and explorers
- Admin panels and settings pages
- Multi-step wizards or onboarding flows
- Full-page third-party integrations

**See also:** [Custom Page component docs](/docs/apps/components/custom-page) for component configuration details.

### Surfaces in the manifest

Each surface belongs to a component type. In the [app manifest](/docs/apps/app-manifest), the component's `surfaces` object points at the entry file of your interface (`app_url`), and `assets.zip` at the directory that is uploaded on deploy.

| Surface | Component type | Manifest |
| --- | --- | --- |
| Entity Capability | `CUSTOM_CAPABILITY` | `configuration.type: "group"`, surface key `capability_config` |
| Entity Tab | `CUSTOM_CAPABILITY` | `configuration.type: "tab"`, surface key `capability_config` |
| Entity Widget | `CUSTOM_CAPABILITY` | `configuration.type: "widget"`, surface key `capability_config` |
| Flow Action Config | `CUSTOM_FLOW_ACTION` | surface key `flow_action_config` |
| Custom Page | `CUSTOM_PAGE` | surface key `page` |

See [Entity Capabilities](/docs/apps/components/entity-capability) for the configuration of the three entity surfaces.

---

## Getting Started with App Bridge

### Basic Initialization

:::tip
Every app **must** call `initialize()` before using any other app-bridge functions. This establishes the communication channel with the parent epilot application.
:::

```typescript title="Basic initialization"
import { initialize } from '@epilot/app-bridge';

async function main() {
  // Initialize and get authentication data
  const { token, lang } = await initialize();

  // token: OAuth access token for epilot APIs
  // lang: User's language preference ('en', 'de', etc.)

  console.log('App initialized with language:', lang);
}

main().catch(console.error);
```

### Initialization Options

```typescript title="Initialization with options"
const session = await initialize({
  contentHeight: 400,    // Initial iframe height in pixels
  timeout: 5000,         // Timeout in milliseconds (default: 5000)
});
```

### Reading App Options

The [app options](/docs/apps/app-options) an organization configured for your app arrive with the initialization handshake — no API call needed. Read them with `getOptions()`:

```typescript title="Reading app options"
import { initialize, getOptions } from '@epilot/app-bridge';

interface MyOptions {
  api_host: string;
  auth_mode: 'none' | 'basic';
  page_size: number;
}

async function main() {
  await initialize();

  const { api_host, auth_mode } = getOptions<MyOptions>();
}
```

- **Only non-sensitive options are included.** Secrets and options declared `sensitive` never reach the browser — call your backend through the [API Proxy](/docs/apps/components/api-proxy), which attaches credentials server-side.
- Values are the **effective** values: an option nobody configured has its declared [`default`](/docs/apps/app-options#defaults).
- `getOptions()` returns `{}` when no options are available, so treat every key as optional. This is the case when the user may not view the app installation.
- Options are also available on the session: `(await initialize()).options`.

Requires `@epilot/app-bridge` 0.3.0 or later.

---

## Entity Surface Implementation

For both Entity Capability and Entity Tab surfaces, use the entity-related APIs.

### Getting Entity Context

```typescript title="Getting entity context"
import { initialize, getEntityContext } from '@epilot/app-bridge';

async function main() {
  const { token, lang } = await initialize();

  // Get the entity being viewed
  const context = await getEntityContext();

  console.log('Entity ID:', context.entityId);
  console.log('Schema:', context.schema);        // e.g., 'contact', 'order'
  console.log('Entity:', context.entity);        // the full entity being viewed
  console.log('Capability:', context.capability); // Your app's capability config
}
```

**Context Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | `string` | UUID of the entity being viewed |
| `schema` | `string` | Entity schema slug (e.g., `'contact'`, `'order'`, `'opportunity'`) |
| `entity` | `Entity` | The full entity being viewed. Use it instead of fetching the entity from the Entity API: it saves a request and needs no permissions |
| `capability` | `EntityCapability` | Capability configuration from your app manifest |
| `isVisible` | `boolean` | Whether the tab/capability is currently visible (tabs only) |

### Dynamic Content Height

Since your app runs in an iframe, you need to communicate your content height to epilot so it can adjust the iframe size appropriately.

```typescript title="Report content height"
import { initialize, updateContentHeight } from '@epilot/app-bridge';

async function main() {
  await initialize();

  // After rendering your content
  renderContent();

  // Report the content height
  updateContentHeight(document.body.scrollHeight);
}
```

**For dynamic content, use ResizeObserver:**

```typescript title="Auto-update height with ResizeObserver"
import { initialize, updateContentHeight } from '@epilot/app-bridge';

async function main() {
  await initialize();

  const container = document.getElementById('app');

  // Automatically update height when content changes
  const observer = new ResizeObserver((entries) => {
    const height = entries[0].contentRect.height;
    updateContentHeight(height);
  });

  observer.observe(container);
}
```

### Handling Tab Visibility

For Entity Tab surfaces, the tab may be hidden when the user switches to another tab. Handle visibility changes to optimize performance:

```typescript title="Handle tab visibility changes"
import {
  initialize,
  getEntityContext,
  onVisibilityChange
} from '@epilot/app-bridge';

async function main() {
  await initialize();

  const { entityId, schema, isVisible } = await getEntityContext();

  // Initial load only if visible
  if (isVisible) {
    await loadData(entityId, schema);
  }

  // Subscribe to visibility changes
  const unsubscribe = onVisibilityChange((visible) => {
    if (visible) {
      // Tab became visible - refresh data
      refreshData();
    }
  });

  // Clean up when your app unmounts
  // unsubscribe();
}
```

---

## Action Config Implementation

For Flow Action Config surfaces, use the action configuration APIs.

### Reading Action Configuration

```typescript title="Read action config"
import { initialize, getActionConfig } from '@epilot/app-bridge';

// Define your configuration type
interface WebhookConfig {
  url: string;
  headers: Record<string, string>;
  enabled: boolean;
}

async function main() {
  await initialize();

  // Get existing configuration
  const config = await getActionConfig<WebhookConfig>();

  // Access your custom config
  const webhookUrl = config.custom_action_config?.url ?? '';
  const isEnabled = config.custom_action_config?.enabled ?? false;

  // Render your configuration form
  renderForm({ webhookUrl, isEnabled });
}
```

**Config Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `custom_action_config` | `T` | Your custom configuration object |
| `description` | `string?` | Action description shown in the UI |
| `app_id` | `string?` | Associated app ID |

### Updating Action Configuration

When the user changes configuration in your UI, update it immediately:

```typescript title="Update action config on change"
import { initialize, getActionConfig, updateActionConfig } from '@epilot/app-bridge';

interface WebhookConfig {
  url: string;
  enabled: boolean;
}

async function main() {
  await initialize();

  const { custom_action_config } = await getActionConfig<WebhookConfig>();

  // Set up form with existing values
  const urlInput = document.getElementById('webhook-url') as HTMLInputElement;
  urlInput.value = custom_action_config?.url ?? '';

  // Update config when user makes changes
  urlInput.addEventListener('change', () => {
    updateActionConfig<WebhookConfig>({
      url: urlInput.value,
      enabled: custom_action_config?.enabled ?? true,
    });
  });
}
```

### Async Actions with Callbacks

If your action performs asynchronous work and the automation should wait for it to complete, use `waitForCallback`:

```typescript title="Enable async callback"
updateActionConfig(
  { url: 'https://api.example.com/webhook' },
  { waitForCallback: true }
);
```

When `waitForCallback` is true, the automation engine will wait for your action to signal completion before proceeding to the next step.

---

## Page Surface Implementation

Custom Pages use `getPageContext()`, `navigate()` and `onLocationChange()` to read the current route, move between sub-pages and follow the browser's back and forward buttons. The [Custom Page](/docs/apps/components/custom-page#implementing-your-page) page explains them with examples; the functions are listed in the [API reference](#page-surface-api) below.

---

## Authorizing API Clients

The app-bridge provides a convenient way to authorize epilot SDK clients:

```typescript title="Authorize SDK clients"
import { getClient } from '@epilot/entity-client';
import { getClient as getFileClient } from '@epilot/file-client';
import { initialize, authorizeClient } from '@epilot/app-bridge';

async function main() {
  const session = await initialize();

  // Create clients
  const entityClient = getClient();
  const fileClient = getFileClient();

  // Authorize with the session
  authorizeClient(entityClient, session);
  authorizeClient(fileClient, session);

  // Now ready to make API calls
  const entities = await entityClient.searchEntities({
    schema: 'contact',
    query: 'john',
  });
}
```

You can also pass just the token string:

```typescript
authorizeClient(entityClient, session.token);
```

---

## Custom Events

For advanced use cases, you can send and receive custom events:

### Sending Events

```typescript
import { send } from '@epilot/app-bridge';

// Send a custom event to the parent
send('my-custom-event', {
  action: 'refresh',
  data: { key: 'value' },
});
```

### Receiving Events

```typescript
import { on } from '@epilot/app-bridge';

// Listen for custom events
const unsubscribe = on<{ action: string }>('parent-event', (data) => {
  console.log('Received action:', data.action);
});

// Cleanup when done
unsubscribe();
```

### Wildcard Subscriptions

```typescript
// Listen to all events
on('*', (data) => {
  console.log('Event received:', data);
});

// Listen to events with a prefix
on('custom-*', (data) => {
  console.log('Custom event:', data);
});
```

---

## Error Handling

The app-bridge provides specific error types for better error handling:

```typescript
import {
  initialize,
  getSession,
  AppBridgeTimeoutError,
  AppBridgeNotInitializedError,
} from '@epilot/app-bridge';

// Handle initialization timeout
try {
  await initialize({ timeout: 3000 });
} catch (error) {
  if (error instanceof AppBridgeTimeoutError) {
    console.error(`Initialization timed out after ${error.timeout}ms`);
    showError('Failed to connect to epilot. Please refresh the page.');
  }
}

// Handle not initialized error
try {
  const session = getSession();
} catch (error) {
  if (error instanceof AppBridgeNotInitializedError) {
    // App bridge not initialized yet
    await initialize();
  }
}
```

---

## API Reference

### Session Management

| Function | Returns | Description |
|----------|---------|-------------|
| `initialize(options?)` | `Promise<AppBridgeSession>` | Initialize the app bridge and establish the postMessage channel with the parent epilot app. Returns session data with an OAuth token and the user's language. Safe to call multiple times - subsequent calls return the cached session. |
| `getSession()` | `AppBridgeSession` | Get the cached session synchronously. Throws `AppBridgeNotInitializedError` if called before `initialize()`. |
| `getOptions<T>()` | `Partial<T>` | Get the non-sensitive [app option](/docs/apps/app-options) values of the installation, delivered with the handshake. Returns `{}` when none are available. Throws `AppBridgeNotInitializedError` if called before `initialize()`. |
| `isInitialized()` | `boolean` | Check whether the app bridge has been initialized. |

**InitOptions:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentHeight` | `number` | `document.body.scrollHeight` | Initial iframe height in pixels to report to the parent |
| `timeout` | `number` | `5000` | Timeout in milliseconds for the initialization handshake |
| `retries` | `number` | `2` | How often the handshake is retried after a timeout. Set to `0` for a single attempt |

### Entity Surface API

| Function | Returns | Description |
|----------|---------|-------------|
| `getEntityContext(options?)` | `Promise<EntityContext>` | Get the entity being viewed. Available on Entity Capability and Entity Tab surfaces. |
| `updateContentHeight(height)` | `void` | Report your content height to the parent so it can resize the iframe. Call after rendering or when content size changes. |
| `onVisibilityChange(handler)` | `Unsubscribe` | Subscribe to visibility changes on Entity Tab surfaces. The handler receives `true` when the tab becomes visible, `false` when hidden. Returns an unsubscribe function. |

### Action Config API

| Function | Returns | Description |
|----------|---------|-------------|
| `getActionConfig<T>(options?)` | `Promise<ActionConfig<T>>` | Get the current action configuration. Available on Flow Action Config surfaces. |
| `updateActionConfig<T>(config, options?)` | `void` | Update the action configuration. The parent automation UI receives the new config immediately. |

**UpdateConfigOptions:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `waitForCallback` | `boolean` | `false` | If true, the automation engine waits for an async callback before proceeding to the next action |

### Page Surface API

| Function | Returns | Description |
|----------|---------|-------------|
| `getPageContext(options?)` | `Promise<PageContext>` | Get the page context including slug, sub-path, and full path. Available on Custom Page surfaces. |
| `navigate(subPath)` | `void` | Navigate to a sub-path within the current page. Triggers `history.pushState` in the parent frame, updating the browser URL. Does not reload the iframe. |
| `onLocationChange(handler)` | `Unsubscribe` | Subscribe to browser back/forward navigation. The handler receives the new sub-path. Returns an unsubscribe function. |

### Generic Event API

| Function | Returns | Description |
|----------|---------|-------------|
| `on<T>(event, handler)` | `Unsubscribe` | Subscribe to events from the parent app. Supports wildcard patterns (e.g., `'custom-*'` or `'*'`). Returns an unsubscribe function. |
| `send(event, data?)` | `void` | Send a custom event to the parent app. Use for custom communication not covered by the high-level APIs. |

### Client Authorization

| Function | Returns | Description |
|----------|---------|-------------|
| `authorizeClient(client, sessionOrToken)` | `void` | Authorize an `@epilot/*-client` SDK client with the session token. Accepts either an `AppBridgeSession` object or a token string. Sets the `Authorization: Bearer <token>` header on the client. |

### Low-Level Messaging API

For advanced use cases, the `epilot` object provides direct access to the postMessage transport:

```typescript
import { epilot } from '@epilot/app-bridge';

// Send a raw message to the parent
epilot.sendMessageToParent('my-event', { key: 'value' });

// Subscribe to raw messages from the parent (supports wildcards)
const unsubscribe = epilot.subscribeToParentMessages('my-event', (event) => {
  console.log('Received:', event.data);
});
```

| Function | Returns | Description |
|----------|---------|-------------|
| `epilot.sendMessageToParent(event, detail?)` | `void` | Send a raw postMessage to the parent window |
| `epilot.subscribeToParentMessages(event, handler)` | `Unsubscribe` | Subscribe to raw postMessage events from the parent. The handler receives the `MessageEvent`; the payload is in `event.data`. Supports wildcard matching with `*`. |

### Types

```typescript
import type {
  // Session
  AppBridgeSession,    // { token: string; lang: string; options?: AppOptions }
  AppOptions,          // Record<string, unknown> — option values keyed by option key
  InitOptions,         // { contentHeight?: number; timeout?: number; retries?: number }
  RequestOptions,      // { timeout?: number }

  // Entity Surface
  EntityContext,       // { entityId: string; schema: string; entity?: Entity; capability?: EntityCapability; isVisible?: boolean }
  EntityCapability,    // { name?: string; app_id?: string; [key: string]: unknown }

  // Page Surface
  PageContext,         // { slug: string; subPath: string; path: string }

  // Action Config Surface
  ActionConfig<T>,     // { custom_action_config?: T; description?: string; app_id?: string }
  UpdateConfigOptions, // { waitForCallback?: boolean }

  // Event Handlers
  MessageHandler<T>,   // (data: T) => void
  VisibilityHandler,   // (isVisible: boolean) => void
  Unsubscribe,         // () => void
} from '@epilot/app-bridge';
```

### Error Types

```typescript
import {
  AppBridgeError,              // Base error class for all app-bridge errors
  AppBridgeTimeoutError,       // Thrown when a request times out (has .event and .timeout properties)
  AppBridgeNotInitializedError // Thrown when calling functions before initialize()
} from '@epilot/app-bridge';
```

| Error | Properties | Description |
|-------|------------|-------------|
| `AppBridgeError` | `message` | Base error class. All app-bridge errors extend this. |
| `AppBridgeTimeoutError` | `event: string`, `timeout: number` | A request/response operation timed out. The `event` property identifies which operation failed and `timeout` is the duration in ms. |
| `AppBridgeNotInitializedError` | - | `getSession()` or other functions were called before `initialize()`. |

---

## Best Practices

:::caution
Always wrap `initialize()` in a try-catch block. If the app bridge fails to connect (e.g., the app is loaded outside of epilot), your app should display a user-friendly error message rather than silently failing.
:::

1. **Always initialize first** - Call `initialize()` before any other app-bridge functions
2. **Handle errors gracefully** - Wrap initialization in try-catch and show user-friendly errors
3. **Update content height** - Always report your content height, especially after rendering
4. **Use ResizeObserver** - For dynamic content, observe size changes automatically
5. **Handle visibility** - For tabs, pause expensive operations when not visible
6. **Type your configs** - Use TypeScript generics for type-safe configuration
7. **Clean up subscriptions** - Call unsubscribe functions when your app unmounts