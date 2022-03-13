import { act } from "@testing-library/react-hooks";
import { IconFresh, IconSwap } from "components/icons";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";

describe("icons", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null as unknown as HTMLDivElement;
  });

  describe("icon-swap", () => {
    it("should render the icon", () => {
      act(() => {
        render(<IconSwap />, container);
      });

      expect(pretty(container.innerHTML)).toMatchSnapshot();

      expect(container.querySelector("svg")).toBeTruthy();
    });
  });

  describe("icon-fresh", () => {
    it("should render the icon", () => {
      act(() => {
        render(<IconFresh />, container);
      });

      expect(pretty(container.innerHTML)).toMatchSnapshot();

      expect(container.querySelector("svg")).toBeTruthy();
    });
  });
});
