import { Button } from "@base-ui/react";
import { Trash2 } from "lucide-react";
import type { PropsWithChildren } from "react";

import { SwipeAction } from "./swipe-action";

type SwipeDeleteProps = Readonly<PropsWithChildren<{ onDelete: () => void }>>;

export function SwipeDelete({ onDelete, children }: SwipeDeleteProps) {
  return (
    <SwipeAction
      className="rounded-xl bg-destructive"
      maxLeftOffset={-64}
      action={
        <Button className="px-5 text-white" onClick={onDelete}>
          <Trash2 />
        </Button>
      }
    >
      {children}
    </SwipeAction>
  );
}
