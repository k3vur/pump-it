import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";
import { plannedWorkoutsCollection } from "#/db/planned-workouts";
import type { Workout } from "#/domain/schema";
import { WORKOUT_PLAN } from "#/workout-plan";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  const tomorrow = Temporal.Now.plainDateISO().add(
    new Temporal.Duration(0, 0, 0, 1),
  );
  const { data: currentlyPlannedWorkouts } = useLiveQuery((q) =>
    q
      .from({ plannedWorkout: plannedWorkoutsCollection })
      .where(({ plannedWorkout }) => eq(plannedWorkout.day, tomorrow))
      .select(({ plannedWorkout }) => ({ ...plannedWorkout.workout })),
  );

  return (
    <PlanWorkoutPage
      currentlyPlanned={currentlyPlannedWorkouts}
      suggestions={WORKOUT_PLAN}
      onPlanWorkout={(workout) => {
        console.log("TEST");
        plannedWorkoutsCollection.insert({
          id: 1,
          day: tomorrow,
          workout,
        });
      }}
    />
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
