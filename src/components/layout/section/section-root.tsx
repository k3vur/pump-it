import type { PropsWithChildren } from "react";

type SectionRootProps = Readonly<PropsWithChildren<{}>>;

export function SectionRoot({ children }: SectionRootProps) {
  return (
    <section className="flex flex-col items-stretch gap-6">{children}</section>
  );
}
