import {
  BasicIndex,
  BTreeIndex,
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db";
import SuperJSON from "superjson";

import { FinishedWorkout, PlannedWorkout, Workout } from "./schema";

export const availableWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "available-workouts",
    storageKey: "pump-it-available-workouts",
    schema: Workout,
    parser: SuperJSON,
    getKey: (w) => w.id,
  }),
);

availableWorkoutsCollection.onFirstReady(() => {
  if (availableWorkoutsCollection.size === 0) {
    availableWorkoutsCollection.insert({
      id: "8m02rbEXpr4",
      type: "youtube",
      video_id: "8m02rbEXpr4",
      title: "15 Min Abs Workout",
      duration: new Temporal.Duration(0, 0, 0, 0, 0, 15, 40),
    });
  }
});

export const finishedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "finished-workouts",
    storageKey: "pump-it-finished-workouts",
    schema: FinishedWorkout,
    parser: SuperJSON,
    getKey: finishedWorkoutId,
  }),
);

export function finishedWorkoutId(finishedWorkout: FinishedWorkout): string {
  return `${finishedWorkout.workoutId}:${finishedWorkout.timestamp.toString()}`;
}

export const plannedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "planned-workouts",
    storageKey: "pump-it-selected-workouts",
    schema: PlannedWorkout,
    getKey: plannedWorkoutId,
    parser: SuperJSON,
  }),
);

export function plannedWorkoutId(plannedWorkout: PlannedWorkout): string {
  return `${plannedWorkout.workoutId}:${plannedWorkout.day.toString()}`;
}

plannedWorkoutsCollection.createIndex((pw) => pw.workoutId, { indexType: BasicIndex });
plannedWorkoutsCollection.createIndex((pw) => pw.dayAsDate, { indexType: BTreeIndex });
