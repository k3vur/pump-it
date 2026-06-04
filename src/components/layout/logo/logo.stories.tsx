import type { Meta, StoryObj } from "@storybook/react";

import { LogoText } from "./logo-text";

const meta: Meta<typeof LogoText> = {
  title: "Components/Layout/AppLogo",
  component: LogoText,
  tags: ["autodocs"],
  parameters: {
    layout: "",
  },
};

export default meta;

type Story = StoryObj<typeof LogoText>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: "p-4 bg-black",
  },
};
