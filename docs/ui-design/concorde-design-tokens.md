---
title: Concorde Design tokens
hide_title: true
sidebar_position: 3
---

<h1 style={{display:"inline-block"}}>Concorde Design tokens: CSS variables</h1>

**Note:** Concorde refers to the new Journey design.

## Concorde Global Tokens

### 🎨 Main Colors

| CSS Variable                     | Default        | Description                                                                                                                                                                          |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--concorde-primary-color`       | `#005eb4`      | The main primary color. If modified, update `--concorde-primary-color-rgb` also.                                                                                                     |
| `--concorde-accent-color`        | `#005eb4`      | This color is used to highlight headings.                                                                                                                                            |
| `--concorde-secondary-color`     | `#913997`      | The main secondary color. If modified, update `--concorde-secondary-color-rgb` also.                                                                                                 |
| `--concorde-disabled-color`      | `#e0e2ec`      | The main disabled color.                                                                                                                                                             |
| `--concorde-error-color`         | `#cc0005`      | The main error color. If modified, update `--concorde-error-color-rgb` also.                                                                                                         |
| `--concorde-outline`             | `#74777f`      | The main color used for borders. Used directly in some Concorde components (Switch’s, Rating, Radio, Checkbox default color, Swipeable Drawer’s handle, Input default border color). |
| `--concorde-divider-color`       | `#deeaf7`      | The main color used for dividers. Used directly in some Concorde components (Shopping cart).                                                                                         |
| `--concorde-primary-color-rgb`   | `0, 94, 180`   | The rgb tuple version of `--concorde-primary-color`. Used to create transparent variations of the main primary color.                                                                |
| `--concorde-secondary-color-rgb` | `145, 57, 151` | The rgb tuple version of `--concorde-secondary-color`. Used to create transparent variations of the main secondary color.                                                            |
| `--concorde-error-color-rgb`     | `255, 58, 63`  | The rgb tuple version of `--concorde-error-color`. Used to create transparent variations of the main error color.                                                                    |

### 🎨 Text Colors

| CSS Variable                     | Default         | Description                                                                                                              |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `--concorde-primary-text`        | `#001632`       | The primary text color. If modified, update `--concorde-primary-text-rgb` also.                                          |
| `--concorde-secondary-text`      | `#717171`       | The secondary text color. If modified, update `--concorde-secondary-text-rgb` also.                                      |
| `--concorde-disabled-text`       | `#43474e`       | The disabled text color. If modified, update `--concorde-disabled-text-rgb` also.                                        |
| `--concorde-disabled-label-text` | `#8c9dad`       | The color used for disabled text.                                                                                        |
| `--concorde-primary-text-rgb`    | `0, 22, 50`     | The rgb tuple version of `--concorde-primary-text`. Used to create transparent variations of the primary text color.     |
| `--concorde-secondary-text-rgb`  | `113, 113, 113` | The rgb tuple version of `--concorde-secondary-text`. Used to create transparent variations of the secondary text color. |

### 🎨 Background Colors

| CSS Variable                        | Default         | Description                                                                                                                                       |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--concorde-default-background`     | `#ffffff`       | The main background color. If modified, update `--concorde-default-background-rgb` also.                                                          |
| `--concorde-surface-background`     | `#ffffff`       | The background color used for surfaces. Used in Layout & Blocks (Desktop Navigation Stepper, PV Rooftop Navigator, Placement on Card view, etc.). |
| `--concorde-secondary-surface`      | `#f2f5fa`       | The secondary background color used for elements on top of surfaces. A blend between the primary color and the surface background color.          |
| `--concorde-loading-background`     | `#e0e0e0`       | The background color of the loaders.                                                                                                              |
| `--concorde-neutral-surface`        | `#e0e2ec`       | The neutral surface background. Used in Layout & Blocks (Desktop Navigation Stepper, PV Rooftop Navigator).                                       |
| `--concorde-default-background-rgb` | `255, 255, 255` | The rgb tuple version of `--concorde-default-background`. Used to create transparent variations of the default background color.                  |
| `--concorde-disabled-background`    | `#e6eef7`       | The disabled background color used to for the Mobile Stepper only.                                                                                |

