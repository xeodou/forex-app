import { act, fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { CurrencySwap } from "components/currency-swap";
import { CurrencyPairProvider, defaultCurrencyPair } from "hooks";

describe("currency-swap", () => {
  let container: HTMLDivElement;

  const Wrapper = () => (
    <CurrencyPairProvider initialValue={defaultCurrencyPair}>
      <CurrencySwap />
    </CurrencyPairProvider>
  );

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
      render(<Wrapper />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();

    expect(container.querySelectorAll("select")?.length).toBe(2);
    expect(container.querySelector("button")?.getAttribute("aria-label")).toEqual("Switch currencies");
  });

  it("should switch the currency pair", () => {
    act(() => {
      render(<Wrapper />, container);
    });

    expect(container.querySelectorAll("select")?.length).toBe(2);
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(pretty(container.querySelectorAll("select")[0].value)).toEqual(defaultCurrencyPair[1]);
    expect(pretty(container.querySelectorAll("select")[1].value)).toEqual(defaultCurrencyPair[0]);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should change the from currency", () => {
    act(() => {
      render(<Wrapper />, container);
    });

    expect(container.querySelectorAll("select")?.length).toBe(2);
    const from = container.querySelectorAll("select")[0] as HTMLSelectElement;
    expect(from).toBeTruthy();

    fireEvent.change(from, { target: { value: "CNY" } });

    expect(pretty(container.querySelectorAll("select")[0].value)).toEqual("CNY");

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("should change the to currency", () => {
    act(() => {
      render(<Wrapper />, container);
    });

    expect(container.querySelectorAll("select")?.length).toBe(2);
    const to = container.querySelectorAll("select")[1] as HTMLSelectElement;
    expect(to).toBeTruthy();

    fireEvent.change(to, { target: { value: "CNY" } });

    expect(pretty(container.querySelectorAll("select")[1].value)).toEqual("CNY");

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
