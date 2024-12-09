import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useReducedMotion } from '@react-spring/web';
import { createEventContext } from './contexts/EventContext';
import { WebsocketEvent } from 'websocket-ts';
import { number } from 'prop-types';
import NumberWithProgress from './components/NumberWithProgress/NumberWithProgress';
import NumberWithSpark from './components/NumberWithSpark/NumberWithSpark';

type EventType<TEventName extends string, TPayload extends object> = {
  type: TEventName,
  payload: TPayload,
}

export type ScanEvent = EventType<'scan', {
  code: string,
  type: string
}>

export type WeightEvent = EventType<'weight', {
  value: number,
}>

// Create a union type of all events
export type Events = ScanEvent | WeightEvent

// Create an re-export
export const { EventProvider, useEventContext } = createEventContext<Events>()

const SendMessage = () => {
  const { send, onMessage, socket } = useEventContext()

  const [weight, setWeight] = useState<number>(0)
  const [minWeight, setMinWeight] = useState<number>(0)
  const [maxWeight, setMaxWeight] = useState<number>(100)
  const [weightHistory, setWeightHistory] = useState<number[]>([])
  const [messages, setMessages] = useState<any[]>([])

  const samples = 25

  // Watch for messages
  onMessage((message) => {
    if (message.type === "weight") {
      // Update the current value 
      setWeight(message.payload.value)

      // Trim the list if it's too long before adding
      if (weightHistory.length > samples) {
        weightHistory.shift()
      }

      // Add the latest
      setWeightHistory([...weightHistory, message.payload.value])

      if (weight > maxWeight) {
        setMaxWeight(weight)
      }

      if (weight < minWeight) {
        setMinWeight(weight)
      }

    } else {
      setMessages([...messages, message])
    }
  })
  // console.log("w", weightHistory)
  return <div className="container">
    <NumberWithSpark number={weight ?? 0} suffix='g' history={weightHistory} min={minWeight} max={maxWeight} samples={samples} />

    <div>
      <button onClick={() => {
        send({ type: "scan", payload: { code: 'hi', type: 'fake' } })
      }}>Send</button>

      <ul>
        {messages.map((message, i) => <li key={i}>{message.type}</li>)}
      </ul>
    </div>
  </div>
}

function App() {

  // Reduce motion as needed
  useReducedMotion()

  return (
    // Setup the event provider
    <EventProvider url="ws://tin.local:8085">
      <div className="App">
        <SendMessage />
      </div>
    </EventProvider>
  );
}

export default App;
