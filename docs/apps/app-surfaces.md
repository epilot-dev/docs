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
  console.log('Capability:', context.capability); // Your app's capability config
}
```

**Context Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | `string` | UUID of the entity being viewed |
| `schema` | `string` | Entity schema slug (e.g., `'contact'`, `'order'`, `'opportunity'`) |
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

For Custom Page surfaces, use the page-related APIs. These APIs let you read the current page context, navigate between sub-pages, and respond to browser back/forward navigation.

### Getting Page Context

```typescript title="Get page context"
import { initialize, getPageContext } from '@epilot/app-bridge';

async function main() {
  const { token, lang } = await initialize();

  // Get the page context
  const { slug, subPath, path } = await getPageContext();

  console.log('Page slug:', slug);      // e.g., "energy-prices"
  console.log('Sub-path:', subPath);     // e.g., "/dashboard"
  console.log('Full path:', path);       // e.g., "/app/energy-prices/dashboard"

  // Render based on current sub-path
  renderPage(subPath);
}
```

**Context Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | `string` | The page slug from the URL (e.g., `'energy-prices'`) |
| `subPath` | `string` | Sub-path after the slug (e.g., `'/dashboard'`, `'/settings/advanced'`) |
| `path` | `string` | Full URL path (e.g., `'/app/energy-prices/dashboard'`) |

### Sub-Page Navigation

Use `navigate()` to change the parent frame URL when users interact with your app's internal navigation. This enables deep-linking and updates the browser address bar.

```typescript title="Navigate between sub-pages"
import { navigate } from '@epilot/app-bridge';

// Navigate to sub-pages within your app
navigate('/dashboard');           // URL becomes /app/<slug>/dashboard
navigate('/settings/advanced');   // URL becomes /app/<slug>/settings/advanced
navigate('/');                    // URL becomes /app/<slug>
```

:::tip
`navigate()` triggers a `history.pushState` in the parent frame. It does not reload the page or the iframe - your app stays mounted. Update your UI in response to the navigation.
:::

### Handling Browser Back/Forward

When the user clicks the browser back or forward button, the parent frame detects the `popstate` event and notifies your app:

```typescript title="React to browser navigation"
import { onLocationChange } from '@epilot/app-bridge';

const unsubscribe = onLocationChange((subPath) => {
  console.log('Browser navigated to:', subPath);
  renderPage(subPath);
});

// Clean up when your app unmounts
// unsubscribe();
```

### Combining Navigate and Location Change

A typical pattern is to use `navigate()` for user-initiated navigation and `onLocationChange()` for browser-initiated navigation:

```typescript title="Full navigation pattern"
import {
  initialize,
  getPageContext,
  navigate,
  onLocationChange,
  updateContentHeight,
} from '@epilot/app-bridge';

async function main() {
  await initialize();
  const { subPath } = await getPageContext();

  // Initial render
  renderPage(subPath);

  // Handle browser back/forward
  onLocationChange((newSubPath) => {
    renderPage(newSubPath);
  });

  // Handle user clicks on your internal nav
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.getAttribute('data-route')!;
      navigate(route);
      renderPage(route);
    }
  });
}

function renderPage(subPath: string) {
  // Your routing logic here
  updateContentHeight(document.body.scrollHeight);
}
```

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

## Complete Examples

### Entity Capability App

A complete example of an app that displays external CRM data for a contact:

```typescript title="Entity Capability - CRM integration example"
import {
  initialize,
  getEntityContext,
  updateContentHeight,
  authorizeClient,
} from '@epilot/app-bridge';
import { getClient } from '@epilot/entity-client';

interface ExternalCRMData {
  score: number;
  lastContact: string;
  notes: string[];
}

