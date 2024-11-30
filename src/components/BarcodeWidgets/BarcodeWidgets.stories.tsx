import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

import BarcodeWidgets, { Barcode, Barcodes } from './BarcodeWidgets';
import React, { useMemo } from 'react';

type ExtraArgs = { uniqueCodes?: number };
type PropsWithArgs = React.ComponentProps<typeof BarcodeWidgets> & ExtraArgs

const generateFakes = (count: number): Barcodes => {
    faker.seed(1);
    return faker.helpers.multiple(generateFake, { count })
}

const generateFake = (): Barcode => {
    return {
        code: faker.string.numeric({ length: { min: 8, max: 20 } }),
        type: faker.helpers.arrayElement(['UPC_EAN', 'UPC', 'ABC']),
    }
}

const meta = {
    // component: BarcodeWidgets,
    render: ({ uniqueCodes, barcodes, ...props }) => {

        const barcodeItems = uniqueCodes ? generateFakes(uniqueCodes) : barcodes
        // let barcodeItems = uniqueCodes ? generateFakes(uniqueCodes) : barcodes
        console.log(barcodeItems)
        return <BarcodeWidgets barcodes={barcodeItems} {...props} />
    }
} satisfies Meta<PropsWithArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    argTypes: {
        uniqueCodes: {
            control: {
                type: 'range',
                min: 0,
                max: 6,
            },
        },
    },
    args: { uniqueCodes: 1, barcodes: [] },
} satisfies Story;

export const EmptyState: Story = {
    args: { barcodes: [] }
}


export const TwoState: Story = {
    args: { barcodes: [{ code: '12345676', 'type': 'UPC_EAN' }] }
}