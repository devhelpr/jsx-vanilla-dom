import "./style.css";
import { Counter } from "./counter";
import { renderElement } from "./create-element";
import { createJSXElement, Fragment } from "./create-jsx-element";
import { List } from "./list";

renderElement(
  <>
    <Counter />
    <List />
  </>,
  document.body
);
