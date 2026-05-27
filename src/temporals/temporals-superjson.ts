import SuperJSON from "superjson";

SuperJSON.registerCustom<Temporal.PlainDate, string>(
  {
    isApplicable: (v: unknown): v is Temporal.PlainDate => v instanceof Temporal.PlainDate,
    serialize: (v: Temporal.PlainDate) => v.toJSON(),
    deserialize: (v: string) => Temporal.PlainDate.from(v),
  },
  "Temporal.PlainDate",
);

SuperJSON.registerCustom<Temporal.Duration, string>(
  {
    isApplicable: (v: unknown): v is Temporal.Duration => v instanceof Temporal.Duration,
    serialize: (v: Temporal.Duration) => v.toJSON(),
    deserialize: (v: string) => Temporal.Duration.from(v),
  },
  "Temporal.Duration",
);

SuperJSON.registerCustom<Temporal.Instant, string>(
  {
    isApplicable: (v: unknown): v is Temporal.Instant => v instanceof Temporal.Instant,
    serialize: (v: Temporal.Instant) => v.toJSON(),
    deserialize: (v: string) => Temporal.Instant.from(v),
  },
  "Temporal.Instant",
);
