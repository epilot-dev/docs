---
title: Overview
hide_title: true
slug: /
sidebar_position: 1
description: "Welcome to the epilot Developer Platform documentation!"
---

<p>&nbsp;</p>

<p align="center"><a href="/"><img src="/img/logo.png" width="150" /></a></p>

<h1 align="center">Building Apps for epilot</h1>

<p align="center">Build, publish, and monetize integrations that extend the epilot platform — the operating system for energy and utility companies across Europe.</p>

## What Are Apps?

Apps are modular extensions that enhance the epilot platform's core functionality. Developers build apps to add custom journey blocks, portal extensions, automation actions, and third-party integrations — then publish them to the epilot Marketplace where energy and utility companies can discover and install them.

Each app is a self-contained package that can be versioned, configured, and updated independently. Apps follow a standardized development and publication workflow, making it straightforward for external partners and developers to extend the platform in consistent, maintainable ways.

## App Components on epilot

Apps on epilot consist of modular components that extend platform functionality in specific ways. Each component type addresses different integration needs and can be combined within a single app to create comprehensive solutions.

See the [App Components](/apps/about-apps/components/overview) section for detailed information on each component type, and [App Surfaces](/apps/app-surfaces) to learn how your app communicates with the epilot platform using the `@epilot/app-bridge` library.

### Current Component Types

**Custom Journey Blocks**: Web components that integrate into Journey Builder to collect data, perform calculations, or display interactive elements.

**Portal Extensions**: Components that enhance epilot's customer and installer portals with additional functionality and visualizations.

**External Product Catalog**: Components that integrate third-party product catalogs into epilot.

### Coming Soon

:::note
These component types are planned for future releases and are not yet available.
:::

- **Custom Automation Tasks**: Define custom tasks that plug into epilot's automation workflows.
- **Custom Journey Design**: Create custom designs for customer journeys, including layouts, styles, and interactive elements.
- **Email Plugins**: Extend and customize email templates and functionality.

## Why Build on epilot?

### Industry-Specific Platform
Build solutions for the energy and utility industry with access to domain-specific data models, entity schemas, and workflows purpose-built for this sector.

### API-First Architecture
A comprehensive [API suite](https://docs.epilot.io/api) gives you access to the full capabilities of the epilot platform, so you can build deeply integrated solutions with minimal friction.

### Growing Marketplace
Reach hundreds of energy companies across Europe through the epilot Marketplace:

- Distribute your integrations to epilot's customer base
- Monetize through our partner program
- Collaborate with industry experts building for the energy transition

### Enterprise-Ready Infrastructure
Your apps run on the same robust infrastructure that powers epilot:

- Secure OAuth-based authentication and authorization
- Scalable cloud architecture on AWS
- Compliant with European data regulations (GDPR)

### Join the Team
Passionate about building developer platforms for the energy transition? [We're hiring](https://www.epilot.cloud/en/company/careers).

## Get Started

Ready to build your first app?

<a className="button button--secondary" href="/apps/getting-started/quick-start">Quick Start Guide</a>&nbsp;&nbsp;<a className="button button--secondary" href="/apps/getting-started/developer-sandbox">Get a Developer Sandbox</a>
