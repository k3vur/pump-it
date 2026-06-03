import { Calendar, Dumbbell } from "lucide-react";
import type { PropsWithChildren } from "react";

import { AppLogo } from "./logo/app-logo";
import { Nav } from "./navigation";

type AppLayoutProps = Readonly<PropsWithChildren<{}>>;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <header className="w-full px-6 py-2">
        <AppLogo />
      </header>
      <main className="flex flex-col gap-6 px-6">{children}</main>
      <Nav.Bar className="fixed bottom-0 w-full">
        <Nav.LinkItem to="/todays-workout" icon={Dumbbell} label="Workout" />
        <Nav.LinkItem to="/plan" icon={Calendar} label="Plan" />
      </Nav.Bar>
    </div>
  );
}
