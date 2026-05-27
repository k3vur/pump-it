import { instantToDate, plainDateToDate } from "./temporals-utils";
import { zodDuration, zodInstant, zodPlainDate } from "./temporals-zod";

export const Temporals = {
  Zod: {
    instant: zodInstant,
    duration: zodDuration,
    plainDate: zodPlainDate,
  },
  Utils: {
    plainDateToDate,
    instantToDate,
  },
};
