import { NavigationMenu } from "@base-ui/react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { forwardRef, type AnchorHTMLAttributes } from "react";

interface InternalNaviLinkItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

const InternalNavLinkItem = createLink(
  forwardRef<HTMLAnchorElement, InternalNaviLinkItemProps>(
    ({ icon: Icon, label, isActive = false, ...linkProps }, ref) => {
      return (
        <NavigationMenu.Item
          className={clsx(
            "w-20 rounded px-6 py-2",
            !isActive && "text-gray-500",
            isActive &&
              "bg-linear-to-br from-gradient-primary-light to-gradient-primary-dark text-surface",
          )}
        >
          <a
            ref={ref}
            {...linkProps}
            className="flex flex-col items-center gap-1"
          >
            <Icon size={28} />
            <span className="font-lexend text-xs font-bold tracking-tight uppercase">
              {label}
            </span>
          </a>
        </NavigationMenu.Item>
      );
    },
  ),
);

export const NavLinkItem: LinkComponent<typeof InternalNavLinkItem> = (
  props,
) => {
  return <InternalNavLinkItem activeProps={{ isActive: true }} {...props} />;
};
