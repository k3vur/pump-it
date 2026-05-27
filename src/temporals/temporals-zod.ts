import "temporal-polyfill/global";
import z from "zod";

export const zodPlainDate = () =>
  z.union([z.string(), z.instanceof(Temporal.PlainDate)]).transform<Temporal.PlainDate>((value) => {
    if (typeof value === "string") {
      return new Date(value)
        .toTemporalInstant()
        .toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO())
        .toPlainDate();
    } else {
      return value;
    }
  });

export const zodDuration = () =>
  z.union([z.number().nonnegative(), z.instanceof(Temporal.Duration)]).transform((value) => {
    if (typeof value === "number") {
      return Temporal.Duration.from({ seconds: value });
    } else {
      return value;
    }
  });

export const zodInstant = () =>
  z.union([z.number().nonnegative(), z.instanceof(Temporal.Instant)]).transform((value) => {
    if (typeof value === "number") {
      return new Date(value).toTemporalInstant();
    } else {
      return value;
    }
  });
