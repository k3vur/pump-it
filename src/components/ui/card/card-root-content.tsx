import clsx from "clsx";
import type { PropsWithChildren } from "react";

type CardContentProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function CardContent({ className, children }: CardContentProps) {
  return <div className={clsx(className, "w-full p-6")}>{children}</div>;
}
