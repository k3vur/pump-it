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
        "p-0.5 gap-2 border rounded-full border-navbar-border backdrop-blur-md bg-navbar-base shadow-xl",
        className,
      )}
    >
      <NavigationMenu.List className="flex items-center justify-evenly gap-2">
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
