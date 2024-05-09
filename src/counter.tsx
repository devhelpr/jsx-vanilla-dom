import { createJSXElement, Fragment } from "./create-jsx-element";

export function Counter() {
  let div: HTMLDivElement | null = null;
  let counter = 0;
  const setCounter = (count: number) => {
    if (!div) {
      return;
    }
    counter = count;
    div.textContent = `count is ${counter}`;
  };
  setCounter(0);

  return (
    <>
      <button class="button" click={(e: MouseEvent) => setCounter(counter + 1)}>
        Click
      </button>
      <div getElement={(element: HTMLDivElement) => (div = element)}></div>
    </>
  );
}
