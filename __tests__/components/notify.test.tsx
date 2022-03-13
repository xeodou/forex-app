import { act, fireEvent } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { NotifyContextProvider, NotifyItem, NotifyType } from "hooks";
import { Notify } from "components/notify";
import { FC } from "react";

describe("notify", () => {
  let container: HTMLDivElement;

  const Wrapper: FC<{initialValue: NotifyItem[]}> = ({ initialValue }) => (
    <NotifyContextProvider initialValue={initialValue}>
      <Notify />
    </NotifyContextProvider>
  );

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null as unknown as HTMLDivElement;
  });

  it("should render the notify component", () => {
    const item: NotifyItem = {
      id: Date.now(),
      type: NotifyType.Success,
      message: 'lorem'
    }
    act(() => {
      render(<Wrapper initialValue={[item]}/>, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();

    expect(container.querySelector("div.notify-container")).toBeTruthy();
    expect(container.querySelector('p')?.textContent).toEqual('lorem');

    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(container.querySelector('p')).toBeFalsy();
  });
});
