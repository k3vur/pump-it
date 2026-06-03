import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { cx } from "class-variance-authority";
import { type PropsWithChildren } from "react";

export interface NavBarProps {
  className?: string;
}

export function NavBar({ className, children }: PropsWithChildren<NavBarProps>) {
  return (
    <NavigationMenu.Root className={cx("w-full bg-surface px-4 py-4 shadow", className)}>
      <NavigationMenu.List className="flex justify-evenly gap-2">{children}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
