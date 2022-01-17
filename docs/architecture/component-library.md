---
sidebar_position: 5
---

# Component Library

[[SDK](https://www.npmjs.com/package/@epilot/base-elements)]
[[Storybook](https://base-elements.dev.epilot.io/)]

We provide a shared React component library, based on [Material UI](https://mui.com/) for shared frontend UI elements.

The component library is distributed as a set of npm packages:

- [@epilot/base-elements](https://www.npmjs.com/package/@epilot/base-elements)
- [@epilot/base-modules](https://www.npmjs.com/package/@epilot/base-modules)

The storybook documentation for the component library can be found under the following links:

- https://base-elements.dev.epilot.io/
- https://base-modules.dev.epilot.io/

## Usage

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
