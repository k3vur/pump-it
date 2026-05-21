import {
  Button as BaseUIButton,
  type ButtonProps as BaseUiButtonProps,
} from "@base-ui/react/button";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ButtonProps = Readonly<BaseUiButtonProps>;

export function Button({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <BaseUIButton
      className={clsx(
        className,
        "h-12 uppercase text-surface font-lexend font-black px-8 text-sm tracking-tight rounded-xl flex items-center justify-center gap-2 bg-linear-to-br from-gradient-primary-light to-gradient-primary-dark",
      )}
      {...props}
    >
      {children}
    </BaseUIButton>
  );
}
