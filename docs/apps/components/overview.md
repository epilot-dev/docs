---
title: Overview
hide_title: true
sidebar_position: 1
---

<p>&nbsp;</p>

# What Are Components?

## The Foundation of epilot Apps

Components are the fundamental building blocks that make up every app in the epilot ecosystem. Think of them as specialized modules that extend epilot's functionality in specific, targeted ways. Each component type is designed to integrate with a particular part of the platform, enabling seamless extensions that feel native to users.

When you build an app for epilot, you're essentially creating one or more components that work together to deliver value. A single app might contain multiple components of different types, each addressing a specific use case or integration point.

## Why Components Matter

This modular approach offers several key advantages:

- **Targeted Integration**: Components connect precisely where they're needed in the epilot platform
- **Flexible Combinations**: Mix different component types to create comprehensive solutions
- **Focused Development**: Build only what you need without unnecessary complexity
- **Consistent Experience**: Users benefit from a unified interface regardless of the app source

## Available Component Types

epilot currently supports these component types:

### [Custom Journey Blocks](/docs/apps/components/custom-journey-block)

These web components integrate directly into epilot's Journey Builder, allowing you to create specialized elements for data collection, visualization, or process automation. Journey Blocks appear in the Journey Builder palette and can be placed anywhere in a customer journey flow.

```
Use cases: Data collection forms, calculators, visualizations, third-party integrations
```

### [Portal Extensions](/docs/apps/components/portal-extension)

Portal Extensions enhance epilot's customer and installer portals with new sections, tools, or visualizations. They can be added to dashboards or specific sections to extend the portal's functionality with custom features.

```
Use cases: Custom dashboard widgets, specialized tools, data visualizations
```

### [External Product Catalog](/docs/apps/components/external-product-catalog)

External Product Catalog components integrate third-party product catalogs into epilot. They enable Product Blocks to fetch and display products and pricing from external systems, allowing customers to browse and select items from external catalogs directly within their journey experience.

```
Use cases: Custom product catalogs, journey products, journey product recommendations
```

### [Custom Workflow Task](/docs/apps/components/custom-action)

Custom Workflow Tasks extend epilot's automation engine with your own logic. You can either call an external endpoint (webhook-style) or run TypeScript code in a sandboxed environment directly within a workflow task.

```
Use cases: Third-party integrations, data syncing, custom processing steps in workflows
```

### [API Proxy](/docs/apps/components/api-proxy)

API Proxy components let your app call external APIs without exposing credentials to the browser. The proxy runs server-side, injecting authentication and signing requests so secrets never reach the client.

```
Use cases: Secure external API calls, OAuth integrations, credential-protected endpoints
```

## On the Horizon

The epilot platform continues to evolve, with new component types planned for future releases:

### Custom Journey Design Elements

Extensions to the Journey Builder's design capabilities, including:
- **Email Plugins**: For customizing and enhancing email templates and functionality

## Requesting New Component Types

Have an idea for a new component type? We welcome feedback from the developer community.

1. **Evaluate Your Need**: Consider if existing component types could address your use case
2. **Define the Integration Point**: Identify where in epilot your component would integrate
3. **Describe the Value**: Outline the problems it would solve for epilot users
4. **Submit a Request**: [Contact us](mailto:support@epilot.cloud) with your proposal

Our product team regularly reviews component requests and prioritizes them based on community interest and platform direction.

## App Surfaces & Communication

When your component runs inside epilot, it's embedded in an iframe and communicates with the parent application through the `@epilot/app-bridge` library. Different component types are displayed on different "surfaces" within epilot.

Learn more about [App Surfaces](/docs/apps/app-surfaces) to understand how your app communicates with epilot and receives authentication, entity context, and configuration data.

## Building Your First Component

Ready to create your own component? The fastest way to get started is with the **epilot CLI**:

```bash
npx epilot app init my-app
npx epilot app add-component my-block --type CUSTOM_JOURNEY_BLOCK
```

The CLI manages the full app lifecycle — from scaffolding and validation to deployment and version management. Key commands:

| Command | Description |
| --- | --- |
| `epilot app init` | Scaffold a new app project with `manifest.json` |
| `epilot app add-component` | Add a component from a starter template |
| `epilot app validate` | Validate your manifest before deploying |
| `epilot app deploy` | Deploy your app to epilot |
| `epilot app versions` | List all versions of your app |
| `epilot app review` | Submit a version for public review |
| `epilot app export` | Export an existing app as `manifest.json` |

See the [CLI documentation](/docs/cli/commands/app) for the full command reference.

Each component type also has a ready-to-use starter template available in the [app-templates](https://github.com/epilot-dev/app-templates) repository.

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Journey Blocks</h3>
          <p>Create interactive elements for epilot's Journey Builder</p>
          <a href="/docs/apps/components/custom-journey-block" className="button button--secondary button--block">Start Building</a>
        </div>
      </div>
    </div>
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Portal Extensions</h3>
          <p>Extend epilot's portals with custom functionality</p>
          <a href="/docs/apps/components/portal-extension" className="button button--secondary button--block">Start Building</a>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{marginTop: '1.5rem'}}>
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>External Product Catalog</h3>
          <p>Integrate third-party product catalogs into epilot</p>
          <a href="/docs/apps/components/external-product-catalog" className="button button--secondary button--block">Start Building</a>
        </div>
      </div>
    </div>
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Custom Workflow Task</h3>
          <p>Run custom logic in epilot's automation workflows</p>
          <a href="/docs/apps/components/custom-action" className="button button--secondary button--block">Start Building</a>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{marginTop: '1.5rem'}}>
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>API Proxy</h3>
          <p>Call external APIs securely without exposing credentials</p>
          <a href="/docs/apps/components/api-proxy" className="button button--secondary button--block">Start Building</a>
        </div>
      </div>
    </div>
  </div>
</div>

By understanding how components work and which types are available, you can create powerful extensions that enhance the epilot platform while maintaining a seamless user experience.