async function main() {
  // 1. Initialize app bridge
  const { token, lang } = await initialize();

  // 2. Set up API client
  const entityClient = getClient();
  authorizeClient(entityClient, token);

  // 3. Set language
  document.documentElement.lang = lang;

  // 4. Get entity context
  const { entityId, schema } = await getEntityContext();

  // 5. Fetch entity data
  const entity = await entityClient.getEntity({ slug: schema, id: entityId });

  // 6. Fetch external CRM data (your API)
  const externalData = await fetchExternalCRM(entity.data.email);

  // 7. Render UI
  renderCRMWidget(externalData);

  // 8. Update content height
  const observer = new ResizeObserver((entries) => {
    updateContentHeight(entries[0].contentRect.height);
  });
  observer.observe(document.getElementById('app')!);
}

function renderCRMWidget(data: ExternalCRMData) {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <div class="crm-widget">
      <div class="score">Score: ${data.score}</div>
      <div class="last-contact">Last Contact: ${data.lastContact}</div>
      <div class="notes">
        ${data.notes.map(note => `<p>${note}</p>`).join('')}
      </div>
    </div>
  `;
}

async function fetchExternalCRM(email: string): Promise<ExternalCRMData> {
  const response = await fetch(`https://api.mycrm.com/lookup?email=${email}`);
  return response.json();
}

main().catch(console.error);
```

### Entity Tab with Visibility Handling

An app that displays a dashboard, refreshing data when the tab becomes visible:

```typescript title="Entity Tab - Dashboard with visibility handling"
import {
  initialize,
  getEntityContext,
  onVisibilityChange,
  updateContentHeight,
} from '@epilot/app-bridge';

async function main() {
  const { token, lang } = await initialize();
  const { entityId, schema, isVisible } = await getEntityContext();

  // Initial setup
  await setupDashboard(entityId, schema);

  // Load data if tab is already visible
  if (isVisible) {
    await loadDashboardData(entityId);
  }

  // Refresh data when tab becomes visible
  onVisibilityChange(async (visible) => {
    if (visible) {
      await loadDashboardData(entityId);
    }
  });

  // Update height
  updateContentHeight(document.body.scrollHeight);
}

async function setupDashboard(entityId: string, schema: string) {
  // Initialize dashboard UI
}

async function loadDashboardData(entityId: string) {
  // Fetch and render dashboard data
}

main().catch(console.error);
```

### Automation Action Configuration

A complete configuration UI for a webhook action:

```typescript title="Flow Action Config - Webhook configuration UI"
import {
  initialize,
  getActionConfig,
  updateActionConfig,
  updateContentHeight,
} from '@epilot/app-bridge';

interface WebhookActionConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  headers: Record<string, string>;
  retryCount: number;
}

async function main() {
  await initialize();

  // Get existing configuration
  const { custom_action_config } = await getActionConfig<WebhookActionConfig>();
  const config = custom_action_config ?? {
    url: '',
    method: 'POST',
    headers: {},
    retryCount: 3,
  };

  // Render configuration form
  renderForm(config);
  updateContentHeight(document.body.scrollHeight);
}

