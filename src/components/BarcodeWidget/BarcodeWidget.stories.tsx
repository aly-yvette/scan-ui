import type { Meta, StoryObj } from '@storybook/react';

import BarcodeWidget from './BarcodeWidget';

const meta = {
  component: BarcodeWidget,
} satisfies Meta<typeof BarcodeWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { code: '02351234', type: 'UPC_EAN' }
};