import { Calendar, Dumbbell } from "lucide-react";
import { type PropsWithChildren } from "react";

import { AppMenu } from "./app-menu";
import { Logo } from "./logo";
import { Nav } from "./navigation";

type AppLayoutProps = Readonly<PropsWithChildren<{}>>;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppMenu.Container>
      <main className="flex flex-col gap-6 px-6">{children}</main>
      <Nav.Bar className="fixed bottom-2 left-2">
        <Nav.LinkItem to="/todays-workout" icon={Dumbbell} label="Workout" />
        <Nav.LinkItem to="/plan" icon={Calendar} label="Plan" />
        <Nav.Item>
          <AppMenu.Trigger>
            <Logo.Icon className="h-10" />
          </AppMenu.Trigger>
        </Nav.Item>
      </Nav.Bar>
      <AppMenu.Content>Test</AppMenu.Content>
    </AppMenu.Container>
  );
}
