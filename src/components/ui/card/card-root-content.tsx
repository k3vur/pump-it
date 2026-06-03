import { cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type CardContentProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cx(className, "w-full p-4")}>{children}</div>;
}
