---
title: Component Library
sidebar_position: 1
---

# Component Library

**Volt UI** is the design system for epilot 360 — a tree-shakeable React component library built on [Radix UI](https://www.radix-ui.com/) primitives with [Tailwind CSS](https://tailwindcss.com/) for styling.

:::info
Volt UI is currently an internal library and not yet publicly available. This page documents the design direction for epilot 360's UI layer.
:::

## Overview

Volt UI provides the foundational components for the epilot 360 admin application. All CSS classes and design tokens are prefixed with `volt-` to avoid conflicts with application styles.

| | Details |
|---|---|
| **Framework** | React |
| **Primitives** | Radix UI |
| **Styling** | Tailwind CSS |
| **Prefix** | `volt-` |

Volt UI provides a component API reference, theming guide, and usage examples.

---

## Customer-Facing Styling

For styling **Journeys** (customer-facing forms), epilot uses [**Concorde**](https://github.com/epilot-dev/concorde-elements) — an open-source design system with CSS custom properties (`--concorde-*`). See:

- [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) — Full list of theming variables
- [Concorde HTML Structure](/docs/ui-design/concorde-html-structure) — DOM structure reference
- [Design Builder](/docs/journeys/design-builder) — Visual theming tool
- [Custom CSS](/docs/journeys/custom-css) — Advanced journey styling
