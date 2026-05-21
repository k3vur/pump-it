import { type PropsWithChildren } from "react";

type PageTitleProps = Readonly<PropsWithChildren<{}>>;

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="font-lexend font-black text-4xl tracking-tighter uppercase text-white">
      {children}
    </h2>
  );
}
