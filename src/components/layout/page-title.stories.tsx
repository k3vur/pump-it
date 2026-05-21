import type { Meta, StoryObj } from "@storybook/react";

import { PageTitle } from "./page-title";

const meta: Meta<typeof PageTitle> = {
  title: "Components/UI/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    children: "page Title",
  },
};
