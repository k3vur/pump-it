import logoUrl from "./logo-small.png";

type LogoIconProps = Readonly<{
  className?: string;
}>;

export function LogoIcon({ className }: LogoIconProps) {
  return <img src={logoUrl} className={className} />;
}
