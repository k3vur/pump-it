import { Drawer, mergeProps } from "@base-ui/react";

export const AppMenuHandle = Drawer.createHandle();

type AppMenuTriggerProps = Readonly<Drawer.Trigger.Props>;

export function AppMenuTrigger(props: AppMenuTriggerProps) {
  return (
    <Drawer.Trigger
      {...mergeProps(props, { className: "focus:outline-none", handle: AppMenuHandle })}
    />
  );
}
