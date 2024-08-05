import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Order } from "./types";
import { WebSocketStatus } from "../utils/websockets";

type ProfileFeedState = {
    status: WebSocketStatus;
    orders: Array<Order>;
    error: boolean;
}

const initialState: ProfileFeedState = {
    status: WebSocketStatus.OFFLINE,
    orders: [],
    error: false,
};

const slice = createSlice({
    name: "profileFeed",
    initialState,
    reducers: {
        profileWsConnect: {
            reducer: (state: ProfileFeedState, action: PayloadAction<string>) => {
            },
            prepare: (url: string) => {
                const accessToken = localStorage.getItem("accessToken")?.substring(7);
                console.log(`${url}?token=${accessToken}`);
                return {
                    payload: `${url}?token=${accessToken}`
                };
            }
        },
        profileWsConnecting: (state: ProfileFeedState) => {
            state.status = WebSocketStatus.CONNECTING;
            state.error = false;
        },
        profileWsOpen: (state: ProfileFeedState) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = false;
        },
        profileWsClose: (state: ProfileFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
        },
        profileWsError: (state: ProfileFeedState, action: PayloadAction<string>) => {
            console.log(`${state.status} ${action.payload}`);
            state.error = true;
        },
        profileWsMessage: (state: ProfileFeedState, action: PayloadAction<any>) => {
            if (!action.payload.success) {
                state.error = true;
                return;
            }
            console.log(action.payload);

            state.orders = action.payload.orders;
            state.error = false;
        },
        profileWsDisconnect: (state: ProfileFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
            state.error = false;
        },
    }
});

export const {
    profileWsConnect,
    profileWsConnecting,
    profileWsOpen,
    profileWsClose,
    profileWsError,
    profileWsMessage,
    profileWsDisconnect,
} = slice.actions;

export default slice;
