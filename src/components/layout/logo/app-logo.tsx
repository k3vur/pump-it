import { cx } from "class-variance-authority";

import logoUrl from "./logo-small.png";

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <h1
      className={cx(
        "inline-flex items-center justify-center font-lexend text-xl font-black tracking-tighter text-primary uppercase italic",
        className,
      )}
    >
      <img src={logoUrl} className="relative -right-1.5 h-8" />
      <span>
        <span className="hidden">P</span>ump It
      </span>
    </h1>
  );
}
