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

export interface IDOMElement {
  id: string;
  domElement: DOMElementNode;
}

export type DOMElementNode = HTMLElement | SVGElement | Text;

export type EventHandler = (event: Event) => void | boolean;

export const renderElement = (element: JSX.Element, parent: HTMLElement) => {
  parent.appendChild(element as unknown as HTMLElement);
};

export const createElement = (
  elementName: string,
  attributes?: Record<string, string | number | object | EventHandler>,
  parent?: DOMElementNode,
  content?: string | HTMLElement | JSX.Element,
  id?: string
): IDOMElement => {
  const nodeId = id ?? crypto.randomUUID();
  let domElement: HTMLElement | Text | undefined = undefined;
  let isTextNode = false;
  if (!elementName && content) {
    if (typeof content === "string") {
      isTextNode = true;
      domElement = document.createTextNode(content);
    } else {
      domElement = document.createElement("div");
    }
  } else {
    domElement = document.createElement(elementName);
  }
  if (domElement && attributes && !isTextNode) {
    Object.keys(attributes).forEach((key) => {
      if (typeof attributes[key] === "object") {
        Object.keys(attributes[key]).forEach((styleProperty: string) => {
          (domElement as unknown as HTMLElement).style.setProperty(
            styleProperty,
            (attributes[key] as unknown as any)[styleProperty]
          );
        });
      } else if (typeof attributes[key] === "function") {
        (domElement as unknown as HTMLElement).addEventListener(
          key,
          attributes[key] as EventHandler
        );
      } else if (typeof attributes[key] === "string") {
        (domElement as unknown as HTMLElement).setAttribute(
          key,
          attributes[key] as string
        );
      } else if (typeof attributes[key] === "number") {
        (domElement as unknown as HTMLElement).setAttribute(
          key,
          attributes[key].toString()
        );
      }
    });
  }
  if (parent) {
    parent.appendChild(domElement);
  }
  if (content && elementName) {
    if (typeof content === "string") {
      domElement.textContent = content;
    } else {
      domElement.appendChild(content as unknown as HTMLElement);
    }
  }
  return {
    id: nodeId,
    domElement: domElement,
  };
};
