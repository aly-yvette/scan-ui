import type { Preview } from "@storybook/react";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        {
          name: "Background",
          value:
            "radial-gradient(circle, rgba(210,9,97,1) 0%, rgba(36,63,96,1) 100%)",
        },
      ],
      default: "Background",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
