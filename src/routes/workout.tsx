import { inArray, not, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "#/components/layout/page-title";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";

import {
  FinishedWorkout,
  finishedWorkoutsQuery,
  finishWorkout,
  plannedWorkoutsQuery,
  type PlannedWorkout,
  type Workout,
} from "../domain";

export const Route = createFileRoute("/workout")({
  component: RouteComponent,
});

function RouteComponent() {
  const today = Temporal.Now.plainDateISO();
  const { data: finishedWorkouts } = useLiveQuery({ query: finishedWorkoutsQuery(today) });
  const finishedWorkoutIds = finishedWorkouts.map((fw) => fw.workoutId);
  const { data: plannedWorkouts } = useLiveQuery({
    query: plannedWorkoutsQuery(today).where(({ plannedWorkout }) =>
      not(inArray(plannedWorkout.workoutId, finishedWorkoutIds)),
    ),
  });

  return (
    <WorkoutPage
      plannedWorkouts={plannedWorkouts}
      finishedWorkouts={finishedWorkouts}
      onFinishWorkout={(workout) => finishWorkout(Temporal.Now.instant(), workout)}
    />
  );
}

type WorkoutPageProps = Readonly<{
  plannedWorkouts: (PlannedWorkout & { workout: Workout })[];
  finishedWorkouts: (FinishedWorkout & { workout: Workout })[];
  onFinishWorkout: (workout: Workout) => void;
}>;

function WorkoutPage({ plannedWorkouts, onFinishWorkout }: WorkoutPageProps) {
  return (
    <>
      {plannedWorkouts.length === 0 ? (
        <div>You Pumped it 💪</div>
      ) : (
        <>
          <PageTitle>Todays Workout</PageTitle>
          <div>
            {plannedWorkouts.map((pw) => (
              <YouTubeWorkoutCard workout={pw.workout} key={pw.workoutId}>
                <Button onClick={() => onFinishWorkout(pw.workout)}>Finish Workout</Button>
              </YouTubeWorkoutCard>
            ))}
          </div>
        </>
      )}
    </>
  );
}
