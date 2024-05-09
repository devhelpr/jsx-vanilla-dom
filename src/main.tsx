import "./style.css";
import { Counter } from "./counter";
import { renderElement } from "./create-element";
import { createJSXElement, Fragment } from "./create-jsx-element";
import { List } from "./list";
import { initWebComponent } from "./web-component";

initWebComponent();

renderElement(
  <>
    <web-component></web-component>
    <Counter />
    <List />
  </>,
  document.body
);
