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
