import { cx } from "class-variance-authority";
import { motion } from "motion/react";
import type { PropsWithChildren, ReactNode } from "react";

import { ZStack } from "./z-stack";

type SwipeActionProps = Readonly<
  PropsWithChildren<{
    className: string;
    action: ReactNode;
    maxLeftOffset: number;
  }>
>;

export function SwipeAction({ className, action, maxLeftOffset, children }: SwipeActionProps) {
  return (
    <ZStack className={cx("w-full overflow-hidden select-none", className)}>
      <div className={cx("flex items-stretch justify-end z-0 col-start-1 row-start-1")}>
        {action}
      </div>
      <motion.div
        className="z-10 col-start-1 row-start-1 w-full touch-pan-y"
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: maxLeftOffset, right: 0 }}
        dragElastic={{ left: 0.55, right: 0 }}
        transition={{
          type: "spring",
        }}
      >
        {children}
      </motion.div>
    </ZStack>
  );
}