### 🔠 Typography

| CSS Variable             | Default                                                   | Description                                                                              |
| ------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--concorde-font-family` | `"Proxima Nova", Open Sans, Helvetica, Arial, sans-serif` | The font family used. Note that the font must be loaded on the journey for this to work. |
| `--concorde-text-3xl`    | `2rem`                                                    | The 3xl font size (h1).                                                                  |
| `--concorde-text-2xl`    | `1.75rem`                                                 | The 2xl font size (h2).                                                                  |
| `--concorde-text-xl`     | `1.5rem`                                                  | The xl font size (h3).                                                                   |
| `--concorde-text-lg`     | `1.25rem`                                                 | The lg font size (h4).                                                                   |
| `--concorde-text-base`   | `1rem`                                                    | The default text font size (h5, p).                                                      |
| `--concorde-text-sm`     | `0.875rem`                                                | The sm font size (h6).                                                                   |
| `--concorde-text-xs`     | `0.75rem`                                                 | The xs font size.                                                                        |

### 🌑 Shadows

| CSS Variable                     | Default                                                       | Description                                     |
| -------------------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| `--concorde-button-shadow-hover` | `0 0.5rem 0.5rem -0.4rem`                                     | The box shadow of the button hover state        |
| `--concorde-card-shadow`         | `0 0 1px rgba(0, 0, 0, 0.12), 0 8px 48px rgba(0, 0, 0, 0.08)` | The box shadow of the elevated card             |
| `--concorde-card-shadow-hover`   | `0 0 1px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.16)` | The box shadow of the elevated card hover state |

### 🎭 Others

| CSS Variable                   | Default             | Description                                  |
| ------------------------------ | ------------------- | -------------------------------------------- |
| `--concorde-spacing`           | `0.25rem`           | The default single spacing unit              |
| `--concorde-border-radius`     | `0.25rem`           | The default border radius                    |
| `--concorde-transition-effect` | `0.25s ease-in-out` | The default transition property              |
| `--concorde-disabled-opacity`  | `0.38`              | The default opacity used for disabled states |
| `--concorde-input-height`      | `48px`              | The default input height for regular inputs  |

---

## Concorde Layout Tokens

### Navbar

| CSS Variable                           | Default                         | Description                                                                                                                                                                                                           |
| -------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--concorde-custom-layout-max-width`   | `1256px`                        | The maximum width of the journey.                                                                                                                                                                                     |
| `--concorde-two-columns-content-width` | `calc(7 / 12 * 100%)`           | For Two column layouts, the percentage of the width assigned to the Content section. Ensure that together with the `--concorde-two-columns-sidebar-width` variable, the total width of the Two Column Layout is 100%. |
| `--concorde-two-columns-sidebar-width` | `calc(5 / 12 * 100%)`           | For Two column layouts, the percentage of the width assigned to the Sidebar section. Ensure that together with the `--concorde-two-columns-content-width` variable, the total width of the Two Column Layout is 100%. |
| `--concorde-topbar-background`         | `var(--concorde-primary-color)` | The background color of the navigation bar.                                                                                                                                                                           |
| `--concorde-topbar-logo-alignment`     | `center`                        | Changes the alignment of the header logo. Can be `flex-start` and `flex-end`.                                                                                                                                         |

---

## Concorde Block Tokens

### Summary Block

| CSS Variable                        | Default                                        | Description                                |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `--concorde-summary-block-bg-color` | `rgba(var(--concorde-primary-color-rgb), 0.1)` | The background color of the summary block. |

### Products Block

