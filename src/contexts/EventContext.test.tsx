import { render, waitFor } from "@testing-library/react"
// import { EventContext, EventProvider, useEventContext } from "./EventContext"
import { Server } from 'mock-socket';
import { log } from "console";
import { WebsocketBuilder } from "websocket-ts";
import { useState } from "react";
import { createEventContext } from "./EventContext";

test("useEventContext() should allow subscription", async () => {

    // Create an event
    const { EventProvider, useEventContext } = createEventContext<{ message: string }>()

    const fakeUrl = "ws://localhost"
    const server = new Server(fakeUrl)

    // When something connects, send a message
    server.on('connection', (socket) => {
        socket.send(JSON.stringify({ message: "got a message" }))
    })

    const ListeningComponent = () => {
        const eventContext = useEventContext()
        const [value, setValue] = useState<string>()
        eventContext?.onMessage((message) => {
            setValue(message.message)
        })

        return <p role="item">{value ?? "n/a"}</p>
    }

    // Render - this will trigger a connection
    const result = render(
        <EventProvider url={fakeUrl}>
            <ListeningComponent />
        </EventProvider>
    )

    // Look for the text
    result.findByText("got a message")

    server.stop()
})

test("it should mock a websockets server", (done) => {

    const fakeUrl = "ws://localhost"
    const server = new Server(fakeUrl)

    expect.assertions(1)

    // Wait for a connection
    server.on("connection", (socket) => {
        expect(socket.readyState).toBe(socket.OPEN)
        server.stop(done);
    })

    // Connect
    const socket = new WebsocketBuilder(fakeUrl).build();

})