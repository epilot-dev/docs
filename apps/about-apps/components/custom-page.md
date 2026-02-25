---
title: Custom Page
hide_title: true
sidebar_position: 6
---

# Custom Page

Add full, standalone pages to the epilot 360 portal with your own routes, navigation items, and sub-page support.

## What Are Custom Pages?

Custom Pages allow your app to register entirely new routes within the epilot 360 portal. Unlike other component types that embed within existing views, Custom Pages give your app a dedicated full-page surface with the standard 360 layout (sidebar navigation + topbar). Users access your pages via navigation items that appear automatically in the **Custom** workplace.

## Why Use Custom Pages?

Custom Pages are ideal when your app needs more than a widget or sidebar section:

- **Full-page experiences** - Dashboards, data explorers, configuration panels, or any UI that needs the full viewport
- **Multi-page apps** - Support sub-pages and deep-linking (e.g., `/app/energy-prices/dashboard`, `/app/energy-prices/settings`)
- **Native feel** - Pages use the standard 360 layout and appear in the sidebar navigation alongside built-in features
- **Browser navigation** - Full support for back/forward buttons and URL sharing via deep-linking

## How It Works

1. You register a `CUSTOM_PAGE` component in your app manifest with a unique **slug** and navigation metadata
2. When a user installs your app, the page appears as a navigation item in the **Custom** workplace
3. Visiting the page loads your app in an iframe at `/app/<slug>`
4. Your app communicates with the 360 portal via the `@epilot/app-bridge` library

## Creating a Custom Page Component

### Component Configuration

Add a `CUSTOM_PAGE` component to your app manifest:

```json
{
  "type": "CUSTOM_PAGE",
  "slug": "energy-prices",
  "config": {
    "nav_label": "Energy Prices",
    "nav_icon": "lightning",
    "nav_description": "View German energy spot prices and grid data",
    "source": {
      "url": "https://your-app.example.com/page"
    }
  }
}
```

### Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL slug for the page route. Must be lowercase alphanumeric with hyphens, 2+ characters. Must not conflict with built-in routes. |
| `config.nav_label` | string | Yes | Label shown in the sidebar navigation |
| `config.nav_icon` | string | No | Icon name for the navigation item |
| `config.nav_description` | string | No | Short description shown in the navigation tooltip |
| `config.source.url` | string | Yes | URL of your app's page UI |

### Slug Rules

- Must match the pattern: `^[a-z0-9][a-z0-9-]*[a-z0-9]$` (at least 2 characters)
- Must not conflict with reserved built-in route segments (e.g., `entity`, `portal`, `automation`, etc.)
- Must be unique across all installed apps in an organization

### Multiple Pages Per App

A single app can register multiple `CUSTOM_PAGE` components, each with a different slug:

```json
{
  "components": [
    {
      "type": "CUSTOM_PAGE",
      "slug": "energy-dashboard",
      "config": {
        "nav_label": "Energy Dashboard",
        "source": { "url": "https://your-app.example.com/dashboard" }
      }
    },
    {
      "type": "CUSTOM_PAGE",
      "slug": "energy-settings",
      "config": {
        "nav_label": "Energy Settings",
        "source": { "url": "https://your-app.example.com/settings" }
      }
    }
  ]
}
```

## Implementing Your Page

### Basic Setup

```typescript
import { initialize, getPageContext, updateContentHeight } from '@epilot/app-bridge';

async function main() {
  // 1. Initialize the app bridge
  const { token, lang } = await initialize();

  // 2. Get the page context
  const { slug, subPath, path } = await getPageContext();

  console.log('Page slug:', slug);       // e.g., "energy-prices"
  console.log('Sub-path:', subPath);      // e.g., "/dashboard"
  console.log('Full path:', path);        // e.g., "/app/energy-prices/dashboard"

  // 3. Render your page based on the sub-path
  renderPage(subPath);

  // 4. Report content height
  updateContentHeight(document.body.scrollHeight);
}

main().catch(console.error);
```

### Sub-Page Navigation

Use `navigate()` to change the URL when users interact with your app's internal navigation. This updates the browser URL bar, enabling deep-linking and browser history.

```typescript
import { navigate } from '@epilot/app-bridge';

// Navigate to a sub-page
navigate('/dashboard');         // URL becomes /app/energy-prices/dashboard
navigate('/settings/advanced'); // URL becomes /app/energy-prices/settings/advanced
navigate('/');                  // URL becomes /app/energy-prices
```

### Handling Browser Back/Forward

When the user clicks the browser's back or forward button, the parent frame notifies your app via `onLocationChange`:

```typescript
import { onLocationChange, getPageContext } from '@epilot/app-bridge';

// Subscribe to browser navigation events
const unsubscribe = onLocationChange((subPath) => {
  console.log('Browser navigated to:', subPath);
  renderPage(subPath);
});

// Clean up when your app unmounts
// unsubscribe();
```

### Complete Example with Router

```typescript
import {
  initialize,
  getPageContext,
  navigate,
  onLocationChange,
  updateContentHeight,
} from '@epilot/app-bridge';

type Route = '/' | '/dashboard' | '/settings';

async function main() {
  const { token, lang } = await initialize();
  const { slug, subPath } = await getPageContext();

  // Initial render
  renderPage(subPath as Route);

  // Handle browser back/forward
  onLocationChange((newSubPath) => {
    renderPage(newSubPath as Route);
  });

  // Set up internal navigation
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLElement).dataset.nav as Route;
      navigate(target);
      renderPage(target);
    });
  });
}

function renderPage(route: Route) {
  const app = document.getElementById('app')!;

  switch (route) {
    case '/dashboard':
      app.innerHTML = '<h1>Dashboard</h1>';
      break;
    case '/settings':
      app.innerHTML = '<h1>Settings</h1>';
      break;
    default:
      app.innerHTML = '<h1>Home</h1>';
  }

  updateContentHeight(document.body.scrollHeight);
}

main().catch(console.error);
```

## Permissions

Custom Pages inherit permissions from the app's configured grants. Users can only access your page if they have the app installed and the appropriate permissions. See [Configure Permissions](/apps/about-apps/configure-permissions) for details.

## Sample App

For a complete working example, see the **Energy Spot Price Explorer** sample app:

[github.com/epilot-dev/epilot-app-sample-energy-prices](https://github.com/epilot-dev/epilot-app-sample-energy-prices)

This sample app demonstrates:
- Registering a `CUSTOM_PAGE` component with navigation metadata
- Using `getPageContext()` to read the current page context
- Sub-page navigation with `navigate()` and `onLocationChange()`
- Fetching and displaying data from a public API (German energy market data via SMARD)
- Responsive charting and data visualization
