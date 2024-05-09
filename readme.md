# Vanilla JSX Support for raw DOM elements

## Start project

```
npm install
npm run dev
```

## Usage

The following is a simple implementation of JSX support for raw DOM elements. This is a simple implementation that does not support all the features of JSX. It is a simple implementation that allows for the use of JSX in a project that does not use a framework like React but just vanilla DOM.

```jsx
import { renderElement } from "./create-element";
import { createJSXElement } from "./create-jsx-element";

const Element = () => <div>Hello JSX</div>;
renderElement(<Element />, document.body);

```

createJSXElement itself uses a basic helper function to create DOM elements using document.createElement and sets attributes/classes/basic event handlers.

To make the above possible in a typescript project, the following additions are needed in the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createJSXElement"
  }
}
```

And some global types need to be added to the project:

```typescript
export interface JSXElement<P = any, T = string> {
  type: T;
  props: P;
}

type Tag = string | ((props: any, children: any[]) => HTMLElement);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends JSXElement<any, Tag> {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
```

