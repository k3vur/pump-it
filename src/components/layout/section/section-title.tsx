import type { PropsWithChildren } from "react";

type SectionTitleProps = Readonly<PropsWithChildren<{}>>;

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="font-lexend font-black text-xs uppercase tracking-[0.2em] text-white/60 flex items-center gap-4">
      {children}
      <div className="grow h-px bg-white/5"></div>
    </h3>
  );
}
