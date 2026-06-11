import { NavigationMenu } from "@base-ui/react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { forwardRef, type AnchorHTMLAttributes } from "react";

import { ZStack } from "#/components/ui/z-stack";

interface InternalNaviLinkItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

const InternalNavLinkItem = createLink(
  forwardRef<HTMLAnchorElement, InternalNaviLinkItemProps>(
    ({ icon: Icon, label, isActive = false, ...linkProps }, ref) => {
      return (
        <NavigationMenu.Item className={cx(!isActive && "text-white", isActive && "text-primary ")}>
          <ZStack>
            {isActive && (
              <motion.div
                layoutId="navbar-active"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full rounded-full bg-navbar-highlight"
              >
                &nbsp;
              </motion.div>
            )}
            <a ref={ref} {...linkProps} className="flex flex-col items-center gap-1 px-5 py-2">
              <Icon size={28} />
              <span className="font-lexend text-xs font-bold tracking-tight uppercase">
                {label}
              </span>
            </a>
          </ZStack>
        </NavigationMenu.Item>
      );
    },
  ),
);

export const NavLinkItem: LinkComponent<typeof InternalNavLinkItem> = (props) => {
  return <InternalNavLinkItem activeProps={{ isActive: true }} {...props} />;
};
