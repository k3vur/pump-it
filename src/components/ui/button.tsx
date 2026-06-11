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
    "gap-3",
    "rounded-xl",
    "font-lexend",
    "text-sm",
    "font-black",
    "tracking-tight",
    "uppercase",
    "[&_svg]:size-5",
    "[&_svg]:-mt-0.5",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "px-8",
          "bg-linear-to-b",
          "from-gradient-primary-light",
          "to-gradient-primary-dark",
          "text-surface",
        ],
        destructive: ["px-4", "text-destructive", "border", "border-gray-500/20"],
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
