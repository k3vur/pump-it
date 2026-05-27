import { type PropsWithChildren } from "react";

type PageTitleProps = Readonly<PropsWithChildren<{}>>;

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="font-lexend text-4xl font-black tracking-tighter text-white uppercase">
      {children}
    </h2>
  );
}
