
import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import { createContext, useContext } from "react";
import { ConstantBackoff, Websocket, WebsocketBuilder, WebsocketEvent } from 'websocket-ts';

type EventContextValue<T> = {
    socket: Websocket
    send: (data: T) => void
    onMessage: (callback: (message: T) => void) => void
    sendRaw: WebSocket['send']
}

export type EventProviderProps = {
    /**
     * Websockets URL to connect to
     */
    url: string,
    children: ReactNode
}

/**
 * createEventProvider
 * 
 * Produces a typed pair of an EventProvider and a useEventContext hook
 */
export function createEventContext<TEvents>(): {
    EventProvider: (props: EventProviderProps) => ReactNode,
    useEventContext: () => EventContextValue<TEvents>
} {
    // Create the provider
    const EventContext = createContext<EventContextValue<TEvents> | null>(null);

    // Wrap the provider
    const EventProvider = ({ children, url }: EventProviderProps) => {
        // @todo we might want this to be passed in instead
        // Build the initial socket
        const socket = useRef<Websocket | undefined>(undefined)
        useEffect(() => {
            if (socket.current == undefined) {
                console.log("building")
                socket.current = new WebsocketBuilder(url).withBackoff(new ConstantBackoff(1000)).build()
            }
        }, [url])

        // Send with JSON encoding
        const send = useCallback((data: TEvents) => {
            socket.current?.send(JSON.stringify(data))
        }, [socket])

        // onMessage subscriber
        const onMessage = useCallback((callback: (message: TEvents) => void) => {
            socket.current?.addEventListener(WebsocketEvent.message, async (_instance, event) => {
                const data = await JSON.parse(event.data)
                callback(data)
            })
        }, [socket])

        // @todo this should be different
        if (socket.current === undefined) {
            return
        }

        const value: EventContextValue<TEvents> = { socket: socket.current, send, onMessage, sendRaw: socket.current?.send }
        return <EventContext.Provider value={value}>{children}</EventContext.Provider>
    }

    const useEventContext = (): EventContextValue<TEvents> => {
        const eventContext = useContext(EventContext)
        return eventContext!
    }

    return {
        EventProvider,
        useEventContext,
    }
}
