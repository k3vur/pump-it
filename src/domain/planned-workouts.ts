import {
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db";
import SuperJSON from "superjson";
import { PlannedWorkout } from "./schema";

export const plannedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "planned-workouts",
    storageKey: "pump-it-selected-workouts",
    schema: PlannedWorkout,
    getKey: (pw) => pw.id,
    parser: SuperJSON,
  }),
);
