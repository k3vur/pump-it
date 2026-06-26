import { cn } from "cnfast";
import type { PropsWithChildren } from "react";

type CardHeadProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardHead({ className, children }: CardHeadProps) {
  return <div className={cn(className, "w-full")}>{children}</div>;
}
