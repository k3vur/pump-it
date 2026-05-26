import {
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db";
import { FinishedWorkout } from "./schema";
import SuperJSON from "superjson";

const finishedWorkoutsCollection = createCollection(
  localStorageCollectionOptions({
    id: "finished-workouts",
    storageKey: "pump-it-finished-workouts",
    schema: FinishedWorkout,
    parser: SuperJSON,
    getKey: (fw) => fw.id,
  }),
);
