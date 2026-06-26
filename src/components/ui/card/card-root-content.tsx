import { cn } from "cnfast";
import type { PropsWithChildren } from "react";

type CardContentProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn(className, "w-full p-4")}>{children}</div>;
}
