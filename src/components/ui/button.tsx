import { Button as BaseUIButton } from "@base-ui/react/button";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ButtonProps = Readonly<{ className?: string }>;

export function Button({
  className,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <BaseUIButton
      className={clsx(
        className,
        "h-12 uppercase text-gray-900 font-lexend font-black px-8 text-sm tracking-tight rounded-xl flex items-center justify-center gap-2 bg-linear-to-br from-gradient-primary-light to-gradient-primary-dark",
      )}
    >
      {children}
    </BaseUIButton>
  );
}
