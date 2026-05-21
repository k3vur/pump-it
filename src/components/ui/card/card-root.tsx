import clsx from "clsx";
import type { PropsWithChildren } from "react";

type CardRootProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardRoot({ className, children }: CardRootProps) {
  return (
    <div
      className={clsx(
        className,
        "w-full min-w-24 min-h-16 rounded-xl overflow-hidden border-l-4 border-l-primary bg-surface-card",
      )}
    >
      {children}
    </div>
  );
}
