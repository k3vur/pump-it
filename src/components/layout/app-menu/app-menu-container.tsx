import { Drawer } from "@base-ui/react";
import type { PropsWithChildren } from "react";

import { AppMenuHandle } from "./app-menu-handle";

type AppMenuContainerProps = PropsWithChildren<{}>;

export function AppMenuContainer({ children }: AppMenuContainerProps) {
  return (
    <Drawer.Provider>
      <Drawer.Indent className="h-full border transition-transform duration-300 data-active:opacity-75">
        <Drawer.Root swipeDirection="down" handle={AppMenuHandle}>
          {children}
        </Drawer.Root>
      </Drawer.Indent>
    </Drawer.Provider>
  );
}
