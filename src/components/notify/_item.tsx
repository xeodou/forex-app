import { IconClose } from "components/icons"
import { NotifyItem, NotifyType } from "hooks"
import { FC } from "react"

export interface ItemProps {
  item: NotifyItem;
  onDismiss: (id: number) => void;
}

export const Item: FC<ItemProps> = ({item, onDismiss}) => {
  return (
    <div className={`rounded-md p-4 ${item.type === NotifyType.Error ? 'bg-yellow-50' : 'bg-green-50'}`}>
      <div className="flex">
        <div className="ml-3">
          <p className={`text-sm font-medium ${item.type === NotifyType.Error ? 'text-yellow-800' : 'text-green-800'}`}>
            {item.message}
          </p>
        </div>
        <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button type="button" className="inline-flex align-baseline" onClick={() => onDismiss(item.id as number)}>
                  <span className="sr-only">Dismiss</span>
                  <IconClose aria-hidden="true" />
                </button>
              </div>
            </div>
      </div>
    </div>
  )
}
