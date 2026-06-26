import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { cn } from "cnfast";
import { type PropsWithChildren } from "react";

export interface NavBarProps {
  className?: string;
}

export function NavBar({ className, children }: PropsWithChildren<NavBarProps>) {
  return (
    <NavigationMenu.Root
      className={cn(
        "gap-2 rounded-full border border-navbar-border bg-navbar-base p-0.5 shadow-xl backdrop-blur-md",
        className,
      )}
    >
      <NavigationMenu.List className="flex items-center justify-evenly gap-2">
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
