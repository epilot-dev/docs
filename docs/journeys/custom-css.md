---
sidebar_position: 9
---

# Custom CSS (BETA)

This guide will help you understand and use Custom CSS to further personalize your journeys and branding beyond the default Design Builder settings.

![Custom CSS](../../static/img/design-builder-custom-css.png)

## Introduction

Custom CSS gives you the power to:

- **Enhance your brand’s look:** Customize buttons, links, cards, and more with your own CSS rules.
- **Apply detailed styling:** Make adjustments at a global theme level, journey level, step level, or even block level.
- **Stand out:** Create unique, visually appealing designs that resonate with your end customers.

**Note:** This feature is part of our new Concorde design migration. Custom CSS applies only to journeys, and not the End Customer Portal. We’re continuously improving support for this feature, so please refer to the latest documentation for updates – release notes will include updates.

**Pricing:** This feature is only available from the Professional pricing plan.

## Styling Structure

### HTML Structure

The new journey design (Concorde Journey) consists of the following building blocks:

- **Layout:** Controls how the journey looks. E.g., Stack, Two Columns, Grid (beta).
- **Steps:** E.g., New Step, New Step 1, etc.
- **Blocks:** E.g., Text Input, Number Input, Products, etc.
- **Components:** E.g., Autocomplete, Input, Switch, Radio, Checkbox, etc.

Specific HTML Classes and IDs have been added and prefixed with `Concorde` for consistency to aid with targeting HTML elements properly through custom CSS.

The HTML structure of the journey based on these building blocks will be maintained using this guide: [Concorde HTML Layout Overview](/docs/ui-design/concorde-html-structure).

### Concorde Design Tokens

Since custom CSS is scoped to the new design, we have created a list of design tokens (CSS variables) that can be modified to create the desired effect.

The design tokens that are supported for the journey building blocks (mentioned above) can be found in this guide: [Concorde Design tokens](/docs/ui-design/concorde-design-tokens). This guide will be kept up to date to account for changes that could improve the usage of custom CSS.

## How Custom CSS Works

### CSS Structure Overview

When you add custom CSS, the system generates a single stylesheet that’s applied to your journey. This stylesheet is built from the CSS rules you write in the custom CSS editor in the Design Builder.

**Example of the CSS structure:**

```css
/* Custom CSS example */
:root {
  --concorde-primary-color: #005eb4;
  --concorde-secondary-color: #913997;
  /* ... other concorde design tokens ... */
}

/* Step CSS */
#Concorde-Step---123456789 {
  background-color: #f8f8f8;

  /* Block CSS */
  .Concorde-Image-Block {
    border-radius: 10px;
  }

  #Concorde-Block---123456789 {
    font-family: 'Helvetica, Arial, sans-serif';
  }
}
```

As seen above, there are some things to note:

- The use of **Concorde design tokens** is mentioned above. To view the full list: [Concorde Design tokens](/docs/ui-design/concorde-design-tokens).
- The use of maintained **HTML classes and IDs** is also mentioned above. To view the full list: [Concorde HTML Layout Overview](/docs/ui-design/concorde-html-structure).
- The final CSS is inserted into your journey’s `<head>` as a `<style>` tag with a unique ID (e.g., `custom-css-journey123`).

## Unsupported Rules

To avoid modifying the core layout and overall security of the journey, support for certain CSS properties has been removed:

- **Certain position rules:** `position: relative;` and `position: absolute;`
- **Hiding blocks completely:** `display: none;`
- **Background images:** `background: url(*);` and `background-image: url(*)`

## Custom CSS Configuration

In the Design Builder:

1. **Access the Advanced Configurator Panel.**
2. **Write or paste your CSS rules.** For example:

   ```css
   .Concorde-Button {
     background-color: var(--concorde-primary-color);
     color: #fff;
     border-radius: 4px;
   }
   ```

3. **Preview and Save:** As you type, a live preview shows how the styles affect your journeys. Once satisfied, save your changes.
4. **Test your live journey:** After saving your changes, you can check if your journey looks as expected by opening it in a new tab.

## Guidelines and Best Practices

### Use Supported Classes

We provide a public list of supported class names for components, blocks, steps and layouts (e.g., `Concorde-Button`, `Concorde-Link`, `Concorde-Topbar`). Please use these classes to ensure long-term compatibility.  
_Custom CSS: Maintained HTML Classes & HTML ID format_

### Design Tokens (CSS Variables)

Leverage our design tokens (CSS variables) to keep your custom styles consistent with your global theme. (e.g., `var(--concorde-primary-color)`)
[Concorde Design tokens](/docs/ui-design/concorde-design-tokens)

