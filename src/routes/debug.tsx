import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "#/components/ui/button";
import { plannedWorkoutsCollection } from "#/domain/planned-workouts";

export const Route = createFileRoute("/debug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: plannedWorkouts } = useLiveQuery((q) =>
    q.from({ plannedWorkouts: plannedWorkoutsCollection }),
  );
  return (
    <div>
      <Button onClick={() => console.debug(plannedWorkouts)}>Log Planned Workouts</Button>
    </div>
  );
}
