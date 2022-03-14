import { renderHook, act, RenderResult } from "@testing-library/react-hooks";
import { NotifyContextProvider, useForexRates } from "hooks";
import { FC } from "react";
import fetchMock from "jest-fetch-mock";
import { newStreamResponse } from "../fixture/mock-data";
import { mockCurrencyRate } from "../fixture/mock-data";
import { CurrencyRate } from "lib/forex-api/client";

describe("hooks/use-currency-pair", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_FOREX_API_BASE_URL = "http://localhost:8080";
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should render the with initial value", async () => {
    fetchMock.mockImplementationOnce((url: string | Request | undefined, init: RequestInit | undefined) => {
      expect(url).toBe("http://localhost:8080/streaming/rates?pair=USDJPY");
      expect(init?.method).toBe("GET");
      return Promise.resolve(newStreamResponse(mockCurrencyRate));
    });
    const wrapper: FC = ({ children }) => <NotifyContextProvider>{children}</NotifyContextProvider>;
    const { result, waitForValueToChange } = renderHook(() => useForexRates("USD", "JPY"), { wrapper });

    await waitForValueToChange(() => result.current.forexRates);

    expect(result?.current.forexRates).toEqual(mockCurrencyRate);
  });

  it("should render the with fresh", async () => {
    let count = 1;
    fetchMock.mockImplementation((url: string | Request | undefined, init: RequestInit | undefined) => {
      expect(url).toBe("http://localhost:8080/streaming/rates?pair=USDJPY");
      expect(init?.method).toBe("GET");
      return Promise.resolve(newStreamResponse(mockCurrencyRate, count++));
    });
    const wrapper: FC = ({ children }) => <NotifyContextProvider>{children}</NotifyContextProvider>;
    const { result, waitForValueToChange } = renderHook(() => useForexRates("USD", "JPY"), { wrapper });

    await waitForValueToChange(() => result.current.reset);

    act(() => {
      result.current.reset();
    });

    // When the reset is called, the hook should re-render and this time we will recived two chunks
    await waitForValueToChange(() => result.current.reset);

    expect(result?.current.forexRates).toEqual(mockCurrencyRate.concat(mockCurrencyRate));
  });
});