### Avoid Overriding Core Layouts

For stability, avoid using properties that could break the layout (e.g., `display`, `position`, or `z-index`). We may restrict these in the future for security and consistency.

### Keep It Concise

This helps maintain performance and manageability.

### Test Your CSS

Use the live preview feature to ensure that your CSS does not conflict with the core design. Errors will be highlighted so you can correct them before saving.

## FAQs

**Q: Will my custom CSS changes be maintained with future updates?**  
**A:** If you’re using the new Concorde design, your custom CSS will remain effective as long as you adhere to the supported class and variable guidelines. We are committed to maintaining backward compatibility, but changes to the core design may require adjustments. We will communicate any necessary changes in advance.

**Q: What if I want to apply changes only to a specific journey?**  
**A:** You can add style rules that apply to all Journeys. If not, feel free to use the specific block or step IDs to target sections that are scoped only to that journey. This ensures your styles won’t affect other journeys. We strongly recommend you use id selectors as little as possible to avoud conflicts across multiple journeys.

**Q: What happens if I delete a step or block?**  
**A:** When a step or block is deleted, the associated CSS rules should be removed from the final stylesheet, ensuring a clean and updated style application.

**Q: Can I get help if my CSS isn’t working as expected?**  
**A:** Yes! Our support documentation is available to help you troubleshoot and optimize your custom CSS.

## Conclusion

Custom CSS in Project Concorde provides a powerful way to create unique, branded experiences. With the ability to apply global, journey, step, and block-level styles, you have the flexibility to fully control your design without compromising the integrity of the base system.

For further questions or feedback, please reach out to our support team or visit our community forum.

## Examples

### Increase Text Sizes

This snippet below will increase the font sizes of all elements on the journey using CSS variables (design tokens):

```css
:root {
  --concorde-text-3xl: 2.5rem;
  --concorde-text-2xl: 2rem;
  --concorde-text-xl: 1.875rem;
  --concorde-text-lg: 1.5rem;
  --concorde-text-base: 1.25rem;
  --concorde-text-sm: 1rem;
  --concorde-text-xs: 0.875rem;
}
```

### Change Header Logo alignment

This snippet below modifies the alignment of the logo in the header of a journey

```css
:root {
  --concorde-topbar-logo-alignment: flex-start; // Left alignment
  --concorde-topbar-logo-alignment: center; // Center alignment (default)
  --concorde-topbar-logo-alignment: flex-end; // Right alignment
}
```

### Make Header sticky

This snippet below makes the journey header stuck to the top of the page when scrolling

```css
.Concorde-Topbar {
  position: sticky;
  top: 0;
  z-index: 99999;
}
```

### Change All Buttons

This snippet below will affect all buttons on the journey using CSS variables (design tokens): IconButtons, Buttons

```css
:root {
  --concorde-button-label-color: red;
  --concorde-button-background-color: white;
  --concorde-button-hover-bg-color: gray;
}
```

### Change Primary Button Styles

This snippet below will only change the colors of Primary Buttons on the journey using the maintained class. E.g Next / Submit button / Product Promo button

```css
.Concorde-Button__Primary {
  color: red;
  background-color: white;

  &:hover {
    color: darkred;
    background-color: gray;
  }
}
```

### Change DatePicker Background

This snippet below will only change the background of the Datepicker on the journey using CSS variables

```css
:root {
  --concorde-datepicker-calendar-bg-color: gray;
}
/* OR */
.Concorde-DatePicker {
  .Concorde-DatePicker__Calendar {
    background-color: gray;
  }
}
```

### Change ZipCode Background in Availability Block

This snippet below will only change the background colors of the zip code dropdown in the Availability block on journeys

```css
.Concorde-AvailabilityCheck-Block {
  --concorde-menu-bg-color: gray;
  --concorde-menu-item-hover-bg-color: white;
  --concorde-menu-item-selected-bg-color: red;
}
```

### Change Text Color of Product Tile Features

The snippet will set the color of the text in all product tile features to the --concorde-secondary-text design token

```css
.Concorde-ProductTile__Features p {
  color: var(--concorde-secondary-text);
}
```

### Modify all Submit/Next Button or Back Buttons

```css
/* Submit/Next Button */
.Concorde-ActionBar__CTAButton {
  background: yellowgreen;
  &:hover {
    color: yellowgreen;
    background-color: gray;
  }
}

/* Back Button */
.Concorde-ActionBar__BackButton {
  color: yellowgreen;
  &:hover {
    color: white;
    background-color: gray;
  }
}
```
