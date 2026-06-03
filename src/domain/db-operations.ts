import { eq, gte, inArray, max, not, Query, queryOnce, useLiveQuery } from "@tanstack/react-db";

import { Temporals } from "#/temporals";

import {
  availableWorkoutsCollection,
  finishedWorkoutsCollection,
  plannedWorkoutsCollection,
} from "./db-collections";
import { PlannedWorkout, Workout } from "./schema";

async function findMaxId(): Promise<number> {
  const maxId = await queryOnce((q) =>
    q
      .from({ plannedWorkouts: plannedWorkoutsCollection })
      .select(({ plannedWorkouts }) => ({ maxId: max(plannedWorkouts.id) }))
      .findOne(),
  );
  return maxId?.maxId ?? 0;
}

export async function planWorkout(
  day: Temporal.PlainDate,
  workout: string | Workout,
): Promise<void> {
  const maxId = await findMaxId();
  const workoutId = typeof workout === "string" ? workout : workout.id;
  plannedWorkoutsCollection.insert({ id: maxId + 1, day, workoutId });
}

export async function removePlannedWorkout(workout: number | PlannedWorkout): Promise<void> {
  const deleteId = typeof workout === "number" ? workout : workout.id;
  plannedWorkoutsCollection.delete(deleteId);
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
  const threeDaysAgo = day.subtract(Temporal.Duration.from({ days: 3 }));
  const { data: recentWorkouts } = useLiveQuery({ query: recentWorkoutsQuery(threeDaysAgo) });
  const { data: plannedWorkout } = useLiveQuery({ query: plannedWorkoutsQuery(day) });
  const excludedWorkouts = [...recentWorkouts.map((w) => w.id), ...plannedWorkout.map((w) => w.id)];
  return useLiveQuery((q) =>
    q
      .from({ workout: availableWorkoutsCollection })
      .where(({ workout }) => not(inArray(workout.id, excludedWorkouts))),
  );
}
