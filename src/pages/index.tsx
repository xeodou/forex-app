import { BidsList } from "components/bids-list";
import { CurrencySwap } from "components/currency-swap";
import { IconFresh } from "components/icons";
import { Notify } from "components/notify";
import { useCurrencyPair, useForexRates } from "hooks";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const [currencyPair] = useCurrencyPair();

  const { forexRates, reset } = useForexRates(currencyPair[0], currencyPair[1]);

  return (
    <div className="relative">
      <Head>
        <title>Foreign Exchange Application</title>
        <meta name="description" content="Realtime foreign exchange for broker" />
      </Head>
      <main className="container max-w-2xl mx-auto px-4 sm:p-6 bg-white overflow-hidden">
        <header className="flex justify-between">
          <CurrencySwap />
          <button aria-label="Refresh" onClick={reset}>
            <IconFresh />
          </button>
        </header>
        <BidsList rates={forexRates}></BidsList>
      </main>
      <div className="container fixed mx-auto bottom-0 z-20 w-1/2 m-auto inset-x-0 ">
        <Notify></Notify>
      </div>
    </div>
  );
};

export default Home;
