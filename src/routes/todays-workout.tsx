import { inArray, not, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";

import {
  FinishedWorkout,
  finishedWorkoutsQuery,
  finishWorkout,
  plannedWorkoutsQuery,
  removeFinishedWorkout,
  type PlannedWorkout,
  type Workout,
} from "../domain";

export const Route = createFileRoute("/todays-workout")({
  component: RouteComponent,
});

function RouteComponent() {
  const today = Temporal.Now.plainDateISO();
  const { data: finishedWorkouts } = useLiveQuery({ query: finishedWorkoutsQuery(today) });
  const finishedWorkoutIds = finishedWorkouts.map((fw) => fw.workoutId);
  const { data: plannedWorkouts } = useLiveQuery(
    {
      query: plannedWorkoutsQuery(today).where(({ plannedWorkout }) =>
        not(inArray(plannedWorkout.workoutId, finishedWorkoutIds)),
      ),
    },
    [finishedWorkoutIds.length],
  );

  return (
    <WorkoutPage
      plannedWorkouts={plannedWorkouts}
      finishedWorkouts={finishedWorkouts}
      onFinishWorkout={(workout) => finishWorkout(Temporal.Now.instant(), workout)}
      onRemoveFinishedWorkout={removeFinishedWorkout}
    />
  );
}

type WorkoutPageProps = Readonly<{
  plannedWorkouts: (PlannedWorkout & { workout: Workout })[];
  finishedWorkouts: (FinishedWorkout & { workout: Workout })[];
  onFinishWorkout: (workout: Workout) => void;
  onRemoveFinishedWorkout: (finishedWorkout: FinishedWorkout) => void;
}>;

function WorkoutPage({
  plannedWorkouts,
  finishedWorkouts,
  onFinishWorkout,
  onRemoveFinishedWorkout,
}: WorkoutPageProps) {
  return (
    <>
      <PageTitle>Todays Workout</PageTitle>
      {plannedWorkouts.length === 0 && finishedWorkouts.length > 0 && (
        <div className="flex h-80 flex-col items-center justify-center">
          <div className="font-lexend text-2xl text-white italic">You Pumped it 💪</div>
        </div>
      )}
      {plannedWorkouts.length === 0 && finishedWorkouts.length === 0 && (
        <div className="flex flex-col items-start gap-4 font-space-grotesk text-white">
          <p>You haven't planned any workouts for today.</p>
          <Link to="/plan" search={{ day: "today" }}>
            Plan Workout
          </Link>
        </div>
      )}
      {plannedWorkouts.length > 0 && (
        <>
          {plannedWorkouts.map((pw) => (
            <YouTubeWorkoutCard workout={pw.workout} key={pw.workoutId}>
              <Button onClick={() => onFinishWorkout(pw.workout)}>Finish Workout</Button>
            </YouTubeWorkoutCard>
          ))}
        </>
      )}
      {finishedWorkouts.length > 0 && (
        <Section.Root>
          <Section.Title>Todays Finished Workouts</Section.Title>
          <Section.Content>
            {finishedWorkouts.map((fw) => (
              <YouTubeWorkoutCard workout={fw.workout} key={fw.workoutId}>
                <Button onClick={() => onRemoveFinishedWorkout(fw)}>Remove Finished Workout</Button>
              </YouTubeWorkoutCard>
            ))}
          </Section.Content>
        </Section.Root>
      )}
    </>
  );
}
