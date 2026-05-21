import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, Dumbbell } from "lucide-react";

import { Nav } from "./index";

const meta: Meta = {
  title: "Components/Layout/Navigation",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Nav.Bar>
      <Nav.LinkItem to="." icon={Dumbbell} label="Workout">
        Workout
      </Nav.LinkItem>
      <Nav.LinkItem to="/plan" icon={Calendar} label="Plan">
        Plan
      </Nav.LinkItem>
    </Nav.Bar>
  ),
};
