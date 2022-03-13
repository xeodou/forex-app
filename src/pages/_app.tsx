import "../../styles/index.scss";
import type { AppProps } from "next/app";
import { CurrencyPair, CurrencyPairProvider, defaultCurrencyPair, NotifyContextProvider } from "hooks";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter();
  const currencyPair = query.pair ? (query.pair as string).split(",") : defaultCurrencyPair;

  return (
    <CurrencyPairProvider initialValue={currencyPair as CurrencyPair}>
      <NotifyContextProvider>
        <Component {...pageProps} />
      </NotifyContextProvider>
    </CurrencyPairProvider>
  );
}

export default MyApp;
