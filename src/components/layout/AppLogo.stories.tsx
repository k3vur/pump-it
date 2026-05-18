import type { Meta, StoryObj } from "@storybook/react";
import { AppLogo } from "./AppLogo";

const meta: Meta<typeof AppLogo> = {
  title: "Components/Layout/AppLogo",
  component: AppLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "mobile1",
    },
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
