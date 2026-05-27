import { createCollection, localStorageCollectionOptions } from "@tanstack/react-db";
import SuperJSON from "superjson";

import { Workout } from "./schema";

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
