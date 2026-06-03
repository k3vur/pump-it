import {
  Button as BaseUIButton,
  type ButtonProps as BaseUiButtonProps,
} from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(
  [
    "flex",
    "h-12",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-xl",
    "bg-linear-to-br",
    "px-8",
    "font-lexend",
    "text-sm",
    "font-black",
    "tracking-tight",
    "text-surface",
    "uppercase",
  ],
  {
    variants: {
      variant: {
        primary: ["from-gradient-primary-light", "to-gradient-primary-dark"],
        destructive: ["from-gradient-destructive-light", "to-gradient-destructive-dark"],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = Readonly<BaseUiButtonProps & ButtonVariantProps>;

export function Button({ className, variant, children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <BaseUIButton className={buttonVariants({ className, variant })} {...props}>
      {children}
    </BaseUIButton>
  );
}
