import type { Meta, StoryObj } from "@storybook/react";

import { AppLogo } from "./app-logo";

const meta: Meta<typeof AppLogo> = {
  title: "Components/Layout/AppLogo",
  component: AppLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "",
  },
};

export default meta;

type Story = StoryObj<typeof AppLogo>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: "p-4 bg-black",
  },
};
