import {
  Button as BaseUIButton,
  type ButtonProps as BaseUiButtonProps,
} from "@base-ui/react/button";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ButtonProps = Readonly<BaseUiButtonProps>;

export function Button({ className, children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <BaseUIButton
      className={clsx(
        className,
        "flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-br from-gradient-primary-light to-gradient-primary-dark px-8 font-lexend text-sm font-black tracking-tight text-surface uppercase",
      )}
      {...props}
    >
      {children}
    </BaseUIButton>
  );
}
