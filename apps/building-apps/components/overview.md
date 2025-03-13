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

### [Custom Journey Blocks](/apps/components/custom-journey-block)

These web components integrate directly into epilot's Journey Builder, allowing you to create specialized elements for data collection, visualization, or process automation. Journey Blocks appear in the Journey Builder palette and can be placed anywhere in a customer journey flow.

```
Use cases: Data collection forms, calculators, visualizations, third-party integrations
```

### [Portal Extensions](/apps/components/portal-extension)

Portal Extensions enhance epilot's customer and installer portals with new sections, tools, or visualizations. They can be added to dashboards or specific sections to extend the portal's functionality with custom features.

```
Use cases: Custom dashboard widgets, specialized tools, data visualizations
```

## On the Horizon

The epilot platform continues to evolve, with new component types planned for future releases:

### Custom Automation Tasks

These will allow you to define specialized tasks that can be triggered within epilot's automation workflows, enabling custom processing or integration steps in automated sequences.

### Custom Journey Design Elements

Extensions to the Journey Builder's design capabilities, including:
- **Email Plugins**: For customizing and enhancing email templates and functionality

## Requesting New Component Types

Have an idea for a new component type that would enhance the epilot platform? We'd love to hear about it!

1. **Evaluate Your Need**: Consider if existing component types could address your use case
2. **Define the Integration Point**: Identify where in epilot your component would integrate
3. **Describe the Value**: Outline the problems it would solve for epilot users
4. **Submit a Request**: Contact us with your proposal

Our product team regularly reviews component requests and prioritizes them based on community interest and strategic alignment.

## Building Your First Component

Ready to create your own component? Each component type has specific requirements and capabilities, but they all follow similar development patterns.

<div className="container">
  <div className="row">
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Journey Blocks</h3>
          <p>Create interactive elements for epilot's Journey Builder</p>
          <a href="/apps/components/custom-journey-block" className="button button--primary button--block">Start Building</a>
        </div>
      </div>
    </div>
    <div className="col col--6">
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <h3>Portal Extensions</h3>
          <p>Extend epilot's portals with custom functionality</p>
          <a href="/apps/components/portal-extension" className="button button--primary button--block">Start Building</a>
        </div>
      </div>
    </div>
  </div>
</div>

By understanding how components work and which types are available, you can create powerful extensions that enhance the epilot platform while maintaining a seamless user experience.