| CSS Variable                                     | Default                                         | Description                                                |
| ------------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------- |
| `--concorde-cashback-breakdown-border-color`     | `rgba(var(--concorde-primary-color-rgb),0.15)`  | The border color of the cashback breakdown.                |
| `--concorde-coupon-discount-color`               | `var(--concorde-error-color)`                   | The coupon discount color.                                 |
| `--concorde-coupon-cashback-color`               | `var(--concorde-secondary-color)`               | The background color of the coupon cashback.               |
| `--concorde-product-tile-background-color`       | `#ffffff`                                       | The default background color of the product tiles.         |
| `--concorde-product-tile-hover-background-color` | `var(--concorde-product-tile-background-color)` | The background color of the hover state of product tiles.  |
| `--product-concorde-tile-featured-color`         | `#efbf02`                                       | The default border color of the featured product tile.     |
| `--product-concorde-tile-featured-label-color`   | `#ffffff`                                       | The default label text color of the featured product tile. |

---

## Concorde Components Tokens

### Autocomplete

Refer to Input, Icon, Button & Menu tokens.

### Badge

None

### Button

| CSS Variable                                 | Expected Type | Description                                                                                      | Default                               |
| -------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `--concorde-button-label-color`              | `string`      | The label color of the button                                                                    | Depends on Button variant             |
| `--concorde-button-background-color`         | `string`      | The background color of the button                                                               | Depends on Button variant             |
| `--concorde-button-hover-bg-color`           | `string`      | The background color of the hover state of the button                                            |                                       |
| `--concorde-button-active-bg-color`          | `string`      | The background color of the active state of the button                                           |                                       |
| `--concorde-button-gap`                      | `string`      | The gap between the button elements                                                              | Defaults to `var(--concorde-spacing)` |
| `--concorde-primary-button-background-color` | `string`      | The custom background color of the Primary Button (e.g., Next/Submit buttons)                    |                                       |
| `--concorde-primary-button-hover-bg-color`   | `string`      | The custom background color of the hover state of the Primary Button (e.g., Next/Submit buttons) |                                       |
| `--concorde-outlined-button-border-color`    | `string`      | The border color of the outlined button variant                                                  | Used in Toggle Group                  |

### Card

| CSS Variable                             | Expected Type | Description                                                 | Default                                 |
| ---------------------------------------- | ------------- | ----------------------------------------------------------- | --------------------------------------- |
| `--concorde-card-background-color`       | `string`      | The background color of the card                            | `var(--concorde-surface-background)`    |
| `--concorde-card-hover-background-color` | `string`      | The background color of the card in hover state             | `var(--concorde-card-background-color)` |
| `--concorde-card-featured-text`          | `string`      | The label text of a card in its featured state              |                                         |
| `--concorde-card-featured-color`         | `string`      | The border color of a card in its featured state            | `#efbf02`                               |
| `--concorde-card-featured-label-color`   | `string`      | The color of the label text of a card in its featured state | `#ffffff`                               |

### Checkbox

| CSS Variable                          | Expected Type | Description                                  | Default                        |
| ------------------------------------- | ------------- | -------------------------------------------- | ------------------------------ |
| `--concorde-checkbox-unchecked-color` | `string`      | The color of the unchecked checkbox icon     | `var(--concorde-outline)`      |
| `--concorde-checkbox-error-color`     | `string`      | The color of the checkbox in its error state | `var(--concorde-error-color)`  |
| `--concorde-checkbox-label-color`     | `string`      | The color of the checkbox label              | `var(--concorde-primary-text)` |

### Chip

None

### Circular Progress

| CSS Variable                         | Expected Type | Description                                   | Default |
| ------------------------------------ | ------------- | --------------------------------------------- | ------- |
| `--concorde-circular-progress-size`  | `string`      | The height and width of the circular progress | `40px`  |
| `--concorde-circular-progress-speed` | `string`      | The speed of the progress                     | `0.8s`  |

### DatePicker

Refer also to Input, Icon, & Icon Button tokens.

