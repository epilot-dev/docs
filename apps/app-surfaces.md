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
- **Context** - Entity or action configuration data
- **Messaging** - Two-way communication with the parent app

```bash
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

---

## Getting Started with App Bridge

### Basic Initialization

Every app must initialize the bridge to establish communication with epilot:

```typescript
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

```typescript
const session = await initialize({
  contentHeight: 400,    // Initial iframe height in pixels
  timeout: 5000,         // Timeout in milliseconds (default: 5000)
});
```

---

## Entity Surface Implementation

For both Entity Capability and Entity Tab surfaces, use the entity-related APIs.

### Getting Entity Context

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
updateActionConfig(
  { url: 'https://api.example.com/webhook' },
  { waitForCallback: true }
);
```

When `waitForCallback` is true, the automation engine will wait for your action to signal completion before proceeding to the next step.

---

## Authorizing API Clients

The app-bridge provides a convenient way to authorize epilot SDK clients:

```typescript
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

```typescript
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

```typescript
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

```typescript
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

---

## API Reference

### Session Management

| Function | Description |
|----------|-------------|
| `initialize(options?)` | Initialize app bridge and get auth token |
| `getSession()` | Get cached session (throws if not initialized) |
| `isInitialized()` | Check if app bridge is initialized |

### Entity Surface API

| Function | Description |
|----------|-------------|
| `getEntityContext(options?)` | Get entity ID, schema, and capability info |
| `updateContentHeight(height)` | Update iframe height |
| `onVisibilityChange(handler)` | Subscribe to tab visibility changes |

### Action Config API

| Function | Description |
|----------|-------------|
| `getActionConfig<T>(options?)` | Get action configuration |
| `updateActionConfig<T>(config, options?)` | Update action configuration |

### Generic Event API

| Function | Description |
|----------|-------------|
| `on<T>(event, handler)` | Subscribe to events (supports wildcards) |
| `send(event, data?)` | Send custom messages |

### Utilities

| Function | Description |
|----------|-------------|
| `authorizeClient(client, session)` | Authorize epilot SDK clients |

### Types

```typescript
import type {
  AppBridgeSession,    // { token: string; lang: string }
  EntityContext,       // { entityId, schema, capability, isVisible }
  EntityCapability,    // { name?, app_id?, ... }
  ActionConfig<T>,     // { custom_action_config?, description?, app_id? }
  InitOptions,         // { contentHeight?, timeout? }
  UpdateConfigOptions, // { waitForCallback? }
} from '@epilot/app-bridge';
```

### Error Types

```typescript
import {
  AppBridgeError,              // Base error class
  AppBridgeTimeoutError,       // Request timeout
  AppBridgeNotInitializedError // Not initialized
} from '@epilot/app-bridge';
```

---

## Best Practices

1. **Always initialize first** - Call `initialize()` before any other app-bridge functions
2. **Handle errors gracefully** - Wrap initialization in try-catch and show user-friendly errors
3. **Update content height** - Always report your content height, especially after rendering
4. **Use ResizeObserver** - For dynamic content, observe size changes automatically
5. **Handle visibility** - For tabs, pause expensive operations when not visible
6. **Type your configs** - Use TypeScript generics for type-safe configuration
7. **Clean up subscriptions** - Call unsubscribe functions when your app unmounts
