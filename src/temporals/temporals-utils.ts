export function plainDateToDate(plainDate: Temporal.PlainDate): Date {
  return new Date(
    plainDate.toZonedDateTime({
      plainTime: Temporal.PlainTime.from({ hour: 0 }),
      timeZone: "UTC",
    }).epochMilliseconds,
  );
}
