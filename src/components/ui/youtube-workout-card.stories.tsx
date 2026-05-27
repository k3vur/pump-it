import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { YouTubeWorkoutCard } from "./youtube-workout-card";

const meta: Meta<typeof YouTubeWorkoutCard> = {
  title: "Components/UI/YouTubeWorkoutCard",
  component: YouTubeWorkoutCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof YouTubeWorkoutCard>;

export const Default: Story = {
  args: {
    workout: {
      id: "15-min-abs-workout",
      type: "youtube",
      duration: new Temporal.Duration(0, 0, 0, 0, 0, 15, 40),
      title: "15 MIN ABS WORKOUT | No Equipment",
      video_id: "8m02rbEXpr4",
    },
    children: <Button className="w-full">Finish</Button>,
  },
};
