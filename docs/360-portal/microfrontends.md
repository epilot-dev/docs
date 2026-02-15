---
sidebar_position: 2
---

# Microfrontends

:::info

The epilot 360 portal consists of multiple frontend microservices orchestrated by [single-spa](https://single-spa.js.org/).

:::

epilot 360 is built as a microfrontend architecture, where each capability (entities, messaging, workflows, etc.) is an independently deployable frontend module. This allows teams to develop and ship features in parallel without affecting other parts of the application.

## @epilot360/root-config

The root project that defines the microfrontend layout and import maps. Each import map entry references the correct bundle for a microfrontend application. This project also contains the centralized localization files.

## Layout

The basic layout consists of three shell microfrontends:

- **@epilot360/login** -- Login overlay; manages user login state for the entire application
- **@epilot360/topbar** -- Top bar menus, global search, notifications
- **@epilot360/navigation** -- Main left sidebar navigation

Feature modules (e.g., entity management, messaging, automation) are loaded on demand as the user navigates through the application.
