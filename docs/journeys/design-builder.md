---
sidebar_position: 2
---

# Design Builder

The Design Builder is the visual theming tool in epilot for customizing the look and feel of customer-facing [journeys](/docs/journeys/journey-builder). It lets you configure brand colors, typography, logos, component-level design tokens, and more — all without writing code. For advanced styling, you can also write [Custom CSS](/docs/journeys/custom-css) directly within the Design Builder.

## Overview

Every journey uses a **theme** that controls its visual appearance. The Design Builder provides a sidebar interface where you adjust settings and immediately preview the result on a live journey. Themes are stored independently from journeys, so a single theme can be applied across multiple journeys to keep your brand consistent.

The Design Builder works with epilot Journey's **Concorde** design system — a lightweight, performance-optimized component library. Journeys using the Concorde design benefit from faster load times and full support for design tokens and Custom CSS.

## Creating and Managing Design Themes

1. Navigate to **Design** in the epilot 360 sidebar.
2. Select an existing theme to edit, or create a new one.
3. Use the sidebar panels to adjust colors, typography, shape, and upload assets.
4. Preview your changes in real time on the journey canvas.
5. Save the theme when you are satisfied with the result.
6. Select a theme as a default if you want all journeys to inherit the design automatically upon creation

### Applying a design to a Journey

Design themes are linked to journeys through the [Journey Builder](/docs/journeys/journey-builder). When editing a journey, open the Journey settings and select the desired design from the Design section. Every journey references exactly one theme, changing the theme updates the journey's appearance everywhere it is loaded.

### Reusing Designs Across Journeys

Because design themes are stored as independent resources, you can apply the same theme to multiple journeys. This is useful for maintaining consistent branding across product-specific, campaign, or partner journeys. Any updates to the shared theme will be reflected in all linked journeys.

## Design Builder Sections

The Design Builder sidebar is organized into sections. Some sections appear only when the Journey preview is active (marked with **Journey only**).

### Navigation

Controls the top bar (logo bar) of the journey.

| Control              | CSS Variable                       | Default       | Description                                                 |
| -------------------- | ---------------------------------- | ------------- | ----------------------------------------------------------- |
| **Logo upload**      | —                                  | epilot logo   | Upload your brand logo (SVG, PNG, JPG)                      |
| **Logo Alignment**   | `--concorde-topbar-logo-alignment` | `center`      | Logo/content alignment in the top bar (Left, Center, Right) |
| **Logo Size**        | `--concorde-logo-size`             | `24px`        | Logo height in pixels (16–100px)                            |
| **Topbar Height**    | `--concorde-topbar-height`         | `48px`        | Minimum height of the top bar (32–120px)                    |
| **Background color** | `--concorde-topbar-background`     | Primary color | Top bar background color                                    |

**Components affected:** TopBar, logo container

### Background

Controls the page and section backgrounds.

| Control              | CSS Variable                    | Default   | Description                  |
| -------------------- | ------------------------------- | --------- | ---------------------------- |
| **Background color** | `--concorde-default-background` | `#FFFFFF` | Page background              |
| **Paper background** | `--concorde-surface-background` | `#FFFFFF` | Card and surface backgrounds |

### Colors

Controls the brand palette.

| Control       | CSS Variable                 | Default   | Description                                                                           |
| ------------- | ---------------------------- | --------- | ------------------------------------------------------------------------------------- |
| **Primary**   | `--concorde-primary-color`   | `#005EB4` | Main brand color for buttons, links, active states                                    |
| **Secondary** | `--concorde-secondary-color` | `#913997` | Accent color for secondary actions (journey only)                                     |
| **Error**     | `--concorde-error-color`     | `#CC0005` | Validation errors and error states                                                    |
| **Border**    | `--concorde-outline`         | `#74777F` | Global border/outline color for form elements, switch, checkbox, radio (journey only) |
| **Divider**   | `--concorde-divider-color`   | `#DEEAF7` | Divider line color (journey only)                                                     |

