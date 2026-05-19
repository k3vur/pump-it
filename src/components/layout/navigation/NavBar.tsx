import { NavigationMenu } from "@base-ui/react/navigation-menu";
import clsx from "clsx";
import { type PropsWithChildren } from "react";

export interface NavBarProps {
  className?: string;
}

export function NavBar({ className, children }: PropsWithChildren<NavBarProps>) {
  return (
    <NavigationMenu.Root className={clsx("w-full bg-gray-900 px-4 py-4 shadow", className)}>
      <NavigationMenu.List className="flex justify-evenly gap-2">{children}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
