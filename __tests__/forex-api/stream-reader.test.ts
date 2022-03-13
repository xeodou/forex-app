import { CurrencyRate } from "lib/forex-api/client";
import { StreamReader } from "lib/forex-api/stream-reader";
import { TextEncoder } from "util";

const mockData = [
  {
    from: "USD",
    to: "JPY",
    bid: 0.8014505466183891,
    ask: 0.7839126536448034,
    price: 0.7926816001315963,
    time_stamp: "2022-03-12T14:36:44.765Z",
  },
];

describe("stream-reader", () => {
  let streamReader: StreamReader<CurrencyRate>;

  it("should create an instane of stream-reader", async () => {
    streamReader = new StreamReader<CurrencyRate>({
      // @ts-ignore
      getReader() {
        let count = 0;
        return {
          async read() {
            const encoder = new TextEncoder();
            const uint8array = encoder.encode(JSON.stringify(mockData));
            count++;
            return Promise.resolve({ value: uint8array, done: count > 1 });
          },
          cancel() {
            return Promise.resolve();
          },
        };
      },
      cancel() {
        return Promise.resolve();
      },
    });
  });

  it("should read the chunk from the stream", async () => {
    const fn = jest.fn();

    try {
      await streamReader.read(fn);
    } catch (err) {
      console.log(err);
    }

    expect(fn).toBeCalledWith(mockData);
  });

  it("should cancel the stream", async () => {
    await streamReader.cancel();

    const fn = jest.fn();
    await streamReader.read(fn);

    expect(fn).not.toBeCalled();
    expect(streamReader.closed).toBe(true);
  });
});