function renderForm(config: WebhookActionConfig) {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <form id="config-form">
      <div class="field">
        <label>Webhook URL</label>
        <input type="url" id="url" value="${config.url}" required />
      </div>
      <div class="field">
        <label>HTTP Method</label>
        <select id="method">
          <option value="GET" ${config.method === 'GET' ? 'selected' : ''}>GET</option>
          <option value="POST" ${config.method === 'POST' ? 'selected' : ''}>POST</option>
          <option value="PUT" ${config.method === 'PUT' ? 'selected' : ''}>PUT</option>
        </select>
      </div>
      <div class="field">
        <label>Retry Count</label>
        <input type="number" id="retryCount" value="${config.retryCount}" min="0" max="10" />
      </div>
    </form>
  `;

  // Listen for changes
  const form = document.getElementById('config-form')!;
  form.addEventListener('change', () => {
    const newConfig: WebhookActionConfig = {
      url: (document.getElementById('url') as HTMLInputElement).value,
      method: (document.getElementById('method') as HTMLSelectElement).value as 'GET' | 'POST' | 'PUT',
      headers: config.headers,
      retryCount: parseInt((document.getElementById('retryCount') as HTMLInputElement).value),
    };
    updateActionConfig(newConfig);
  });
}

main().catch(console.error);
```

### Custom Page App

A complete example of a custom page app with sub-page navigation:

```typescript title="Custom Page - Multi-page app with navigation"
import {
  initialize,
  getPageContext,
  navigate,
  onLocationChange,
  updateContentHeight,
  authorizeClient,
} from '@epilot/app-bridge';
import { getClient } from '@epilot/entity-client';

type Route = '/' | '/dashboard' | '/settings';

async function main() {
  // 1. Initialize app bridge
  const { token, lang } = await initialize();

  // 2. Set up API client
  const entityClient = getClient();
  authorizeClient(entityClient, token);

  // 3. Get page context
  const { slug, subPath } = await getPageContext();

  // 4. Render initial page
  renderPage(subPath as Route);

  // 5. Handle browser back/forward
  onLocationChange((newSubPath) => {
    renderPage(newSubPath as Route);
  });

  // 6. Set up internal navigation
  setupNavigation();
}

function setupNavigation() {
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.getAttribute('data-route') as Route;
      navigate(route);
      renderPage(route);
    }
  });
}

function renderPage(route: Route) {
  const app = document.getElementById('app')!;

  const nav = `
    <nav>
      <a data-route="/" ${route === '/' ? 'class="active"' : ''}>Home</a>
      <a data-route="/dashboard" ${route === '/dashboard' ? 'class="active"' : ''}>Dashboard</a>
      <a data-route="/settings" ${route === '/settings' ? 'class="active"' : ''}>Settings</a>
    </nav>
  `;

  switch (route) {
    case '/dashboard':
      app.innerHTML = nav + '<h1>Dashboard</h1><p>Your data here</p>';
      break;
    case '/settings':
      app.innerHTML = nav + '<h1>Settings</h1><p>Configuration options</p>';
      break;
    default:
      app.innerHTML = nav + '<h1>Welcome</h1><p>Choose a section above</p>';
  }

  updateContentHeight(document.body.scrollHeight);
}

main().catch(console.error);
```

:::tip Sample App
For a complete, production-ready example of a Custom Page app, see the **Energy Spot Price Explorer** sample:

[github.com/epilot-dev/epilot-app-sample-energy-prices](https://github.com/epilot-dev/epilot-app-sample-energy-prices)
:::

---

## API Reference

### Session Management

| Function | Returns | Description |
|----------|---------|-------------|
| `initialize(options?)` | `Promise<AppBridgeSession>` | Initialize the app bridge and establish the postMessage channel with the parent epilot app. Returns session data with an OAuth token and the user's language. Safe to call multiple times - subsequent calls return the cached session. |
| `getSession()` | `AppBridgeSession` | Get the cached session synchronously. Throws `AppBridgeNotInitializedError` if called before `initialize()`. |
| `isInitialized()` | `boolean` | Check whether the app bridge has been initialized. |

**InitOptions:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentHeight` | `number` | `document.body.scrollHeight` | Initial iframe height in pixels to report to the parent |
| `timeout` | `number` | `5000` | Timeout in milliseconds for the initialization handshake |

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
const unsubscribe = epilot.subscribeToParentMessages('my-event', (data) => {
  console.log('Received:', data);
});
```

| Function | Returns | Description |
|----------|---------|-------------|
| `epilot.sendMessageToParent(event, detail?)` | `void` | Send a raw postMessage to the parent window |
| `epilot.subscribeToParentMessages(event, handler)` | `Unsubscribe` | Subscribe to raw postMessage events from the parent. Supports wildcard matching with `*`. |

### Types

```typescript
import type {
  // Session
  AppBridgeSession,    // { token: string; lang: string }
  InitOptions,         // { contentHeight?: number; timeout?: number }
  RequestOptions,      // { timeout?: number }

  // Entity Surface
  EntityContext,       // { entityId: string; schema: string; capability?: EntityCapability; isVisible?: boolean }
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