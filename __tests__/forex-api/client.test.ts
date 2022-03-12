import { ForexApiClient } from "lib/forex-api/client";
import fetchMock from "jest-fetch-mock";

describe("forex-api", () => {
  it("should create an instance of ForexApiClient", () => {
    expect(new ForexApiClient("http://localhost:8080", "lorem")).toBeTruthy();
  });

  it("should create singletone instance", () => {
    const client1 = ForexApiClient.createClient(
      "http://localhost:8080",
      "lorem"
    );
    const client2 = ForexApiClient.createClient(
      "http://localhost:8080",
      "lorem"
    );
    expect(client1).toBe(client2);
  });

  describe("getRates", () => {
    const client = ForexApiClient.createClient(
      "http://localhost:8080",
      "10dc303535874aeccc86a8251e6992f5"
    );

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it("should streaming the realtime rates", async () => {
      fetchMock.mockImplementationOnce(
        (url: string | Request | undefined, init: RequestInit | undefined) => {
          expect(url).toBe("http://localhost:8080/streaming/rates?pair=USDJPY");
          expect(init?.method).toBe("GET");
          expect(init?.headers).toEqual({
            token: "10dc303535874aeccc86a8251e6992f5",
          });
          return Promise.resolve(
            new Response(
              JSON.stringify({
                from: "USD",
                to: "JPY",
                bid: 0.8014505466183891,
                ask: 0.7839126536448034,
                price: 0.7926816001315963,
                time_stamp: "2022-03-12T14:36:44.765Z",
              })
            )
          );
        }
      );

      await client.getRates("USD", "JPY");
    });
  });
});