**Components affected:** All interactive elements, step headers, block headings, product titles, markdown headings

### Coupons

Controls coupon and cashback badge colors.

| Control            | CSS Variable                       | Default | Description          |
| ------------------ | ---------------------------------- | ------- | -------------------- |
| **Coupon color**   | `--concorde-coupon-discount-color` | —       | Discount badge color |
| **Cashback color** | `--concorde-coupon-cashback-color` | —       | Cashback badge color |

### Typography

Upload and select font families, and control text colors for the journey. Organized into **Color** and **Font** tabs.

#### Color

| Control                  | CSS Variable                  | Default       | Description                                                       |
| ------------------------ | ----------------------------- | ------------- | ----------------------------------------------------------------- |
| **Primary text color**   | `--concorde-primary-text`     | `#001632`     | Main body text color                                              |
| **Secondary text color** | `--concorde-secondary-text`   | `#717171`     | Muted or supporting text color                                    |
| **Heading Color**        | `--concorde-accent-color`     | Primary color | Heading/title text color. Falls back to primary (journey only)    |
| **Link Color**           | `--concorde-link-color`       | Primary color | Link text color (journey only)                                    |
| **Link Hover Color**     | `--concorde-link-hover-color` | —             | Link text color on hover. Falls back to link color (journey only) |

#### Font

| Control         | CSS Variable             | Default     | Description                                                    |
| --------------- | ------------------------ | ----------- | -------------------------------------------------------------- |
| **Font family** | `--concorde-font-family` | ProximaNova | Select from standard fonts or upload custom TTF/OTF/WOFF files |

**Components affected:** BlockHeading, Typography, Link, all text elements.

Custom fonts uploaded through the Design Builder are hosted by epilot and made available to all journeys using that theme.

### Shape

| Control           | CSS Variable               | Default | Description                                     |
| ----------------- | -------------------------- | ------- | ----------------------------------------------- |
| **Border radius** | `--concorde-border-radius` | `4px`   | Global border radius for buttons, cards, inputs |

### Inputs (Journey only)

Controls input field appearance across the journey.

| Control           | CSS Variable                        | Default             | Description                                   |
| ----------------- | ----------------------------------- | ------------------- | --------------------------------------------- |
| **Background**    | `--concorde-input-background-color` | transparent         | Input field background color                  |
| **Border Color**  | `--concorde-input-border-color`     | `#74777F`           | Input border color                            |
| **Text Color**    | `--concorde-input-color`            | Primary text        | Input text color                              |
| **Label Color**   | `--concorde-input-label-color`      | Secondary text      | Input floating label color                    |
| **Border Radius** | `--concorde-input-border-radius`    | Shape border radius | Input border radius (0–32px)                  |
| **Height**        | `--concorde-input-height`           | `48px`              | Input field height (24–96px)                  |
| **Variant**       | —                                   | `outlined`          | Input style: Outlined, Inlined, or Underlined |

**Components affected:** Input, Textarea, TextField, Autocomplete, DatePicker input

:::info
The **Variant** setting is applied globally through the theme context. Individual components can override it via their `variant` prop.
:::

### Buttons (Journey only)

Controls button styles, organized into Primary Button, Outlined Button, and Shared settings.

#### Primary Button

| Control              | CSS Variable                                 | Default                       | Description                             |
| -------------------- | -------------------------------------------- | ----------------------------- | --------------------------------------- |
| **Background**       | `--concorde-primary-button-background-color` | Primary color                 | Supports solid colors and CSS gradients |
| **Text Color**       | `--concorde-primary-button-text-color`       | `#FFFFFF`                     | Primary button label color              |
| **Hover Background** | `--concorde-primary-button-hover-bg-color`   | Primary color + white overlay | Hover state background                  |
| **Hover Text Color** | `--concorde-primary-button-hover-text-color` | Same as text color            | Hover state label color                 |

