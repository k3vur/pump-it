import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import z from "zod";

import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";
import {
  plannedWorkoutsQuery,
  planWorkout,
  removePlannedWorkout,
  useSuggestedWorkouts,
} from "#/domain";
import { PlannedWorkout, Workout } from "#/domain/schema";

const planSearchSchema = z.object({
  day: z.enum(["today", "tomorrow"]).default("tomorrow"),
});

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
  validateSearch: planSearchSchema,
});

function RouteComponent() {
  const { day: dayParam } = Route.useSearch();
  const day = Temporal.Now.plainDateISO().add(
    Temporal.Duration.from({ days: dayParam === "tomorrow" ? 1 : 0 }),
  );
  const { data: currentlyPlannedWorkouts } = useLiveQuery({
    query: plannedWorkoutsQuery(day),
  });
  const { data: suggestedWorkouts } = useSuggestedWorkouts(day);

  return (
    <PlanWorkoutPage
      day={dayParam}
      currentlyPlanned={currentlyPlannedWorkouts}
      suggestions={suggestedWorkouts}
      onPlanWorkout={(workout) => planWorkout(day, workout)}
      onRemovePlannedWorkout={removePlannedWorkout}
    />
  );
}

type PlanWorkoutPageProps = Readonly<{
  day: "tomorrow" | "today";
  currentlyPlanned: (PlannedWorkout & { workout: Workout })[];
  suggestions: Workout[];
  onPlanWorkout: (workout: Workout) => void;
  onRemovePlannedWorkout: (plannedWorkout: PlannedWorkout) => void;
}>;

function PlanWorkoutPage({
  day,
  currentlyPlanned,
  suggestions,
  onPlanWorkout,
  onRemovePlannedWorkout,
}: PlanWorkoutPageProps) {
  return (
    <>
      <PageTitle>Plan {day}</PageTitle>
      <Section.Root>
        <Section.Title>Planned</Section.Title>
        <Section.Content className="flex flex-col items-stretch gap-4">
          <AnimatePresence>
            {currentlyPlanned.length === 0 && (
              <motion.div exit={{ opacity: 0 }} className="font-lexend text-white">
                Currently No Workouts Planned
              </motion.div>
            )}
          </AnimatePresence>
          {currentlyPlanned.length > 0 &&
            currentlyPlanned.map((cpw) => (
              <motion.div key={cpw.workoutId} layoutId={`workout-${cpw.workoutId}`}>
                <YouTubeWorkoutCard workout={cpw.workout}>
                  <Button variant="destructive" onClick={() => onRemovePlannedWorkout(cpw)}>
                    <Trash2 />
                    Remove from {day}
                  </Button>
                </YouTubeWorkoutCard>
              </motion.div>
            ))}
        </Section.Content>
      </Section.Root>
      <Section.Root>
        <Section.Title>Suggested</Section.Title>
        <Section.Content className="flex flex-col items-stretch gap-4">
          <AnimatePresence>
            {suggestions.length === 0 && (
              <motion.div
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 font-lexend text-white"
              >
                <p>No Workout Suggestions. You probably need to add YouTube Videos.</p>
                <Link to="/add-video">Add Video</Link>
              </motion.div>
            )}
          </AnimatePresence>
          {suggestions.map((sw) => (
            <motion.div layoutId={`workout-${sw.id}`} key={sw.id}>
              <YouTubeWorkoutCard workout={sw}>
                <Button onClick={() => onPlanWorkout(sw)}>
                  <Dumbbell />
                  Plan for {day}
                </Button>
              </YouTubeWorkoutCard>
            </motion.div>
          ))}
        </Section.Content>
      </Section.Root>
    </>
  );
}
