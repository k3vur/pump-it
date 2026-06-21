import { and, eq, gte, inArray, lt, not, Query, useLiveQuery } from "@tanstack/react-db";

import { Temporals } from "#/temporals";

import {
  availableWorkoutsCollection,
  finishedWorkoutId,
  finishedWorkoutsCollection,
  plannedWorkoutId,
  plannedWorkoutsCollection,
} from "./db-collections";
import { FinishedWorkout, PlannedWorkout, Workout } from "./schema";

export function addAvailableWorkout(workout: Workout) {
  return availableWorkoutsCollection.insert(workout);
}

export function planWorkout(day: Temporal.PlainDate, workout: string | Workout) {
  const workoutId = typeof workout === "string" ? workout : workout.id;
  return plannedWorkoutsCollection.insert({ day, workoutId });
}

export function removePlannedWorkout(plannedWorkout: PlannedWorkout) {
  return plannedWorkoutsCollection.delete(plannedWorkoutId(plannedWorkout));
}

export function plannedWorkoutsQuery(day: Temporal.PlainDate) {
  return new Query()
    .from({ plannedWorkout: plannedWorkoutsCollection })
    .join(
      { workout: availableWorkoutsCollection },
      ({ plannedWorkout, workout }) => eq(plannedWorkout.workoutId, workout.id),
      "inner",
    )
    .where(({ plannedWorkout }) =>
      eq(plannedWorkout.dayAsDate, Temporals.Utils.plainDateToDate(day)),
    )
    .select(({ plannedWorkout, workout }) => ({ ...plannedWorkout, workout }));
}

export function recentWorkoutsQuery(cutoff: Temporal.PlainDate) {
  return new Query()
    .from({ finishedWorkout: finishedWorkoutsCollection })
    .join({ workout: availableWorkoutsCollection }, ({ finishedWorkout, workout }) =>
      eq(finishedWorkout.workoutId, workout.id),
    )
    .where(({ finishedWorkout }) =>
      gte(finishedWorkout.timestampAsDate, Temporals.Utils.plainDateToDate(cutoff)),
    )
    .select(({ workout }) => ({ ...workout }))
    .distinct();
}

export function useSuggestedWorkouts(day: Temporal.PlainDate) {
  const threeDaysAgo = day.subtract(Temporal.Duration.from({ days: 2 }));
  const { data: recentWorkouts } = useLiveQuery({ query: recentWorkoutsQuery(threeDaysAgo) });
  const { data: plannedWorkout } = useLiveQuery({ query: plannedWorkoutsQuery(day) });
  const excludedWorkouts = [
    ...recentWorkouts.map((w) => w.id),
    ...plannedWorkout.map((w) => w.workoutId),
  ];
  return useLiveQuery(
    (q) =>
      q
        .from({ workout: availableWorkoutsCollection })
        .where(({ workout }) => not(inArray(workout.id, excludedWorkouts))),
    [excludedWorkouts.length], // nasty hack to make suggestions update when workouts are added or removed
  );
}

export function finishWorkout(timestamp: Temporal.Instant, workout: string | Workout) {
  const workoutId = typeof workout === "string" ? workout : workout.id;
  return finishedWorkoutsCollection.insert({ timestamp, workoutId });
}

export function removeFinishedWorkout(finishedWorkout: FinishedWorkout) {
  return finishedWorkoutsCollection.delete(finishedWorkoutId(finishedWorkout));
}

export function finishedWorkoutsQuery(day: Temporal.PlainDate) {
  return new Query()
    .from({ finishedWorkout: finishedWorkoutsCollection })
    .join(
      { workout: availableWorkoutsCollection },
      ({ finishedWorkout, workout }) => eq(finishedWorkout.workoutId, workout.id),
      "inner",
    )
    .where(({ finishedWorkout }) =>
      and(
        gte(finishedWorkout.timestampAsDate, Temporals.Utils.plainDateToDate(day)),
        lt(finishedWorkout.timestampAsDate, Temporals.Utils.plainDateToDate(day.add({ days: 1 }))),
      ),
    )
    .select(({ finishedWorkout, workout }) => ({ ...finishedWorkout, workout }));
}

export function useTodaysWorkout(day: Temporal.PlainDate) {
  const { data: finishedWorkouts } = useLiveQuery({ query: finishedWorkoutsQuery(day) });
  return useLiveQuery({
    query: plannedWorkoutsQuery(day).where(({ plannedWorkout }) =>
      not(
        inArray(
          plannedWorkout.workoutId,
          finishedWorkouts.map((fw) => fw.workoutId),
        ),
      ),
    ),
  });
}
