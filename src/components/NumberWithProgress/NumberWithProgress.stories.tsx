import type { Meta, StoryObj } from '@storybook/react';

import NumberWithProgress from './NumberWithProgress';

const meta = {
  component: NumberWithProgress,
} satisfies Meta<typeof NumberWithProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 10,
      },
    },
  },
  args: { number: '38g', progress: 50 }
};