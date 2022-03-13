import { CurrencySelector } from "components/currency-selector";
import { IconSwap } from "components/icons";
import { useCurrencyPair } from "hooks/use-currency-pair";

export const CurrencySwap = ({}) => {
  const [currencyPair, setCurrencyPair] = useCurrencyPair();

  const onFromCurrencyChange = (from: string) => {
    setCurrencyPair([from, currencyPair[1]]);
  };

  const onToCurrencyChange = (to: string) => {
    setCurrencyPair([currencyPair[0], to]);
  };

  const onSwitchClick = () => {
    setCurrencyPair([currencyPair[1], currencyPair[0]]);
  };

  return (
    <div className="flex items-center">
      <CurrencySelector onSelected={onFromCurrencyChange} value={currencyPair[0]} />
      <button
        type="button"
        aria-label="Switch currencies"
        className="font-medium text-sm p-2.5 text-center inline-flex items-center"
        onClick={onSwitchClick}
      >
        <IconSwap></IconSwap>
      </button>
      <CurrencySelector onSelected={onToCurrencyChange} value={currencyPair[1]} />
    </div>
  );
};
