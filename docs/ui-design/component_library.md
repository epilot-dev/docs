---
title: Components Library
hide_title: true
sidebar_position: 1
---

<h1 align="left" style={{display:"inline-block"}}>Components Library<span
  style={{ display: "inline-block", padding: "2px 8px", color: "#fff", fontWeight: "bold", backgroundColor: "#df0000", borderRadius: "4px", fontSize: "1rem", verticalAlign: "middle" }}>ALPHA</span></h1>

<h2 style={{ fontWeight: "300", color: "gray" }}>Learn the basics of using epilot UI Components Library to build your custom capabilities on top of our 360 platform.</h2>

[[SDK](https://www.npmjs.com/package/@epilot/base-elements)]
[[Storybook](https://base-elements.dev.epilot.io/)]

The entire epilot platform is built around the concept of flexibility and customization. We believe that the best way to achieve this is by providing a set of UI components that can be used to build custom capabilities on top of the epilot platform.

The epilot UI Components Library is built using [React](https://reactjs.org/) and [Material UI](https://material-ui.com/). And it's distributed as a set of npm packages:

- [@epilot/base-elements](https://www.npmjs.com/package/@epilot/base-elements)
- [@epilot/base-modules](https://www.npmjs.com/package/@epilot/base-modules)

## Storybook

The epilot UI Components Library is documented using [Storybook](https://storybook.js.org/). You can find the latest version of the Storybook under the following links:

- <https://base-elements.dev.epilot.io>
- <https://base-modules.dev.epilot.io>

## Getting Started

To get started, you can install the package using npm:

```bash
npm install @epilot/base-elements
```

You can then import the components in your React application:

```jsx
import { Button, ThemeProvider } from '@epilot/base-elements'

function App() {
  return (
    <ThemeProvider>
      <Button>My Button</Button>
    </ThemeProvider>
  )
}
```
