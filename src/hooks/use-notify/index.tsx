import React, { FC, useContext, useState } from "react";

export enum NotifyType {
  Success = "success",
  Error = "error",
}

export interface NotifyItem {
  // Identify of the message, default will be the timestamp added to the stack
  id?: number;
  // Notification type
  type?: NotifyType;
  // The notification message
  message: string;
}

export interface NotifyContextProps {
  stack: NotifyItem[];
  addNotifyItem: (item: NotifyItem) => void;
  removeNotifyItem: (id: number) => void;
}

export const NotifyContext = React.createContext<NotifyContextProps>({} as NotifyContextProps);

export const NotifyContextProvider: FC<{ initialValue?: NotifyItem[] }> = ({ initialValue = [], children }) => {
  const [stack, setStack] = useState<NotifyItem[]>(initialValue);

  const addNotifyItem = (item: NotifyItem) => {
    setStack([
      ...stack,
      {
        type: NotifyType.Success,
        id: Date.now(),
        ...item,
      },
    ]);
  };

  const removeNotifyItem = (id: number) => {
    setStack(stack.filter((i) => i.id !== id));
  };

  return <NotifyContext.Provider value={{ stack, addNotifyItem, removeNotifyItem }}>{children}</NotifyContext.Provider>;
};

export const useNotify = () => {
  const { stack, addNotifyItem, removeNotifyItem } = useContext(NotifyContext);
  return { stack, addNotifyItem, removeNotifyItem };
};
