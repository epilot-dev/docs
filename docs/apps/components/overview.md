---
title: Overview
hide_title: true
sidebar_position: 1
description: "Components are the building blocks of every epilot App. Each component type extends a specific part of the platform, such as entity pages, journeys, portals or flows."
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

### [Custom Pages](/docs/apps/components/custom-page)

Custom Pages add a full page of your own to epilot 360, with its own entry in the navigation and its own route. Use them for interfaces that are not tied to a single entity.

```
Use cases: Dashboards, admin tools, overviews that span several entities
```

### [Entity Capabilities](/docs/apps/components/entity-capability)

Entity Capabilities embed your interface on entity pages: as a tab, as a group inside the entity's detail view, or as a widget. The interface runs in an iframe and talks to epilot through the App Bridge.

```
Use cases: Showing data from an external system next to a contact, contract or order
```

### [Custom Portal Blocks](/docs/apps/components/custom-portal-block)

Custom Portal Blocks are blocks of your own that portal builders can place on pages of the customer and installer portals and configure per placement.

```
Use cases: Custom widgets and visualizations inside a portal page
```

### [Portal Extensions](/docs/apps/components/portal-extension)

Portal Extensions connect epilot's customer and installer portals to your systems through configurable hooks: they call your API at defined points, for example to check a registration, identify a contract or load consumption data. They are configuration only and have no interface of their own.

```
Use cases: Registration checks, contract identification, consumption and cost data, seamless links to external systems
```

### [External Product Catalog](/docs/apps/components/external-product-catalog)

External Product Catalog components integrate third-party product catalogs into epilot. They enable Product Blocks to fetch and display products and pricing from external systems, allowing customers to browse and select items from external catalogs directly within their journey experience.

```
Use cases: Custom product catalogs, journey products, journey product recommendations
```

### [Custom Workflow Action](/docs/apps/components/custom-action)

Custom Workflow Actions extend epilot's automation engine with your own logic. You can either call an external endpoint (webhook-style) or run TypeScript code in a sandboxed environment directly within a workflow task.

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

Components with an interface inside epilot 360 — entity capabilities, custom pages and the configuration interface of a workflow action — are embedded in an iframe and communicate with the parent application through the `@epilot/app-bridge` library. Each of these places is called a "surface".

Journey blocks work differently: their bundle is loaded into the journey as a web component and receives its data as element properties. Portal extensions, external product catalogs and API proxies are configuration only and have no interface.

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
          <h3>Custom Workflow Action</h3>
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