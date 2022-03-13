import { renderHook, act } from "@testing-library/react-hooks";
import { NotifyContextProvider, useNotify } from "hooks";
import { FC } from "react";

describe("hooks/use-notify", () => {
  it("should render the with initial data", () => {
    const wrapper: FC = ({ children }) => <NotifyContextProvider>{children}</NotifyContextProvider>;

    const { result } = renderHook(() => useNotify(), { wrapper });

    expect(result.current.stack).toEqual([]);
  });

  it("should able to change the currency pair", () => {
    const wrapper: FC = ({ children }) => <NotifyContextProvider>{children}</NotifyContextProvider>;

    const { result } = renderHook(() => useNotify(), { wrapper });

    act(() => {
      result.current.addNotifyItem({ message: "lorem" });
    });

    const item = result.current.stack[0];
    expect(item).toMatchObject({
      message: "lorem",
      type: "success",
    });

    act(() => {
      result.current.removeNotifyItem(item.id as number);
    });

    expect(result.current.stack).toEqual([]);
  });
});
