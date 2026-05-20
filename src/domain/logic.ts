import { WORKOUT_PLAN } from "#/workoutPlan";

import { Workout, WorkoutPlan, WorkoutSelection, type LocalStorage } from "./schema";
import { findPreviousFinishedWorkoutSession, setWorkoutSelection } from "./utils";

/*
 * Pure Domain Logic.
 */

/**
 * Get defined Workout Plan
 */
export function getWorkoutPlan(): WorkoutPlan {
  return WORKOUT_PLAN;
}

/**
 * Generate suggestions for workouts on a given day:
 */
export function generateWorkoutSuggestions(
  workoutPlan: WorkoutPlan,
  localStorage: LocalStorage,
  day: Temporal.PlainDate,
): Workout[] {
  const previousFinishedWorkoutSession = findPreviousFinishedWorkoutSession(
    localStorage.finishedWorkouts,
    day,
  );
  const previousFinishedWorkoutTitles = new Set(
    previousFinishedWorkoutSession?.finishedWorkouts.map((fw) => fw.workout.title),
  );
  return workoutPlan.filter((w) => !previousFinishedWorkoutTitles.has(w.title));
}

/**
 * Add a workout to the selected workouts for a day
 */
export function selectWorkoutForDay(
  localStorage: LocalStorage,
  day: Temporal.PlainDate,
  workout: Workout,
): LocalStorage {
  const selectedWorkoutsForDay = getSelectedWorkoutsForDay(localStorage, day);
  const workoutSelection = {
    day,
    workouts: [...selectedWorkoutsForDay.workouts, workout],
  };
  return {
    ...localStorage,
    selectedWorkouts: setWorkoutSelection(localStorage.selectedWorkouts, workoutSelection),
  };
}

/**
 * Retrieves the selection of workouts for a day.
 */
export function getSelectedWorkoutsForDay(
  localStorage: LocalStorage,
  day: Temporal.PlainDate,
): WorkoutSelection {
  return (
    localStorage.selectedWorkouts.find((ws) => ws.day.equals(day)) ?? {
      day,
      workouts: [],
    }
  );
}

/**
 * Persists the fact that a workout has been completed.
 */
export type FinishWorkout = (
  localStorage: LocalStorage,
  finishTime: Temporal.Instant,
  workout: Workout,
) => LocalStorage;