| CSS Variable                                         | Expected Type | Description                                                            | Default                                                 |
| ---------------------------------------------------- | ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| `--concorde-datepicker-calendar-bg-color`            | `string`      | The background color of the Datepicker calendar                        | `rgba(var(--concorde-default-background-rgb), 1)`       |
| `--concorde-datepicker-day-color`                    | `string`      | The default color of the Datepicker day (1, 2, 3, etc.)                | `var(--concorde-secondary-text)`                        |
| `--concorde-datepicker-day-name-color`               | `string`      | The color of the Datepicker day name (Su, M, Tu, etc.)                 | `#43474e`                                               |
| `--concorde-datepicker-separation-color`             | `string`      | The color of the vertical divider between Month Select and Time Select | `#c4c6cf`                                               |
| `--concorde-datepicker-selected-color`               | `string`      | The color of selected day and time options                             | `#ffffff`                                               |
| `--concorde-datepicker-selected-bg-color`            | `string`      | The background color of the selected day and time options              | `var(--concorde-primary-color)`                         |
| `--concorde-datepicker-header-navigation-icon-color` | `string`      | The color of the month select and year select icons                    |                                                         |
| `--concorde-datepicker-border-radius`                | `string`      | The border radius of the Datepicker                                    | `min(calc(var(--concorde-border-radius) * 2), 1.25rem)` |

### Divider

| CSS Variable                      | Expected Type | Description                  | Default                         |
| --------------------------------- | ------------- | ---------------------------- | ------------------------------- |
| `--concorde-divider-custom-color` | `string`      | The custom divider color     | `var(--concorde-divider-color)` |
| `--concorde-divider-thickness`    | `string`      | The thickness of the divider | `1px`                           |

### DottedLine

| CSS Variable                          | Expected Type | Description                  | Default         |
| ------------------------------------- | ------------- | ---------------------------- | --------------- |
| `--concorde-dotted-line-custom-color` | `string`      | The color of the dotted line | Inherited color |

### DropdownX

Refer also to Input, Icon, Button, Icon Button & Menu tokens.

| CSS Variable                     | Expected Type | Description             | Default |
| -------------------------------- | ------------- | ----------------------- | ------- |
| `--concorde-dropdown-menu-width` | `string`      | The dropdown menu width |         |

### Expand Icon

Refer to Icon tokens.

### Iban Input

Refer to Input & Spacing tokens.

### Icon

| CSS Variable                  | Expected Type | Description                   | Default                      |
| ----------------------------- | ------------- | ----------------------------- | ---------------------------- |
| `--concorde-icon-color`       | `string`      | The color of the icon         | `currentcolor`               |
| `--concorde-icon-size`        | `string`      | The font size of the icon     | `20px`                       |
| `--concorde-icon-hover-color` | `string`      | The hover state color         | `var(--concorde-icon-color)` |
| `--concorde-icon-is-filled`   | `string`      | Enables the filled icon state |                              |

### Icon Button

Refer to Icon & Button tokens.

### Image

None

### Image Stepper

Refer to Button & Mobile Stepper tokens.

### Input

| CSS Variable                        | Expected Type | Description                         | Default                                    |
| ----------------------------------- | ------------- | ----------------------------------- | ------------------------------------------ |
| `--concorde-input-color`            | `string`      | The color of the input text         | `var(--concorde-primary-text)`             |
| `--concorde-input-background-color` | `string`      | Background color of the input field | `transparent`                              |
| `--concorde-input-border-color`     | `string`      | Border color of the input field     | `var(--concorde-outline)`                  |
| `--concorde-input-error-color`      | `string`      | Error color of the input            | `var(--concorde-error-color)`              |
| `--concorde-input-label-color`      | `string`      | Label text color                    | `var(--concorde-secondary-text)`           |
| `--concorde-input-border-radius`    | `string`      | Border radius                       | `min(var(--concorde-border-radius), 20px)` |

### Linear Progress

| CSS Variable                                  | Expected Type | Description                      | Default                                         |
| --------------------------------------------- | ------------- | -------------------------------- | ----------------------------------------------- |
| `--concorde-linear-progress-background-color` | `string`      | Background color of progress bar | `rgba(var(--concorde-primary-color-rgb), 0.18)` |
| `--concorde-linear-progress-height`           | `string`      | Height of the progress bar       | `4px`                                           |

