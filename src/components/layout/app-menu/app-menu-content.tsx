import { Drawer } from "@base-ui/react";
import type { PropsWithChildren } from "react";

import { Logo } from "../logo";

type AppMenuContentProps = PropsWithChildren<{}>;

export function AppMenuContent({ children }: AppMenuContentProps) {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop className="absolute inset-0 min-h-1/4 bg-surface opacity-80 transition-opacity duration-300 data-ending-style:opacity-0 data-ending-style:duration-300 data-starting-style:opacity-0" />
      <Drawer.Viewport className="absolute inset-0 flex items-end justify-center">
        <Drawer.Popup className="box-border w-full translate-y-0 overflow-y-auto overscroll-contain rounded-t-xl border border-b-0 border-navbar-border bg-surface-card px-6 py-4 outline-0 transition-transform data-ending-style:translate-y-full data-starting-style:translate-y-full">
          <Drawer.Content className="mx-auto my-0 w-full max-w-xl">
            <Drawer.Title>
              <Logo.TextLogo className="-ms-2" />
            </Drawer.Title>
            <div className="flex flex-col gap-4 py-5 font-lexend text-white">{children}</div>
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  );
}
