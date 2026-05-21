import {
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db";
import { PlannedWorkout } from "../domain/schema";

export const plannedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "selected-workouts",
    storageKey: "pump-it-selected-workouts",
    schema: PlannedWorkout,
    getKey: (fw) => fw.id,
  }),
);
