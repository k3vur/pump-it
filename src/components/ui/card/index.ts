import { CardRoot } from "./card-root";
import { CardContent } from "./card-root-content";
import { CardHead } from "./card-root-head";

export const Card = {
  Root: CardRoot,
  Head: CardHead,
  Content: CardContent,
} as const;
