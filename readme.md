# Vanilla JSX Support for raw DOM elements

Simple solution to use jsx components in a vanilla DOM/JS project without the need for libraries like React or Solid.

Create a file with .tsx extension:

```
import { renderElement } from "./create-element";
import { createJSXElement } from "./create-jsx-element";

renderElement(<div>Hello JSX</div>, document.body);
```


## Start project

```
npm install
npm run dev
```

## Implementation details and usage

The following is a simple implementation of JSX support for raw DOM elements. This is a simple implementation that does not support all the features of JSX. It is a simple implementation that allows for the use of JSX in a project that does not use a framework like React but just vanilla DOM.

Files where the below is used, need to have the extension .tsx to enable typescript to use the JSX syntax.

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
See https://www.typescriptlang.org/docs/handbook/jsx.html for more details on the jsx settings.

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

## Difference with React JSX

React uses a virtual DOM implementation under the hood to manage the DOM. This implementation does not use a virtual DOM. It directly manipulates the DOM. Although there's no state management or lifecycle methods in this implementation, it does allow for composition using JSX components which leads to cleaner more readable and declarative code in a Vanilla DOM codebase.

The jsx elements are converted to function calls by typescript using settings in the tsconfig.json file. The function that is called is createJSXElement, which is defined in this project. This function creates the DOM elements and sets the attributes/classes/event handlers.

React builds a big virtual dom tree, and needs a single 'createRoot' call to initialize the application. However, in this implementation, the renderElement function is called to render the jsx element to the DOM. This function can be called multiple times to render different parts of the application when needed. When you call multiple times for the same component, the component is added multiple times to the DOM. This is something you need to be aware of when using this implementation.

## Web Components

This implementation can be used in conjunction with web components. Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. 

Web components can be use in jsx components like so:

```jsx
<div>
  <web-component></web-component>
</div>
```

However, jsx can also be used to create web components. The following is an example of a web component created using jsx:

```jsx
import { renderElement } from "./create-element";
import { createJSXElement } from "./create-jsx-element";

class WebComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    renderElement(<div>Web Component</div>, shadow);
  }
}

export const initWebComponent = () => {
  customElements.define("web-component", WebComponent);
};
```

## TODO

- conditional rendering
- state management
- signals support (inline with the TC39 proposal for signals)
- helper methods using builder pattern to handle DOM elements manipulation
