import { cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type CardRootProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardRoot({ className, children }: CardRootProps) {
  return (
    <div
      className={cx(
        className,
        "min-h-16 w-full min-w-24 overflow-hidden rounded-xl border-l-4 border-l-primary bg-surface-card",
      )}
    >
      {children}
    </div>
  );
}
