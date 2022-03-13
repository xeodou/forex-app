import { currencies } from "utils/currencies";

describe("currencies", () => {
  it("read the currency list", () => {
    expect(currencies).toEqual(["USD", "JPY", "BGN", "CNY"]);
  });
});
