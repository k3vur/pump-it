import { takeWhile } from "es-toolkit/array";

import { WorkoutSelection, type FinishedWorkout, type FinishedWorkoutSession } from "./schema";

/**
 * Get the Temporal.PlainDate on which given FinishedWorkout was finished.
 */
export function getFinishedWorkoutPlainDate(finishedWorkout: FinishedWorkout): Temporal.PlainDate {
  return finishedWorkout.timestamp
    .toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO())
    .toPlainDate();
}

/**
 * Finds the first workout session that happened on or before the given date.
 */
export function findPreviousFinishedWorkoutSession(
  finishedWorkouts: FinishedWorkout[],
  date: Temporal.PlainDate,
): FinishedWorkoutSession | null {
  const previousLastWorkoutIndex = finishedWorkouts.findIndex(
    (w) => Temporal.PlainDate.compare(getFinishedWorkoutPlainDate(w), date) <= 0,
  );
  if (previousLastWorkoutIndex < 0) {
    return null;
  }

  const lastWorkoutSessionDate = getFinishedWorkoutPlainDate(
    finishedWorkouts[previousLastWorkoutIndex],
  );
  const finishedWorkoutsForSession = takeWhile(
    finishedWorkouts.slice(previousLastWorkoutIndex),
    (w) => getFinishedWorkoutPlainDate(w).equals(lastWorkoutSessionDate),
  );

  return {
    day: lastWorkoutSessionDate,
    finishedWorkouts: finishedWorkoutsForSession,
  };
}

/**
 * Inserts a workoutSelection into a list of workoutSelection at the correct index. If workout selection with that date exists, it is replaced.
 */
export function setWorkoutSelection(
  existingWorkoutSelections: WorkoutSelection[],
  newWorkoutSelection: WorkoutSelection,
): WorkoutSelection[] {
  const insertIndex = existingWorkoutSelections.findIndex(
    (ws) => Temporal.PlainDate.compare(ws.day, newWorkoutSelection.day) <= 0,
  );
  const atIndexIsSameDate = existingWorkoutSelections[insertIndex].day.equals(
    newWorkoutSelection.day,
  );
  return existingWorkoutSelections.toSpliced(
    insertIndex,
    atIndexIsSameDate ? 1 : 0,
    newWorkoutSelection,
  );
}
