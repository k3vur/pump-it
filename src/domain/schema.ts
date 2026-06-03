import { z } from "zod";

import { Temporals } from "#/temporals";

const WorkoutId = z.string();

const BaseWorkout = z.object({
  id: WorkoutId,
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
    workoutId: WorkoutId,
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
export const FinishedWorkout = z
  .object({
    workoutId: WorkoutId,
    timestamp: Temporals.Zod.instant(),
  })
  // add legacy date type fields to support querying
  .transform((fw) => ({
    ...fw,
    timestampAsDate: Temporals.Utils.instantToDate(fw.timestamp),
  }));

// Export inferred types
export type YouTubeWorkout = z.infer<typeof YouTubeWorkout>;
export type Workout = z.infer<typeof Workout>;
export type AvailableWorkouts = z.infer<typeof AvailableWorkouts>;
export type PlannedWorkout = z.infer<typeof PlannedWorkout>;
export type FinishedWorkout = z.infer<typeof FinishedWorkout>;
