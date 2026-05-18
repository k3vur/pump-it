import clsx from "clsx";

interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <h1
      className={clsx(
        "font-lexend text-logo-green font-black italic text-xl tracking-tighter uppercase",
        className,
      )}
    >
      Pump It
    </h1>
  );
}
