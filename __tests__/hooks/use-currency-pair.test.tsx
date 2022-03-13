import { renderHook, act } from "@testing-library/react-hooks";
import { CurrencyPairProvider, defaultCurrencyPair, useCurrencyPair } from "hooks/use-currency-pair";
import { FC } from "react";

describe("hooks/use-currency-pair", () => {
  it("should render the with initial currency pair", () => {
    const wrapper: FC = ({ children }) => (
      <CurrencyPairProvider initialValue={defaultCurrencyPair}>{children}</CurrencyPairProvider>
    );

    const { result } = renderHook(() => useCurrencyPair(), { wrapper });

    expect(result.current[0]).toEqual(defaultCurrencyPair);
  });

  it("should able to change the currency pair", () => {
    const wrapper: FC = ({ children }) => (
      <CurrencyPairProvider initialValue={defaultCurrencyPair}>{children}</CurrencyPairProvider>
    );

    const { result } = renderHook(() => useCurrencyPair(), { wrapper });

    act(() => {
      result.current[1](["EUR", "USD"]);
    });

    expect(result.current[0]).toEqual(["EUR", "USD"]);
  });
});
