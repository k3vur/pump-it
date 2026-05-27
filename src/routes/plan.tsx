import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";
import { plannedWorkoutsQuery, planWorkout, useSuggestedWorkouts } from "#/domain";
import { Workout } from "#/domain/schema";

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  const tomorrow = Temporal.Now.plainDateISO().add(Temporal.Duration.from({ days: 1 }));
  const { data: currentlyPlannedWorkouts } = useLiveQuery({
    query: plannedWorkoutsQuery(tomorrow),
  });
  const { data: suggestedWorkouts } = useSuggestedWorkouts(tomorrow);

  return (
    <>
      <PlanWorkoutPage
        currentlyPlanned={currentlyPlannedWorkouts}
        suggestions={suggestedWorkouts}
        onPlanWorkout={(workout) => planWorkout(tomorrow, workout)}
      />
    </>
  );
}

type PlanWorkoutPageProps = Readonly<{
  currentlyPlanned: Workout[];
  suggestions: Workout[];
  onPlanWorkout: (workout: Workout) => void;
}>;

function PlanWorkoutPage({ currentlyPlanned, suggestions, onPlanWorkout }: PlanWorkoutPageProps) {
  return (
    <>
      <PageTitle>Tomorrow's Plan</PageTitle>
      <Section.Root>
        <Section.Title>Currently Planned</Section.Title>
        <Section.Content className="flex flex-col items-stretch gap-4">
          {currentlyPlanned.map((cpw) => (
            <YouTubeWorkoutCard workout={cpw} key={cpw.id} />
          ))}
        </Section.Content>
      </Section.Root>
      <Section.Root>
        <Section.Title>Suggested</Section.Title>
        <Section.Content className="flex flex-col items-stretch gap-4">
          {suggestions.map((sw) => (
            <YouTubeWorkoutCard workout={sw} key={sw.id}>
              <Button onClick={() => onPlanWorkout(sw)}>Add to tomorrows Workout</Button>
            </YouTubeWorkoutCard>
          ))}
        </Section.Content>
      </Section.Root>
    </>
  );
}