#### Outlined Button

| Control              | CSS Variable                                  | Default                       | Description                 |
| -------------------- | --------------------------------------------- | ----------------------------- | --------------------------- |
| **Border Color**     | `--concorde-outlined-button-border-color`     | Primary color                 | Outline border color        |
| **Text Color**       | `--concorde-outlined-button-text-color`       | Primary color                 | Outlined button label color |
| **Hover Background** | `--concorde-outlined-button-hover-bg-color`   | transparent + primary overlay | Hover state background      |
| **Hover Text Color** | `--concorde-outlined-button-hover-text-color` | Same as text color            | Hover state label color     |

#### Ghost Button

Used in product tile CTAs, "add device" actions, and other secondary actions.

| Control              | CSS Variable                               | Default                       | Description              |
| -------------------- | ------------------------------------------ | ----------------------------- | ------------------------ |
| **Background**       | `--concorde-ghost-button-background-color` | transparent                   | Ghost button background  |
| **Text Color**       | `--concorde-ghost-button-text-color`       | Primary color                 | Ghost button label color |
| **Hover Background** | `--concorde-ghost-button-hover-bg-color`   | transparent + primary overlay | Hover state background   |
| **Hover Text Color** | `--concorde-ghost-button-hover-text-color` | Same as text color            | Hover state label color  |

#### All Buttons

| Control           | CSS Variable                      | Default             | Description                     |
| ----------------- | --------------------------------- | ------------------- | ------------------------------- |
| **Border Radius** | `--concorde-button-border-radius` | Shape border radius | Button corner rounding (0–32px) |
| **Button Height** | `--concorde-button-height`        | `48px`              | Button height (36–64px)         |

#### Toggle Buttons

Affects all toggle-style buttons — Single Choice, Multiple Choice, Contract Start Date blocks, and formal ToggleGroup components.

| Control                 | CSS Variable                                   | Default                           | Description                               |
| ----------------------- | ---------------------------------------------- | --------------------------------- | ----------------------------------------- |
| **Selected Background** | `--concorde-toggle-button-selected-bg-color`   | Inherits from primary button bg   | Selected toggle button background         |
| **Selected Text**       | `--concorde-toggle-button-selected-text-color` | Inherits from primary button text | Selected toggle button text color         |
| **Hover Background**    | `--concorde-toggle-button-hover-bg-color`      | Inherits from button hover bg     | Hover state background (selected and non) |
| **Hover Text**          | `--concorde-toggle-button-hover-text-color`    | Same as selected text color       | Hover state text color (selected and non) |

#### Toggle Group

Controls the wrapper border for formal ToggleGroup components (e.g., PersonalInformation, Contact, PaymentMethod form fields). Does not affect standalone choice buttons.

| Control          | CSS Variable                            | Default | Description                 |
| ---------------- | --------------------------------------- | ------- | --------------------------- |
| **Border Color** | `--concorde-toggle-button-border-color` |         | Toggle group wrapper border |

**Components affected:** Button (primary, outlined, ghost variants), toggle buttons, action bars, product tile CTAs

### Components (Journey only)

Fine-grained controls for individual Concorde components.

#### Card

Controls the visual style of all card surfaces (Cards block, EntityLookup, etc.).

| Control          | CSS Variable                       | Default          | Description                                                                               |
| ---------------- | ---------------------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| **Variant**      | —                                  | `shadow`         | Card style: **Shadow** (elevated with box-shadow) or **Outlined** (1px border, no shadow) |
| **Background**   | `--concorde-card-background-color` | Paper background | Card surface background. Supports solid colors and CSS gradients via the gradient picker  |
| **Border Color** | `--concorde-card-border-color`     | Outline color    | Card border color for the outlined variant. Falls back to the global Border color         |

:::info
The **Variant** is applied globally through the theme context. Individual components can still override it via their `variant` prop.
:::

