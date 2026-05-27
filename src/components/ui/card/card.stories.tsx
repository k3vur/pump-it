import type { Meta, StoryObj } from "@storybook/react";

import { Card } from ".";

const meta: Meta = {
  title: "Components/UI/Card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card.Root>
      <Card.Head className="bg-white">Test</Card.Head>
      <Card.Content>Description!</Card.Content>
    </Card.Root>
  ),
};
