import { Calendar, Dumbbell } from "lucide-react";
import type { PropsWithChildren } from "react";

import { AppLogo } from "./logo/AppLogo";
import { Nav } from "./navigation";

interface AppLayoutProps {}

export function AppLayout({ children }: PropsWithChildren<AppLayoutProps>) {
  return (
    <div>
      <header className="sticky top-0 w-full text-center py-2">
        <AppLogo />
      </header>
      <section>{children}</section>
      <Nav.Bar className="fixed bottom-0 w-full">
        <Nav.LinkItem to="/workout" icon={Dumbbell} label="Workout" />
        <Nav.LinkItem to="/plan" icon={Calendar} label="Plan" />
      </Nav.Bar>
    </div>
  );
}
