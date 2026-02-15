---
sidebar_position: 2
title: Design Builder
---

# Design Builder

The Design Builder is the visual theming tool in epilot for customizing the look and feel of your customer-facing [journeys](/docs/journeys/journey-builder). It lets you configure brand colors, typography, logos, and other design tokens — all without writing code. For more advanced styling, you can also write [Custom CSS](/docs/journeys/custom-css) directly within the Design Builder.

## Overview

Every journey in epilot uses a **theme** that controls its visual appearance. The Design Builder provides a sidebar interface where you can adjust theme settings and immediately preview the result on a live journey. Themes are stored independently from journeys, so a single theme can be applied across multiple journeys to keep your brand consistent.

The Design Builder works with epilot's **Concorde** design system — a lightweight, performance-optimized component library that replaces the legacy Material UI–based styling. Journeys using the new Concorde design benefit from faster load times and full support for design tokens and Custom CSS.

:::tip
If your journey still uses the legacy design, you can switch to the new Concorde design by enabling the **New Design** toggle in the Design Builder. We recommend migrating all journeys to the new design for the best theming experience.
:::

## Design Tokens

Design tokens are the foundational variables that control the visual properties of every component in a journey. When you change a token in the Design Builder, the change propagates to all components that reference it.

### Colors

| Token | Description |
|-------|-------------|
| **Primary color** | Main brand color used for buttons, links, active states, and interactive elements |
| **Secondary color** | Accent color for secondary actions and highlights |
| **Background color** | Page and section background |
| **Paper background** | Card and surface background |
| **Error color** | Validation errors and error states |
| **Primary text color** | Main body text |
| **Secondary text color** | Muted or supporting text |

### Typography

| Setting | Description |
|---------|-------------|
| **Font family** | Select from standard fonts or upload a custom font file (TTF/OTF) |
| **Font sizes** | Control heading and body text sizes through the text scale tokens (`--concorde-text-xs` through `--concorde-text-3xl`) |
| **Font colors** | Primary and secondary text colors |

Custom fonts uploaded through the Design Builder are hosted by epilot and made available to all journeys using that theme.

### Shape and Spacing

| Setting | Description |
|---------|-------------|
| **Border radius** | Controls the roundness of buttons, cards, inputs, and other elements |
| **Spacing** | Base spacing unit that affects padding and margins throughout the journey |

### Navigation Bar

| Setting | Description |
|---------|-------------|
| **Logo** | Upload your brand logo to display in the journey header |
| **Background color** | Navigation bar background |
| **Logo alignment** | Position the logo left, center, or right via the `--concorde-topbar-logo-alignment` token |

## Creating and Managing Themes

1. Navigate to **Journey > Design Builder** in the epilot 360 sidebar.
2. Select an existing theme to edit, or create a new one.
3. Use the sidebar panels to adjust colors, typography, shape, and upload assets.
4. Preview your changes in real time on the journey canvas.
5. Save the theme when you are satisfied with the result.

### Applying a Theme to a Journey

Themes are linked to journeys through the [Journey Builder](/docs/journeys/journey-builder). When editing a journey, select the desired theme from the theme picker. Every journey references exactly one theme — changing the theme updates the journey's appearance everywhere it is deployed.

### Reusing Themes Across Journeys

Because themes are stored as independent resources, you can apply the same theme to multiple journeys. This is useful for maintaining consistent branding across product-specific, campaign, or partner journeys. Any updates to the shared theme will be reflected in all linked journeys.

## Concorde Design Tokens (CSS Variables)

Under the hood, every Design Builder setting maps to a **CSS custom property** (CSS variable) prefixed with `--concorde-`. These tokens are defined on the `:root` element and consumed by all Concorde components.

Examples of commonly used tokens:

```css
:root {
  --concorde-primary-color: #005eb4;
  --concorde-secondary-color: #913997;
  --concorde-error-color: #cc0005;
  --concorde-border-radius: 4px;
  --concorde-input-background-color: #ffffff;
  --concorde-card-background-color: #ffffff;
  --concorde-button-background-color: #005eb4;
  --concorde-button-label-color: #ffffff;
}
```

For a comprehensive list of available tokens, see the [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) reference.

## Custom CSS

For styling that goes beyond what the Design Builder UI exposes, you can write **Custom CSS** directly. The Design Builder includes an advanced CSS editor with live preview, syntax validation, and error highlighting.

Custom CSS lets you:

- Override any design token with your own values
- Target specific components, blocks, or steps using maintained Concorde class names (e.g., `.Concorde-Button`, `.Concorde-Card`)
- Add custom font faces, gradients, animations, and other advanced styles

For a full guide with examples, see [Custom CSS](/docs/journeys/custom-css).

:::info
Custom CSS is available on the **Professional** pricing plan and above.
:::

## Dark Mode

The Design Builder supports dark mode for journeys. When dark mode is enabled, you can configure a separate set of color tokens that activate automatically. Dark mode–specific tokens use the `-dark` suffix (e.g., `--concorde-primary-color-dark`), and the `.Concorde-Dark` class is applied to the document for scoped styling.

Preview your journey in both light and dark mode within the Design Builder to ensure your theme works well in both contexts.

## Responsive Design

Journeys built with the Concorde design system are responsive by default. The layout adapts to different screen sizes — from desktop to mobile — without requiring additional configuration. Design tokens like spacing, font sizes, and layout widths scale appropriately across breakpoints.

You can further control layout behavior with tokens like:

- `--concorde-custom-layout-max-width` — set the maximum content width
- `--concorde-two-columns-content-width` / `--concorde-two-columns-sidebar-width` — adjust the ratio in two-column layouts

## Embedding Themed Journeys

Themed journeys can be embedded into your website or application. The theme settings, including Custom CSS, are applied regardless of how the journey is served. For embedding options and configuration, see [Embedding](/docs/journeys/embedding).

## Best Practices

- **Start with Design Builder settings** before resorting to Custom CSS — the built-in controls handle most branding needs and are maintained across updates.
- **Use design tokens** (`--concorde-*` variables) in your Custom CSS rather than hardcoding values, so your styles stay consistent with theme changes.
- **Avoid overriding core layout properties** like `display` or `position` in Custom CSS, as these can break journey functionality.
- **Test across devices** — preview your themed journey on desktop and mobile to catch responsive issues early.
- **Migrate to the new design** — the Concorde design system is actively maintained and provides the best theming experience. Legacy Material UI themes will be phased out.

## Further Reading

- [Journey Builder](/docs/journeys/journey-builder) — build and configure journey steps and blocks
- [Custom CSS](/docs/journeys/custom-css) — advanced styling guide with CSS examples
- [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) — full list of CSS variables
- [Concorde HTML Structure](/docs/ui-design/concorde-html-structure) — supported class names and IDs
- [Embedding](/docs/journeys/embedding) — deploy journeys on your website
