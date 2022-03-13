import { act, fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { CurrencySelector } from "components/currency-selector";
import { currencies } from "utils/currencies";

describe("currency-selector", () => {
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

  it("should render the selector", () => {
    act(() => {
      render(<CurrencySelector />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();

    expect(container.querySelector("select")).toBeTruthy();
    expect(container.querySelectorAll("option").length).toBe(currencies.length);
  });

  it("should render with default value", () => {
    const currency = currencies[currencies.length - 1];

    act(() => {
      render(<CurrencySelector value={currency} />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();

    expect(container.querySelector("select")?.value).toBe(currency);
  });

  it("should select different option", () => {
    const onSelected = jest.fn();

    act(() => {
      render(<CurrencySelector onSelected={onSelected} />, container);
    });

    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select).toBeTruthy();

    fireEvent.change(select, { target: { value: currencies[1] } });
    expect(onSelected).toHaveBeenCalledWith(currencies[1]);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
