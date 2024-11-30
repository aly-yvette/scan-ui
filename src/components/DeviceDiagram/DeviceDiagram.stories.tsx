import type { Meta, StoryObj } from '@storybook/react';

import DeviceDiagram from './DeviceDiagram';

const meta = {
    component: DeviceDiagram,
} satisfies Meta<typeof DeviceDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    argTypes: {
        placeholderHeight: {
            control: {
                type: 'range',
                min: -.5,
                max: 1,
                step: 0.01,
            }
        }
    },
    args: {
        scanning: true,
        placeholderHeight: 0
    },
    parameters: {
        react: { rsc: true },
    },

};