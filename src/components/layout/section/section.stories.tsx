import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "./index";

const meta: Meta = {
  title: "Components/Layout/Section",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Section.Root>
      <Section.Title>Section Title</Section.Title>
      <Section.Content>
        Non dolore ea commodo Lorem commodo commodo ipsum in voluptate ut duis
        laboris ea est ullamco. Laboris culpa ipsum nisi duis aliqua proident ea
        veniam sit sit pariatur labore velit fugiat. Id incididunt consequat
        incididunt dolor culpa culpa pariatur consectetur sint irure dolore
        exercitation deserunt tempor. Cupidatat et duis cupidatat deserunt ipsum
        commodo.
      </Section.Content>
    </Section.Root>
  ),
};
