export function plainDateToDate(plainDate: Temporal.PlainDate): Date {
  return new Date(
    plainDate.toZonedDateTime({
      plainTime: Temporal.PlainTime.from({ hour: 0 }),
      timeZone: "UTC",
    }).epochMilliseconds,
  );
}

export function instantToDate(instant: Temporal.Instant): Date {
  return new Date(instant.epochMilliseconds);
}

export function durationFromSeconds(seconds: number): Temporal.Duration {
  return Temporal.Duration.from({ seconds }).round({ largestUnit: "hour", smallestUnit: "second" });
}
