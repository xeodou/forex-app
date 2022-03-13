import { useNotify } from "hooks";
import { Item } from "./_item";

export const Notify = () => {
  const { stack, removeNotifyItem } = useNotify();

  const lastItem = stack[stack.length - 1];

  const onDismiss = (id: number) => {
    removeNotifyItem(id);
  };

  return <div className="notify-container">{lastItem && <Item item={lastItem} onDismiss={onDismiss} />}</div>;
};
