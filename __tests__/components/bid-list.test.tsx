import { act, fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { CurrencySwap } from "components/currency-swap";
import { CurrencyPairProvider, defaultCurrencyPair } from "hooks";
import { BidsList } from "components/bids-list";

const mockRates = [
  {
    from: "USD",
    to: "JPY",
    bid: 0.8014505466183891,
    ask: 0.7839126536448034,
    price: 0.7926816001315963,
    time_stamp: "2022-03-12T14:36:44.765Z",
  },
  {
    from: "USD",
    to: "JPY",
    bid: 0.8014505466183891,
    ask: 0.7839126536448034,
    price: 0.7926816001315963,
    time_stamp: "2022-03-12T14:37:44.765Z",
  },
];

describe("bid-list", () => {
  let container: HTMLDivElement;
  let toLocaleTimeString: jest.SpyInstance<string, any>;

  beforeEach(() => {
    toLocaleTimeString = jest.spyOn(Date.prototype, 'toLocaleString');
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null as unknown as HTMLDivElement;
    toLocaleTimeString.mockRestore();
  });

  it("should render the list", () => {
    // Mock the toLocaleString returns to keep the same return across the different CI server.
    toLocaleTimeString.mockReturnValueOnce("3/12/2022, 10:37:44 PM");

    act(() => {
      render(<BidsList rates={mockRates} />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();

    expect(container.querySelector("header")?.children.length).toBe(4);

    expect(container.querySelectorAll("ul")?.length).toBe(2);
    expect(container.querySelectorAll("ul")[0].classList.contains("bg-slate-300")).toBeTruthy();
    expect(container.querySelectorAll("ul")[1].classList.contains("bg-slate-100")).toBeTruthy();
  });
});
