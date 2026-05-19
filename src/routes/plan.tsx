import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/plan"!</div>;
}
