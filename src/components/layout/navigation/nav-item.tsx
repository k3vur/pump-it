import { NavigationMenu } from "@base-ui/react";
import { cn } from "cnfast";
import type { PropsWithChildren } from "react";

type NavItemProps = PropsWithChildren<{}>;

export function NavItem({ children }: NavItemProps) {
  return (
    <NavigationMenu.Item className={cn("rounded-full px-5 py-2")}>{children}</NavigationMenu.Item>
  );
}
