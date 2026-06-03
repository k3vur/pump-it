import { cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type CardHeadProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardHead({ className, children }: CardHeadProps) {
  return <div className={cx(className, "w-full")}>{children}</div>;
}
