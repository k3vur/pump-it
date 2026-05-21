import type { AvailableWorkouts } from "./domain/schema";

export const WORKOUT_PLAN: AvailableWorkouts = [
  {
    id: "8m02rbEXpr4",
    type: "youtube",
    video_id: "8m02rbEXpr4",
    title: "15 Min Abs Workout",
    duration: new Temporal.Duration(0, 0, 0, 0, 0, 15, 40),
  },
] as const;
