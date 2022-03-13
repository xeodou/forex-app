import { FC } from "react";
import { currencies } from "utils/currencies";

export interface CurrencyHeaderProps {
  // On selected currency changes
  onSelected?: (currency: string) => void;
  // Specific the default selected currency
  value?: string;
}

export const CurrencySelector: FC<CurrencyHeaderProps> = ({ onSelected, value }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelected && onSelected(event.target.value);
  };

  return (
    <select
      onChange={onChange}
      value={value}
      className="h-full py-0 pl-4 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm "
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};
