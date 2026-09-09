---
title: Overview
hide_title: true
slug: /apps
sidebar_label: Overview
description: 'Build Apps that extend epilot — custom UI in entity pages, journeys and portals, plus server-side functions for flows.'
---

import DocCards from '@site/src/components/DocCards';

# Build Apps for epilot

epilot is the Energy XRM that Apps extend. Add custom UI to entity pages, journeys, and portals, run your own code inside flows, and connect external systems — then install your App privately or publish it to the epilot Marketplace.

## Get started

<DocCards
  columns={2}
  variant="feature"
  items={[
    {
      title: 'Quick start',
      art: 'quickstart',
      description: 'Scaffold an App with the epilot CLI, add a component, and deploy it to your organization in minutes.',
      href: '/docs/apps/getting-started/quick-start',
    },
    {
      title: 'Developer sandbox',
      art: 'sandbox',
      description: 'Request an isolated sandbox organization to build and test without touching production data.',
      href: '/docs/apps/getting-started/developer-sandbox',
    },
  ]}
/>

```bash
npx epilot app init my-app
cd my-app
epilot app add-component my-block --type CUSTOM_JOURNEY_BLOCK
epilot app deploy
```

## Set up your development environment

<DocCards
  items={[
    {
      title: 'App CLI',
      icon: 'terminal',
      description: 'Scaffold components and functions, validate the manifest, and deploy — all from the command line.',
      href: '/docs/apps/cli',
    },
    {
      title: 'Development mode',
      icon: 'dev',
      description: 'Point epilot at your local dev server and see component changes live without redeploying.',
      href: '/docs/apps/development-mode',
    },
    {
      title: 'Agent Toolkit',
      icon: 'agent',
      description: 'Give Claude, Codex, or ChatGPT epilot skills and MCP access so they can build Apps with you.',
      href: '/agent-toolkit',
      badge: 'Preview',
    },
  ]}
/>

## Build across every surface

Components are the building blocks of an App. Each type plugs into a specific part of the platform.

<DocCards
  items={[
    {
      title: 'Journey blocks',
      icon: 'journey',
      description: 'Web components that appear in the Journey Builder palette to collect data, calculate, or visualize.',
      href: '/docs/apps/components/custom-journey-block',
    },
    {
      title: 'Custom pages',
      icon: 'page',
      description: 'Full pages inside epilot 360 with their own navigation, powered by your frontend.',
      href: '/docs/apps/components/custom-page',
    },
    {
      title: 'Entity capabilities & tabs',
      icon: 'entity',
      description: 'Embed your UI into contact, contract, or opportunity pages and react to entity context.',
      href: '/docs/apps/app-surfaces',
    },
    {
      title: 'Portal extensions',
      icon: 'portal',
      description: 'Add widgets and sections to customer and installer portals.',
      href: '/docs/apps/components/portal-extension',
    },
    {
      title: 'Flow actions',
      icon: 'flow',
      description: 'Add your own task type to flows — call an external endpoint or run a workflow function.',
      href: '/docs/apps/components/custom-action',
    },
    {
      title: 'External product catalog',
      icon: 'catalog',
      description: 'Serve products and prices from a third-party system directly into epilot.',
      href: '/docs/apps/components/external-product-catalog',
    },
  ]}
/>

## Connect data and customize backend logic

<DocCards
  items={[
    {
      title: 'App manifest',
      icon: 'manifest',
      description: 'The declarative source of truth for metadata, components, functions, permissions, and options.',
      href: '/docs/apps/app-manifest',
    },
    {
      title: 'Functions',
      icon: 'fn',
      description: 'Server-side TypeScript that runs inside flows or on a schedule, deployed with your App.',
      href: '/docs/apps/functions/overview',
    },
    {
      title: 'API proxy',
      icon: 'proxy',
      description: 'Call external APIs server-side with bearer tokens or OAuth 2.0 without exposing credentials.',
      href: '/docs/apps/components/api-proxy',
    },
    {
      title: 'App Bridge',
      icon: 'bridge',
      description: 'Read entity context, resize your iframe, navigate, and authorize API clients from inside a surface.',
      href: '/docs/apps/app-surfaces#getting-started-with-app-bridge',
    },
    {
      title: 'Permissions',
      icon: 'shield',
      description: 'Declare the roles your App needs and check them at runtime.',
      href: '/docs/apps/configure-permissions',
    },
    {
      title: 'App options',
      icon: 'settings',
      description: 'Let installing organizations configure your App with sensitive and non-sensitive settings.',
      href: '/docs/apps/app-options',
    },
  ]}
/>

## Ship with quality

<DocCards
  items={[
    {
      title: 'Private vs. public Apps',
      icon: 'lock',
      description: 'Decide whether your App stays in your organizations or goes to the Marketplace.',
      href: '/docs/apps/getting-started/private-vs-public',
    },
    {
      title: 'Versioning',
      icon: 'version',
      description: 'Published versions are immutable. Learn how new versions are created and cloned.',
      href: '/docs/apps/versioning',
    },
    {
      title: 'Verification process',
      icon: 'check',
      description: 'What the epilot review checks before your App is listed on the Marketplace.',
      href: '/docs/apps/publishing/verification-process',
    },
    {
      title: 'Publishing requirements',
      icon: 'list',
      description: 'The checklist your App must meet to be published.',
      href: '/docs/apps/publishing/requirements',
    },
    {
      title: 'Build a custom journey block',
      icon: 'guide',
      description: 'A hands-on guide from empty folder to a journey block running in a live journey.',
      href: '/docs/apps/how-to-guides/build-a-custom-jb',
    },
    {
      title: 'REST API reference',
      icon: 'api',
      description: 'OpenAPI specs for every epilot service your App can call.',
      href: '/api',
    },
  ]}
/>
