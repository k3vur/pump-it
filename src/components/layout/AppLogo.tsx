import clsx from "clsx";

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <h1
      className={clsx(
        "font-lexend text-xl font-black tracking-tighter text-primary uppercase italic",
        className,
      )}
    >
      Pump It
    </h1>
  );
}