Two additional CSS variables — `--concorde-card-hover-background-color` and `--concorde-card-custom-shadow` (shadow variant only) — are not exposed in the Design Builder UI but can be set via Custom CSS.

#### Summary Card

| Control                     | CSS Variable                        | Default | Description                         |
| --------------------------- | ----------------------------------- | ------- | ----------------------------------- |
| **Summary Card Background** | `--concorde-summary-block-bg-color` | —       | Summary block card background color |

#### Dropdown

Controls dropdown/select menu item styles.

| Control                 | CSS Variable                             | Default | Description                   |
| ----------------------- | ---------------------------------------- | ------- | ----------------------------- |
| **Hover Background**    | `--concorde-menu-item-hover-bg-color`    | —       | Menu item hover background    |
| **Hover Text**          | `--concorde-menu-item-hover-color`       | —       | Menu item hover text color    |
| **Selected Background** | `--concorde-menu-item-selected-bg-color` | —       | Selected menu item background |
| **Selected Text**       | `--concorde-menu-item-selected-color`    | —       | Selected menu item text color |

#### Switch

| Control                  | CSS Variable                                   | Default         | Description                 |
| ------------------------ | ---------------------------------------------- | --------------- | --------------------------- |
| **Unchecked Color**      | `--concorde-switch-unchecked-color`            | Outline color   | Switch thumb color when off |
| **Unchecked Background** | `--concorde-switch-unchecked-background-color` | `#E0E2EC`       | Switch track color when off |
| **Border Radius**        | `--concorde-switch-border-radius`              | `9999px` (pill) | Switch border radius        |

#### Checkbox

| Control             | CSS Variable                          | Default       | Description                          |
| ------------------- | ------------------------------------- | ------------- | ------------------------------------ |
| **Unchecked Color** | `--concorde-checkbox-unchecked-color` | Outline color | Checkbox border color when unchecked |
| **Label Color**     | `--concorde-checkbox-label-color`     | Primary text  | Checkbox label text color            |

#### Radio

| Control             | CSS Variable                       | Default       | Description                       |
| ------------------- | ---------------------------------- | ------------- | --------------------------------- |
| **Unchecked Color** | `--concorde-radio-unchecked-color` | Outline color | Radio border color when unchecked |
| **Label Color**     | `--concorde-radio-label-color`     | Primary text  | Radio label text color            |

#### Date Picker Calendar

| Control                 | CSS Variable                              | Default                        | Description                      |
| ----------------------- | ----------------------------------------- | ------------------------------ | -------------------------------- |
| **Selected Background** | `--concorde-datepicker-selected-bg-color` | Primary color                  | Calendar selected day background |
| **Selected Color**      | `--concorde-datepicker-selected-color`    | `#FFFFFF`                      | Calendar selected day text color |
| **Border Radius**       | `--concorde-datepicker-border-radius`     | `min(border-radius * 2, 20px)` | Calendar cell border radius      |

#### Chip

Used for Single Choice / Multi Choice blocks when displayed as chips, and for promo code tags.

| Control              | CSS Variable                             | Default            | Description             |
| -------------------- | ---------------------------------------- | ------------------ | ----------------------- |
| **Background**       | `--concorde-chip-background-color`       | `#F7F7F7`          | Chip default background |
| **Hover Background** | `--concorde-chip-hover-background-color` | Same as background | Chip hover background   |
| **Text Color**       | `--concorde-chip-text-color`             | —                  | Chip text color         |
| **Hover Text Color** | `--concorde-chip-hover-text-color`       | Same as text color | Chip hover text color   |

For a comprehensive list of available tokens, see the [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) reference.

## Advanced: Custom CSS

For styling that goes beyond what the Design Builder UI exposes, you can write **Custom CSS** directly. The Design Builder includes an advanced CSS editor with live preview, syntax validation, and error highlighting. See [Custom CSS](/docs/journeys/custom-css) for a full guide.

