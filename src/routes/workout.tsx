import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/workout"!</div>;
}
