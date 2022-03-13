import "../../styles/index.scss";
import type { AppProps } from "next/app";
import { CurrencyPair, CurrencyPairProvider, defaultCurrencyPair } from "hooks/use-currency-pair";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter();
  const currencyPair = query.pair ? (query.pair as string).split(",") : defaultCurrencyPair;

  return (
    <CurrencyPairProvider initialValue={currencyPair as CurrencyPair}>
      <Component {...pageProps} />
    </CurrencyPairProvider>
  );
}

export default MyApp;