Custom CSS lets you:

- Override any `--concorde-*` design token with your own values
- Target specific components, blocks, or steps using maintained Concorde class names (e.g., `.Concorde-Button`, `.Concorde-Input`)
- Add custom font faces, gradients, animations, and other advanced styles

For the full list of available CSS variables, see [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens).
For supported class names and HTML structure, see [Concorde HTML Structure](/docs/ui-design/concorde-html-structure).

:::info
Custom CSS is available on the **Professional** pricing plan and above.
:::

### How Design Tokens and Custom CSS Interact

The precedence order is:

1. **Component defaults** (defined in SCSS modules with CSS variable fallbacks)
2. **Theme base values** (from `ConcordeTheme` palette/typography/shape)
3. **Design token overrides** (from the Design Builder controls, injected as CSS variables in `:root`)
4. **Custom CSS** (injected as a `<style>` tag after theme styles)

Custom CSS always wins over Design Builder settings because it appears later in the cascade.

### Resetting Controls

Most Design Builder controls show a reset icon (&#8634;) when the value has been changed from its default. Clicking reset clears the token, allowing the component to fall back to its inherited default (typically the primary color or the theme's base value).

Controls that inherit from other settings (e.g., Toggle Group inherits from Primary Button styles) show no value when unset — they automatically follow the parent setting.

## Dark Mode

The Design Builder supports dark mode for journeys. When dark mode is enabled, you can configure a separate set of color tokens that activate automatically. Dark mode–specific tokens use the `-dark` suffix (e.g., `--concorde-primary-color-dark`), and the `.Concorde-Dark` class is applied to the document for scoped styling.

Preview your journey in both light and dark mode within the Design Builder to ensure your theme works well in both contexts.

## Responsive Design

Journeys built with the Concorde design system are responsive by default. The layout adapts to different screen sizes from desktop to mobile without requiring additional configuration. Design tokens like spacing, font sizes, and layout widths scale appropriately across breakpoints.

You can further control layout behavior with tokens like:

- `--concorde-custom-layout-max-width` — set the maximum content width
- `--concorde-two-columns-content-width` / `--concorde-two-columns-sidebar-width` — adjust the ratio in two-column layouts

## Best Practices

- **Start with Design Builder settings** before resorting to Custom CSS — the built-in controls handle most branding needs and are maintained across updates.
- **Use design tokens** (`--concorde-*` variables) in your Custom CSS rather than hardcoding values, so your styles stay consistent with theme changes.
- **Avoid overriding core layout properties** like `display` or `position` in Custom CSS, as these can break journey functionality.
- **Test across devices** — preview your themed journey on desktop and mobile to catch responsive issues early.
- **Use the reset button** to return to defaults when experimenting.

## Further Reading

- [Journey Builder](/docs/journeys/journey-builder) — build and configure journey steps and blocks
- [Custom CSS](/docs/journeys/custom-css) — advanced styling guide with examples
- [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) — full CSS variable reference
- [Concorde HTML Structure](/docs/ui-design/concorde-html-structure) — supported class names and IDs
- [Embedding](/docs/journeys/embedding) — deploy journeys on your website

---

## Changelog

### 2026-04-20

#### Added

- **Inputs** section — background, border color, text color, label color, border radius, height, and variant controls
- **Buttons** section — Primary, Outlined, Ghost, Toggle Buttons, and Toggle Group with full color, hover, and sizing controls
- **Components** section — Card, Summary Card, Dropdown, Switch, Checkbox, Radio, Date Picker, and Chip controls
- **Typography** — Heading Color, Link Color, and Link Hover Color controls
- **Colors** — Border and Divider color controls
- **Navigation** — Logo Size and Topbar Height controls
- Resetting Controls documentation

#### Changed

- Typography reorganized into Color and Font tabs

#### Removed

- Generic Design Tokens overview tables (replaced by per-control reference)
