import { createCollection, localStorageCollectionOptions } from "@tanstack/react-db";
import SuperJSON from "superjson";

import { FinishedWorkout } from "./schema";

export const finishedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "finished-workouts",
    storageKey: "pump-it-finished-workouts",
    schema: FinishedWorkout,
    parser: SuperJSON,
    getKey: (fw) => fw.id,
  }),
);
