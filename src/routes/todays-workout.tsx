import { inArray, not, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { BicepsFlexed, Calendar, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button, ButtonLink } from "#/components/ui/button";
import { SwipeDelete } from "#/components/ui/swipe-delete";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";

import {
  FinishedWorkout,
  finishedWorkoutsQuery,
  finishWorkout,
  plannedWorkoutsQuery,
  removeFinishedWorkout,
  removePlannedWorkout,
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
      <AnimatePresence mode="popLayout">
        {plannedWorkouts.length === 0 && finishedWorkouts.length > 0 && (
          <motion.div
            exit={{ opacity: 0 }}
            className="flex h-80 flex-col items-center justify-center"
          >
            <div className="font-lexend text-2xl text-white italic">You Pumped it 💪</div>
          </motion.div>
        )}
        {plannedWorkouts.length === 0 && finishedWorkouts.length === 0 && (
          <motion.div
            exit={{ opacity: 0 }}
            className="flex flex-col items-start gap-4 font-space-grotesk text-white"
          >
            <p>You haven't planned any workouts for today.</p>
            <ButtonLink variant="primary" to="/plan" search={{ day: "today" }}>
              <Calendar />
              Plan Workout
            </ButtonLink>
          </motion.div>
        )}
        {plannedWorkouts.map((pw) => (
          <motion.div
            key={pw.workoutId}
            layoutId={`workout-${pw.workoutId}`}
            exit={{ opacity: 0, scaleY: 0.5 }}
          >
            <SwipeDelete onDelete={() => removePlannedWorkout(pw)}>
              <YouTubeWorkoutCard workout={pw.workout}>
                <Button onClick={() => onFinishWorkout(pw.workout)}>
                  <BicepsFlexed />
                  Finished Workout
                </Button>
              </YouTubeWorkoutCard>
            </SwipeDelete>
          </motion.div>
        ))}
      </AnimatePresence>
      {finishedWorkouts.length > 0 && (
        <Section.Root>
          <Section.Title>Todays Finished Workouts</Section.Title>
          <Section.Content>
            {finishedWorkouts.map((fw) => (
              <motion.div key={fw.workoutId} layoutId={`workout-${fw.workoutId}`}>
                <YouTubeWorkoutCard workout={fw.workout}>
                  <Button variant="destructive" onClick={() => onRemoveFinishedWorkout(fw)}>
                    <Trash2 />
                    Remove Finished Workout
                  </Button>
                </YouTubeWorkoutCard>
              </motion.div>
            ))}
          </Section.Content>
        </Section.Root>
      )}
    </>
  );
}
