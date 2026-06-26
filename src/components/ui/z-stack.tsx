import { cn } from "cnfast";
import type { PropsWithChildren } from "react";

type ZStackProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function ZStack({ className, children }: ZStackProps) {
  return (
    <div className={cn("grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1", className)}>
      {children}
    </div>
  );
}
