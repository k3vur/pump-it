import type { PropsWithChildren } from "react";

type SectionContentProps = Readonly<PropsWithChildren<{ className?: string }>>;

export function SectionContent({ className, children }: SectionContentProps) {
  return <div className={className}>{children}</div>;
}
