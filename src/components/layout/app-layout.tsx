import { Separator } from "@base-ui/react";
import { Link } from "@tanstack/react-router";
import { Calendar, Dumbbell } from "lucide-react";
import { useEffect, type PropsWithChildren } from "react";

import { router } from "#/router";

import { AppMenu } from "./app-menu";
import { AppMenuHandle } from "./app-menu/app-menu-handle";
import { Logo } from "./logo";
import { Nav } from "./navigation";

type AppLayoutProps = Readonly<PropsWithChildren<{}>>;

export function AppLayout({ children }: AppLayoutProps) {
  // make sure the drawer closes on each navigation event
  useEffect(
    () =>
      router.subscribe("onBeforeNavigate", () => {
        AppMenuHandle.close();
      }),
    [],
  );

  return (
    <AppMenu.Container>
      <main className="flex flex-col gap-6 px-6 pt-5 pb-40 font-lexend text-white">{children}</main>
      <Nav.Bar className="fixed bottom-2 left-2">
        <Nav.LinkItem to="/todays-workout" icon={Dumbbell} label="Workout" />
        <Nav.LinkItem to="/plan" icon={Calendar} label="Plan" />
        <Nav.Item>
          <AppMenu.Trigger>
            <Logo.Icon className="h-10" />
          </AppMenu.Trigger>
        </Nav.Item>
      </Nav.Bar>
      <AppMenu.Content>
        <a target="_blank" href="https://github.com/k3vur/pump-it">
          About / GitHub{" "}
        </a>
        <Separator orientation="horizontal" className="h-px bg-white opacity-10" />
        <Link to="/add-video">Add Videos</Link>
      </AppMenu.Content>
    </AppMenu.Container>
  );
}
