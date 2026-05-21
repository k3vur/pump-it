import type { Meta, StoryObj } from "@storybook/react";

import { AppLayout } from "./app-layout";
import { PageTitle } from "./page-title";
import { Section } from "./section";

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

export const Default: Story = {
  args: {
    children: (
      <>
        <PageTitle>Page Title</PageTitle>
        <Section.Root>
          <Section.Title>Section Title</Section.Title>
          <Section.Content>
            Exercitation Lorem labore eiusmod eiusmod laboris sit nostrud
            consequat. Sunt id ad esse proident sunt pariatur occaecat sunt ad
            nisi duis duis esse. Aute aliquip dolor voluptate commodo labore
            esse. Ullamco cillum ad tempor commodo incididunt ea officia ea
            incididunt ipsum. Aliqua amet dolor do elit adipisicing mollit
            cillum sint est eiusmod. Laboris sunt sunt in eu non consequat culpa
            in fugiat irure labore.
          </Section.Content>
        </Section.Root>
      </>
    ),
  },
};
