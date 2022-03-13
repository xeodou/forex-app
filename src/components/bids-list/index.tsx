import { CurrencyRate } from "lib/forex-api/client";
import { FC } from "react";

export const BidsList: FC<{ rates: CurrencyRate[] }> = ({ rates }) => {
  return (
    <div className="bids-list w-full">
      <header className="flex justify-around uppercase">
        <span>CUR</span>
        <span>Time</span>
        <span>Ask</span>
        <span>Bid</span>
      </header>
      <div className="h-60 overflow-y-auto flex flex-col">
        {rates.map((rate, index) => (
          <ul
            key={rate.time_stamp}
            className={`flex justify-around ${index % 2 === 0 ? "bg-slate-300" : "bg-slate-100 "}`}
          >
            <li>{`${rate.from}/${rate.to}`}</li>
            <li>{new Date(rate.time_stamp).toLocaleString()}</li>
            <li>{rate.ask}</li>
            <li>{rate.bid}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
