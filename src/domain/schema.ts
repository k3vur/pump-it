import { z } from "zod";
import { zt } from "zod-temporal";

const BaseWorkout = z.object({
  title: z.string(),
  durationSeconds: z.number(),
  description: z.string().optional(),
});

export const YouTubeWorkoutSchema = BaseWorkout.extend({
  type: z.literal("youtube"),
  video_id: z.string().min(1, "Video ID is required"),
});

export const Workout = z.discriminatedUnion("type", [YouTubeWorkoutSchema]);

/**
 * Global list of all offered Workouts
 */
export const WorkoutPlan = z.array(Workout);

/**
 * Selected Workouts for a day
 */
export const WorkoutSelection = z.object({
  day: zt.plainDate(),
  workouts: z.array(Workout),
});

/**
 * Finished Workout
 */
export const FinishedWorkout = z.object({
  workout: Workout,
  timestamp: zt.instant(),
});

export const FinishedWorkoutSession = z.object({
  day: zt.plainDate(),
  finishedWorkouts: z.array(FinishedWorkout),
});

// Export inferred types
export type Workout = z.infer<typeof Workout>;
export type WorkoutPlan = z.infer<typeof WorkoutPlan>;
export type WorkoutSelection = z.infer<typeof WorkoutSelection>;
export type FinishedWorkout = z.infer<typeof FinishedWorkout>;
export type FinishedWorkoutSession = z.infer<typeof FinishedWorkoutSession>;

// LocalStorage Schema
const LocalStorageSchema = z.object({
  /**
   * reverse-chronologically ordered
   */
  selectedWorkouts: z.array(WorkoutSelection),

  /**
   * reverse-chronologically ordered
   */
  finishedWorkouts: z.array(FinishedWorkout),
});

export type LocalStorage = z.infer<typeof LocalStorageSchema>;
