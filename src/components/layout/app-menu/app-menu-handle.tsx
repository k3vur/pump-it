import { Drawer } from "@base-ui/react";

export const AppMenuHandle = Drawer.createHandle();

type AppMenuTriggerProps = Readonly<Drawer.Trigger.Props>;

export function AppMenuTrigger(props: AppMenuTriggerProps) {
  return <Drawer.Trigger {...props} handle={AppMenuHandle} />;
}
