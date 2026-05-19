import type { Meta, StoryObj } from "@storybook/react";

import { AppLayout } from "./AppLayout";

const meta: Meta<typeof AppLayout> = {
  title: "Components/Layout/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppLayout>;

export const Default: Story = {};
