import { renderElement } from "./create-element";
import { createJSXElement, Fragment } from "./create-jsx-element";

function ListItem() {
  let li: HTMLUListElement | null = null;
  return (
    <li getElement={(element: HTMLUListElement) => (li = element)}>
      Item {(Math.random() * 100).toFixed(2)}{" "}
      <button
        click={(e: MouseEvent) => {
          if (!li) {
            return;
          }
          li.remove();
        }}
      >
        Remove
      </button>
    </li>
  );
}

export function List() {
  let ul: HTMLUListElement | null = null;
  const addElement = () => {
    if (!ul) {
      return;
    }
    renderElement(<ListItem />, ul);
  };

  return (
    <>
      <button class="button" click={(e: MouseEvent) => addElement()}>
        Add element
      </button>
      <ul getElement={(element: HTMLUListElement) => (ul = element)}></ul>
    </>
  );
}
