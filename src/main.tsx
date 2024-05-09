import "./style.css";
import { Counter } from "./counter";
import { renderElement } from "./create-element";
import { createJSXElement } from "./create-jsx-element";

renderElement(<Counter />, document.body);