### Link

| CSS Variable                  | Expected Type | Description             | Default                      |
| ----------------------------- | ------------- | ----------------------- | ---------------------------- |
| `--concorde-link-color`       | `string`      | Color of the link       |                              |
| `--concorde-link-hover-color` | `string`      | Hover color of the link | `var(--concorde-link-color)` |

### List

| CSS Variable                                     | Expected Type | Description                                 | Default |
| ------------------------------------------------ | ------------- | ------------------------------------------- | ------- |
| `--concorde-list-item-hover-color`               | `string`      | Hover color for clickable list item         |         |
| `--concorde-list-item-hover-background-color`    | `string`      | Hover background for clickable list item    |         |
| `--concorde-list-item-selected-color`            | `string`      | Selected color for clickable list item      |         |
| `--concorde-list-item-selected-background-color` | `string`      | Selected background for clickable list item |         |

### Menu

| CSS Variable                             | Expected Type | Description                      | Default                                           |
| ---------------------------------------- | ------------- | -------------------------------- | ------------------------------------------------- |
| `--concorde-menu-bg-color`               | `string`      | Background color of menu         | `rgba(var(--concorde-default-background-rgb), 1)` |
| `--concorde-menu-item-hover-color`       | `string`      | Hover color of menu item         |                                                   |
| `--concorde-menu-item-hover-bg-color`    | `string`      | Hover background of menu item    | `rgba(var(--concorde-primary-text-rgb), 0.12)`    |
| `--concorde-menu-item-selected-color`    | `string`      | Selected color of menu item      | `var(--concorde-menu-item-hover-color)`           |
| `--concorde-menu-item-selected-bg-color` | `string`      | Selected background of menu item | `rgba(var(--concorde-primary-text-rgb), 0.12)`    |

### Mobile Stepper

Refer also to Button tokens.

| CSS Variable                                             | Expected Type | Description                        | Default                         |
| -------------------------------------------------------- | ------------- | ---------------------------------- | ------------------------------- |
| `--concorde-mobile-stepper-color`                        | `string`      | Text color of mobile stepper       | `var(--concorde-primary-text)`  |
| `--concorde-mobile-stepper-background-color`             | `string`      | Background color of mobile stepper | `#ffffff`                       |
| `--concorde-mobile-stepper-step-background-color`        | `string`      | Step indicator background color    | `#e6eef7`                       |
| `--concorde-mobile-stepper-active-step-background-color` | `string`      | Active step background color       | `var(--concorde-primary-color)` |

### Modal

| CSS Variable               | Expected Type | Description      | Default                             |
| -------------------------- | ------------- | ---------------- | ----------------------------------- |
| `--concorde-modal-spacing` | `string`      | Spacing in modal | `calc(var(--concorde-spacing) * 5)` |

### Popover

None

### Radio

| CSS Variable                       | Expected Type | Description                         | Default                        |
| ---------------------------------- | ------------- | ----------------------------------- | ------------------------------ |
| `--concorde-radio-label-color`     | `string`      | The color of the radio label        | `var(--concorde-primary-text)` |
| `--concorde-radio-unchecked-color` | `string`      | The unchecked color of a radio      | `var(--concorde-outline)`      |
| `--concorde-radio-error-color`     | `string`      | The color of a radio in error state | `var(--concorde-error-color)`  |

### Radio Group

Refer also to Radio tokens.

| CSS Variable                   | Expected Type | Description                             | Default |
| ------------------------------ | ------------- | --------------------------------------- | ------- |
| `--concorde-radio-group-scale` | `number`      | The spacing multiplier of a radio group | `4`     |

### Rating

Refer also to Icon Button & Tooltip tokens.

