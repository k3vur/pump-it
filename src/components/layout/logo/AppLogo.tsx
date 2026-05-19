import clsx from "clsx";
import logoUrl from "./logo-small.png";

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <h1
      className={clsx(
        "font-lexend text-xl font-black tracking-tighter text-primary uppercase italic inline-flex items-center justify-center",
        className,
      )}
    >
      <img src={logoUrl} className="h-8 relative -right-1.5" />
      <span>
        <span className="hidden">P</span>ump It
      </span>
    </h1>
  );
}
