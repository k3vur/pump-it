import { Calendar, Dumbbell } from "lucide-react";
import type { PropsWithChildren } from "react";

import { AppLogo } from "./logo/app-logo";
import { Nav } from "./navigation";

type AppLayoutProps = Readonly<PropsWithChildren<{}>>;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <header className="sticky top-0 w-full py-2 px-6">
        <AppLogo />
      </header>
      <main className="px-6 flex flex-col gap-6">{children}</main>
      <Nav.Bar className="fixed bottom-0 w-full">
        <Nav.LinkItem to="/workout" icon={Dumbbell} label="Workout" />
        <Nav.LinkItem to="/plan" icon={Calendar} label="Plan" />
      </Nav.Bar>
    </div>
  );
}
