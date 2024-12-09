import type { Meta, StoryObj } from '@storybook/react';
import { createEventContext } from './EventContext';

type Event = { type: "greeting", payload: string } | { type: "farewell", payload: string }

// Create the component
const { EventProvider } = createEventContext<Event>()

const meta = {
    component: EventProvider,
} satisfies Meta<typeof EventProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { url: 'ws://localhost:8080', children: <><p>Inner Items</p></> },
};