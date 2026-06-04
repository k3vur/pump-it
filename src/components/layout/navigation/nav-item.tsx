import { NavigationMenu } from "@base-ui/react";
import { cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type NavItemProps = PropsWithChildren<{}>;

export function NavItem({ children }: NavItemProps) {
  return (
    <NavigationMenu.Item className={cx("px-5 py-2 rounded-full")}>{children}</NavigationMenu.Item>
  );
}
