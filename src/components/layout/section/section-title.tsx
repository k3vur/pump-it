import type { PropsWithChildren } from "react";

type SectionTitleProps = Readonly<PropsWithChildren<{}>>;

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="flex items-center gap-4 font-lexend text-xs font-black tracking-[0.2em] text-white/60 uppercase">
      {children}
      <div className="h-px grow bg-white/5"></div>
    </h3>
  );
}
