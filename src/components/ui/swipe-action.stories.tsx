import { Button } from "@base-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Trash2 } from "lucide-react";

import { SwipeAction } from "./swipe-action";
import { YouTubeWorkoutCard } from "./youtube-workout-card";

const meta: Meta<typeof SwipeAction> = {
  title: "Components/UI/SwipeAction",
  component: SwipeAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SwipeAction>;

export const Default: Story = {
  args: {
    className: "bg-primary border border-gray-500 rounded",
    action: <Button className="border border-destructive px-5">X</Button>,
    maxLeftOffset: -50,
    children: <div className="w-full bg-surface p-20 text-center text-white">HELLO</div>,
  },
};

export const YouTubeCardDelete: Story = {
  args: {
    className: "bg-destructive rounded-xl",
    action: (
      <Button className="px-5 text-white">
        <Trash2 />
      </Button>
    ),
    maxLeftOffset: -64,
    children: (
      <YouTubeWorkoutCard
        workout={{
          id: "15-min-abs-workout",
          type: "youtube",
          duration: new Temporal.Duration(0, 0, 0, 0, 0, 15, 40),
          title: "15 MIN ABS WORKOUT | No Equipment",
          video_id: "8m02rbEXpr4",
        }}
      />
    ),
  },
};
