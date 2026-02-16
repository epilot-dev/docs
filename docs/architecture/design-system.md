---
title: Design System
sidebar_position: 4
---

# Volt UI Design System

**Volt UI** is epilot's design system — a tree-shakeable component library for React built on [Radix UI](https://www.radix-ui.com/) primitives and [Tailwind CSS v4](https://tailwindcss.com/).

A [Svelte version](https://www.npmjs.com/package/@epilot/volt-ui-svelte) is also available as `@epilot/volt-ui-svelte`.

| | Details |
|---|---|
| **Package** | `@epilot/volt-ui` |
| **Framework** | React 18+ |
| **Primitives** | Radix UI |
| **Styling** | Tailwind CSS v4 |
| **CSS Prefix** | `volt-` |
| **Icons** | `@epilot360/icons` — [Browse Icons](https://portal.epilot.cloud/epilot360-icons) |
| **Docs (React)** | [React Documentation](https://docs-two-inky.vercel.app/) |
| **Docs (Svelte)** | [Svelte Documentation](https://grand-yeot-414eb4.netlify.app/) |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

<Tabs>
  <TabItem value="npm" label="npm" default>

```sh
npm install @epilot/volt-ui
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```sh
yarn add @epilot/volt-ui
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```sh
pnpm add @epilot/volt-ui
```

  </TabItem>
</Tabs>

### Import Styles

Add the Volt UI stylesheet to your application entry point:

```css
@import "@epilot/volt-ui/style.css";

/* Optional: browser reset (skip if your app already has preflight styles) */
@import "@epilot/volt-ui/preflight.css";
```

### Font (Optional)

Volt UI uses the [Geist](https://vercel.com/font) variable font. Import it to enable the default typography:

```tsx
import "@epilot/volt-ui/font.css";
```

The font is inlined as base64 at build time (~90KB). You can apply it via:

- **Utility class**: `volt-font-geist`
- **CSS variable**: `var(--volt-font-geist)`
- **Tailwind default**:
  ```css
  @theme {
    --default-font-family: var(--volt-font-geist);
  }
  ```

## CSS Prefixing

All Volt UI classes and CSS variables are automatically prefixed with `volt-` to avoid conflicts with application styles:

- CSS variables: `--volt-blue-9`, `--volt-accent-solid`, etc.
- Tailwind classes: `.volt-bg-blue-500`, `.volt-text-white`, etc.

This scoping means Volt UI can be safely used alongside your own Tailwind setup or other CSS frameworks.

## Components

Volt UI ships the following component categories:

### Layout & Content

| Component | Description |
|-----------|-------------|
| `Button`, `ButtonGroup` | Actions and grouped action sets |
| `Card` | Structured content containers |
| `Separator` | Visual dividers |
| `Badge` | Status indicators and labels |
| `Callout` | Informational banners |
| `Text` | Typography with title, heading, body, and helper variants |
| `Label` | Form labels |
| `Spinner` | Loading indicators |

### Forms

| Component | Description |
|-----------|-------------|
| `Field` | Composable form field with label, input, description, and error |
| `FieldInput` | Text input fields |
| `FieldTextarea` | Multiline text input |
| `FieldSelect` | Dropdown select |
| `FieldCombobox` | Searchable dropdown with multi-select support |
| `Checkbox` | Checkboxes |
| `Switch` | Toggle switches |
| `RadioGroup` | Radio button groups |
| `DateTimePicker` | Date and time selection |
| `DateRangePicker` | Date range selection |

### Overlays & Navigation

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialogs |
| `AlertDialog` | Confirmation dialogs |
| `Popover` | Floating content panels |
| `DropdownMenu` | Context menus and dropdowns with sub-menus |
| `Tooltip` | Hover tooltips |
| `Tabs` | Tabbed navigation |
| `Accordion` | Expandable content sections |
| `Toast` | Notification system (via [Sonner](https://sonner.emilkowal.dev/)) |

### Data Display

| Component | Description |
|-----------|-------------|
| `Table` | Basic HTML tables with styled primitives |
| `DataTable` | Composable data table built on [TanStack Table](https://tanstack.com/table) with sorting, filtering, pagination, virtualization, and column pinning |

## Icons

The `@epilot360/icons` package provides the icon set for Volt UI.

<Tabs>
  <TabItem value="npm" label="npm" default>

```sh
npm install @epilot360/icons
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```sh
yarn add @epilot360/icons
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```sh
pnpm add @epilot360/icons
```

  </TabItem>
</Tabs>

Browse available icons in the [Storybook Documentation](https://portal.dev.epilot.cloud/epilot360-icons/).

Import any icon as a React component:

```tsx
import { Edit as EditIcon, EpilotIcon } from '@epilot360/icons';

<EditIcon />
// or use the dynamic component
<EpilotIcon name="edit" />
```

For tree-shaking outside the 360 portal, import icons individually:

```tsx
import EditIcon from '@epilot360/icons/react/Edit';
```

Raw SVG files are also available:

```tsx
import EditIconSVG from '@epilot360/icons/svg/Edit/icon.svg';
import EditIconSVGFill from '@epilot360/icons/svg/Edit/icon-fill.svg';
```

## Usage

Components follow a composable API pattern:

```tsx
import { Field, FieldLabel, FieldInput, FieldDescription, FieldError } from "@epilot/volt-ui";

<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldInput type="email" />
  <FieldDescription>We'll never share your email</FieldDescription>
  <FieldError>Required field</FieldError>
</Field>
```

```tsx
import { DataTable, DataTableHeader, DataTableContent, DataTablePagination } from "@epilot/volt-ui";

<DataTable columns={columns} data={data}>
  <DataTableHeader />
  <DataTableContent />
  <DataTablePagination />
</DataTable>
```

## Theming

Volt UI uses CSS variables for theming and supports light and dark modes.

### Semantic Color Tokens

| Token | Purpose |
|-------|---------|
| `accent-*` | Primary brand color |
| `gray-*` | Neutral grays |
| `error-*` | Error states |
| `warning-*` | Warning states |
| `success-*` | Success states |
| `info-*` | Informational states |

Each semantic color provides state variants: `-solid`, `-soft`, `-ui`, `-surface`, `-contrast`, `-default`, `-disabled`, and hover variants.

### Dark Mode

Dark mode activates automatically when any of these are present on the root element:

```html
<html class="dark">
<!-- or -->
<html data-theme="dark">
```

### Customizing Colors

Override CSS variables to match your brand:

```css
:root {
  --volt-accent-9: #your-color;
  --volt-accent-solid: var(--volt-accent-9);
}
```

## MCP Server

Volt UI provides an [MCP](https://modelcontextprotocol.io/) server that exposes component APIs and design tokens to AI coding assistants.

```bash
npx @epilot/volt-ui-mcp
```

Add this to your AI tool's MCP configuration:

```json
{
  "mcpServers": {
    "volt-ui": {
      "command": "npx",
      "args": ["-y", "@epilot/volt-ui-mcp"]
    }
  }
}
```

| Tool | Config Location |
|------|----------------|
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Code | `.vscode/mcp.json` or `~/.claude/settings.json` |
| Cursor | `.cursor/mcp.json` |
| GitHub Copilot | VS Code `settings.json` → `github.copilot.chat.mcpServers` |

---

## Customer-Facing Styling

For styling **Journeys** (customer-facing forms), epilot uses [**Concorde**](https://github.com/epilot-dev/concorde-elements) — an open-source design system with CSS custom properties (`--concorde-*`). See:

- [Concorde Design Tokens](/docs/ui-design/concorde-design-tokens) — Full list of theming variables
- [Concorde HTML Structure](/docs/ui-design/concorde-html-structure) — DOM structure reference
- [Design Builder](/docs/journeys/design-builder) — Visual theming tool
- [Custom CSS](/docs/journeys/custom-css) — Advanced journey styling
