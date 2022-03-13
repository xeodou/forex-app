import React, { FC, useState } from "react";

/**
 * A pair of currency defined by a `from` and `to` currency.
 */
export type CurrencyPair = [string, string];

/**
 * Default currency pair to use when the app is first loaded.
 */
export const defaultCurrencyPair: CurrencyPair = ["USD", "JPY"];

export interface CurrencyPairContextProps {
  // The current currency pair
  currencyPair: CurrencyPair;
  // Change the current currency pair
  setCurrencyPair: (currencyPair: CurrencyPair) => void;
}

/**
 * Context provider for currency pair.
 */
export const CurrencyPairContext = React.createContext<CurrencyPairContextProps>({} as CurrencyPairContextProps);

export const CurrencyPairProvider: FC<{ initialValue: CurrencyPair }> = ({ children, initialValue }) => {
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>(initialValue);

  return (
    <CurrencyPairContext.Provider value={{ currencyPair, setCurrencyPair }}>{children}</CurrencyPairContext.Provider>
  );
};

/** use the currency pair context */
export const useCurrencyPair = (): [CurrencyPair, (currencyPair: CurrencyPair) => void] => {
  const { currencyPair, setCurrencyPair } = React.useContext(CurrencyPairContext);

  return [currencyPair, setCurrencyPair];
};
