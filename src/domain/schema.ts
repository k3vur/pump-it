import { z } from "zod";

import { Temporals } from "#/temporals";

const BaseWorkout = z.object({
  id: z.string(),
  title: z.string(),
  duration: Temporals.Zod.duration(),
});

export const YouTubeWorkout = BaseWorkout.extend({
  type: z.literal("youtube"),
  video_id: z.string().min(1, "Video ID is required"),
});

export const Workout = z.discriminatedUnion("type", [YouTubeWorkout]);

/**
 * Global list of all offered Workouts
 */
export const AvailableWorkouts = z.array(Workout);

/**
 * Selected Workouts for a day
 */
export const PlannedWorkout = z
  .object({
    id: z.int(),
    workoutId: z.string(),
    day: Temporals.Zod.plainDate(),
  })
  // add legacy date type fields to support querying
  .transform((pw) => ({
    ...pw,
    dayAsDate: Temporals.Utils.plainDateToDate(pw.day),
  }));

/**
 * Finished Workout
 */
export const FinishedWorkout = z.object({
  id: z.int(),
  workout: Workout,
  timestamp: Temporals.Zod.instant(),
});

// Export inferred types
export type YouTubeWorkout = z.infer<typeof YouTubeWorkout>;
export type Workout = z.infer<typeof Workout>;
export type AvailableWorkouts = z.infer<typeof AvailableWorkouts>;
export type PlannedWorkout = z.infer<typeof PlannedWorkout>;
export type FinishedWorkout = z.infer<typeof FinishedWorkout>;
