import clsx from "clsx";
import type { PropsWithChildren } from "react";

type CardHeadProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardHead({ className, children }: CardHeadProps) {
  return <div className={clsx(className, "w-full")}>{children}</div>;
}
