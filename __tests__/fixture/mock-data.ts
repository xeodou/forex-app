export const mockCurrencyRate = [
  {
    from: "USD",
    to: "JPY",
    bid: 0.8014505466183891,
    ask: 0.7839126536448034,
    price: 0.7926816001315963,
    time_stamp: "2022-03-12T14:36:44.765Z",
  },
];

export const newStreamResponse = (data: object, times: number = 1) => {
  return Promise.resolve({
    body: {
      // @ts-ignore
      // Ignore the facke mock of the readble stream
      getReader() {
        let count = 0;
        return {
          read() {
            count++;
            return Promise.resolve({ value: Buffer.from(JSON.stringify(data)), done: count > times });
          },
          cancel() {
            return Promise.resolve();
          },
        };
      },
      cancel() {
        return Promise.resolve();
      },
    },
  }) as unknown as Response;
};
