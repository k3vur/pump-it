import { cx } from "class-variance-authority";

import { LogoIcon } from "./logo-icon";

interface LogoTextProps {
  className?: string;
}

export function LogoText({ className }: LogoTextProps) {
  return (
    <div
      className={cx(
        "inline-flex items-center justify-center font-lexend text-xl font-black tracking-tighter text-primary uppercase italic",
        className,
      )}
    >
      <LogoIcon className="relative -right-1.5 h-8" />
      <span>
        <span className="hidden">P</span>ump It
      </span>
    </div>
  );
}
