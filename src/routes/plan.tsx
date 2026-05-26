import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";
import { availableWorkoutsCollection } from "#/domain/available-workouts";
import { plannedWorkoutsCollection } from "#/domain/planned-workouts";
import { Workout } from "#/domain/schema";
import { Temporals } from "#/temporals";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  const tomorrow = Temporal.Now.plainDateISO().add(
    Temporal.Duration.from({ days: 1 }),
  );
  const { data: currentlyPlannedWorkouts } = useLiveQuery((q) =>
    q
      .from({ plannedWorkout: plannedWorkoutsCollection })
      .join(
        { workout: availableWorkoutsCollection },
        ({ plannedWorkout, workout }) =>
          eq(plannedWorkout.workoutId, workout.id),
        "inner",
      )
      .where(({ plannedWorkout }) =>
        eq(plannedWorkout.dayAsDate, Temporals.Utils.plainDateToDate(tomorrow)),
      ),
  );
  const { data: availableWorkouts } = useLiveQuery((q) =>
    q.from({ workout: availableWorkoutsCollection }),
  );

  return (
    <>
      <Button onClick={() => console.debug(currentlyPlannedWorkouts)}>
        Log Planned Workouts
      </Button>
      <PlanWorkoutPage
        currentlyPlanned={currentlyPlannedWorkouts.map((cpw) => cpw.workout)}
        suggestions={availableWorkouts}
        onPlanWorkout={(workout) => {
          plannedWorkoutsCollection.insert({
            id: 1,
            day: tomorrow,
            workoutId: workout.id,
          });
        }}
      />
    </>
  );
}

type PlanWorkoutPageProps = Readonly<{
  currentlyPlanned: Workout[];
  suggestions: Workout[];
  onPlanWorkout: (workout: Workout) => void;
}>;

function PlanWorkoutPage({
  currentlyPlanned,
  suggestions,
  onPlanWorkout,
}: PlanWorkoutPageProps) {
  return (
    <>
      <PageTitle>Tomorrow's Plan</PageTitle>
      <Section.Root>
        <Section.Title>Currently Planned</Section.Title>
        <Section.Content className="flex flex-col gap-4 items-stretch">
          {currentlyPlanned.map((cpw) => (
            <YouTubeWorkoutCard workout={cpw} key={cpw.id} />
          ))}
        </Section.Content>
      </Section.Root>
      <Section.Root>
        <Section.Title>Suggested</Section.Title>
        <Section.Content className="flex flex-col gap-4 items-stretch">
          {suggestions.map((sw) => (
            <YouTubeWorkoutCard workout={sw} key={sw.id}>
              <Button onClick={() => onPlanWorkout(sw)}>
                Add to tomorrows Workout
              </Button>
            </YouTubeWorkoutCard>
          ))}
        </Section.Content>
      </Section.Root>
    </>
  );
}
