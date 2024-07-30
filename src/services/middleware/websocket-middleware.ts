import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";

export type WsActionTypes = {
    readonly connect?: ActionCreatorWithPayload<string>, // @vkoshkin remove ?
    readonly disconnect?: ActionCreatorWithoutPayload,   // @vkoshkin remove ?
    readonly sendMessage?: ActionCreatorWithPayload<any>,
    readonly onConnecting?: ActionCreatorWithoutPayload,
    readonly onOpen?: ActionCreatorWithoutPayload,       // @vkoshkin remove ?
    readonly onClose?: ActionCreatorWithoutPayload,      // @vkoshkin remove ?
    readonly onMessage?: ActionCreatorWithPayload<any>,  // @vkoshkin remove ?
    readonly onError?: ActionCreatorWithPayload<string>, // @vkoshkin remove ?
};

const RECONNECT_PERIOD_MS: number = 1000;

export const socketMiddleware = (wsActions: WsActionTypes): Middleware<{}, any> => {
    return ({ dispatch }) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        let connected: boolean = false;
        const { connect, disconnect, sendMessage, onConnecting, onOpen, onClose, onMessage, onError } = wsActions;

        return next => action => {
            if (connect?.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                connected = true;
                onConnecting && dispatch(onConnecting());
                
                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                };
                socket.onclose = () => {
                    onClose && dispatch(onClose());

                    if (connected) {
                        window.setTimeout(() => {
                            connect && url && dispatch(connect(url));
                        }, RECONNECT_PERIOD_MS);
                    }
                };
                socket.onerror = (event) => {
                    onError && dispatch(onError(event.type)); 
                };
                socket.onmessage = (event: MessageEvent<any>) => {
                    const { data } = event;
                    try {
                        const parsed = JSON.parse(data);
                        onMessage && dispatch(onMessage(parsed));
                    } catch (error) {
                        onError && dispatch(onError((error as Error).message))
                    }
                };

            } 

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (error) {
                    onError && dispatch(onError((error as Error).message))
                }
            }

            if (socket && disconnect?.match(action)) {
                connected = false;
                socket.close();
                socket = null;
            }

            next(action);
        };
    };
}
