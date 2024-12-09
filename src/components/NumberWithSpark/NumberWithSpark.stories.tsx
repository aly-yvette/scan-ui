import type { Meta, StoryObj } from '@storybook/react';

import NumberWithSpark from './NumberWithSpark';

const meta = {
    component: NumberWithSpark,
} satisfies Meta<typeof NumberWithSpark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    // argTypes: {
    // progress: {
    //     control: {
    //         type: 'range',
    //         min: 0,
    //         max: 100,
    //         step: 10,
    //     },
    // },
    // },
    args: { number: 38, suffix: 'g', history: [1, 5, 2, 3, 7, 1, 5] }
};