import "../src/styles.css";
import type { Preview } from "@storybook/tanstack-react";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        dark: { name: "Dark", value: "oklch(21% 0.034 264.665)" },
      },
    },

    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  initialGlobals: {
    viewport: { value: "iphone14pro", isRotated: false },
    backgrounds: { value: "dark" },
  },
};

export default preview;