| CSS Variable                        | Expected Type | Description                                                             | Default                         |
| ----------------------------------- | ------------- | ----------------------------------------------------------------------- | ------------------------------- |
| `--concorde-rating-unchecked-color` | `string`      | The unchecked color of the rating                                       | `var(--concorde-outline)`       |
| `--concorde-rating-checked-color`   | `string`      | The checked color of the rating and hover color of the unchecked rating | `var(--concorde-primary-color)` |

### Spacing

Variants: Inset, Inline & Stack

| CSS Variable                         | Expected Type | Description                                             | Default                               |
| ------------------------------------ | ------------- | ------------------------------------------------------- | ------------------------------------- |
| `--concorde-spacing-scale`           | `number`      | The spacing multiplier                                  | `1`                                   |
| `--concorde-spacing-align-items`     | `string`      | The CSS align-items property of the spacing element     | `flex-start`                          |
| `--concorde-spacing-justify-content` | `string`      | The CSS justify-content property of the spacing element | `var(--concorde-spacing-align-items)` |

### Stepper Input

Refer also to Icon Button tokens.

| CSS Variable                             | Expected Type | Description                        | Default                              |
| ---------------------------------------- | ------------- | ---------------------------------- | ------------------------------------ |
| `--concorde-stepper-field-error-color`   | `string`      | The error state color of the input | `var(--concorde-error-color)`        |
| `--concorde-stepper-field-border-color`  | `string`      | The border color of the input      | `var(--concorde-outline)`            |
| `--concorde-text-field-color`            | `string`      | The color of the input             | `var(--concorde-primary-text)`       |
| `--concorde-text-field-background-color` | `string`      | The background color of the input  | `var(--concorde-default-background)` |

### Swiperable Drawer

None

### Switch

| CSS Variable                                   | Expected Type | Description                                  | Default                           |
| ---------------------------------------------- | ------------- | -------------------------------------------- | --------------------------------- |
| `--concorde-switch-unchecked-color`            | `string`      | The color of the unchecked switch            | `var(--concorde-outline)`         |
| `--concorde-switch-unchecked-background-color` | `string`      | The background color of the unchecked switch | `var(--concorde-neutral-surface)` |
| `--concorde-switch-border-radius`              | `string`      | The border radius of the switch              | `9999px`                          |

### Tab

Refer also to Icon tokens.

| CSS Variable                             | Expected Type | Description                                 | Default                           |
| ---------------------------------------- | ------------- | ------------------------------------------- | --------------------------------- |
| `--concorde-tab-button-color`            | `string`      | The color of the tab button                 | `var(--concorde-primary-color)`   |
| `--concorde-tab-button-hover-bg-color`   | `string`      | The hover background color of tab button    | `9999px`                          |
| `-concorde-tab-button-selected-bg-color` | `string`      | The selected background color of tab button | `var(--concorde-neutral-surface)` |

### Textarea

Refer to Input tokens.

### Toggle Button

Refer to Button tokens.

### Toggle Group

Refer also to Spacing, Typography & Toggle Button tokens.

| CSS Variable                            | Expected Type | Description                                         | Default |
| --------------------------------------- | ------------- | --------------------------------------------------- | ------- |
| `--concorde-toggle-button-border-color` | `string`      | The custom border color of the toggle group buttons |         |

### Tooltip

None

### Typography

| CSS Variable                  | Expected Type | Description           | Default                        |
| ----------------------------- | ------------- | --------------------- | ------------------------------ |
| `--concorde-typography-color` | `string`      | The color of the text | `var(--concorde-primary-text)` |

### Upload Zone

| CSS Variable                                  | Expected Type | Description                              | Default                                         |
| --------------------------------------------- | ------------- | ---------------------------------------- | ----------------------------------------------- |
| `--concorde-dropzone-accepted-color`          | `string`      | The background color of an accepted drop |                                                 |
| `--concorde-dropzone-rejected-color`          | `string`      | The background color of a rejected drop  | `var(--concorde-error-color)`                   |
| `--concorde-dropzone-active-background-color` | `string`      | The background color of an active drop   | `rgba(var(--concorde-primary-color-rgb), 0.18)` |
