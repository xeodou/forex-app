import { forexApiClient } from "lib/forex-api-client";
import { CurrencyRate } from "lib/forex-api/client";
import { StreamReader } from "lib/forex-api/stream-reader";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook to fetch forex rates from the forex api.
 *
 * @param from The currency to convert from
 * @param to The currency to convert to
 * @param limit The maximum number of rates to return
 * @returns
 */
export const useForexRates = (from: string, to: string, limit = 40) => {
  const [streamReader, setStreamReader] = useState<StreamReader<CurrencyRate[]>>();
  const [forexRates, setForexRates] = useState<CurrencyRate[]>([]);
  const [forexError, setForexError] = useState<Error>();

  // Read the chunk from the stream
  const readChunk = (rates: CurrencyRate[]) => {
    setForexRates((old) => {
      if (old.length >= limit) {
        old.shift();
      }
      return old.concat(rates);
    });
  };

  const fetchForexRates = async () => {
    try {
      if (streamReader) {
        await streamReader.cancel();
      }

      const reader = await forexApiClient.getRates(from, to);
      setStreamReader(reader);
      await reader.read(readChunk);
    } catch (error) {
      console.log(error);
      setForexError(error as Error);
    }
  };

  /**
   * Reset the stream and fetch the new rates.
   */
  const reset = useCallback(() => {
    setForexRates([]);
    setForexError(undefined);
    fetchForexRates();
  }, [streamReader]);

  useEffect(() => {
    if (from && to) {
      fetchForexRates();
    }
    return () => {
      if (streamReader) {
        streamReader.cancel();
      }
    };
  }, [from, to]);

  return {
    forexRates,
    forexError,
    reset,
  };
};
