import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WebSocketStatus } from "../utils/websockets";
import { Order } from "./types";

type CommonFeedState = {
    status: WebSocketStatus;
    orders: Array<Order>;
    error: boolean;
};

const initialState: CommonFeedState = {
    status: WebSocketStatus.OFFLINE,
    orders: [],
    error: false,
};

const slice = createSlice({
    name: "commonFeed",
    initialState,
    reducers: {
        wsConnect: (state: CommonFeedState, action: PayloadAction<string>) => {
        },
        wsConnecting: (state: CommonFeedState) => {
            state.status = WebSocketStatus.CONNECTING;
            state.error = false;
        },
        wsOpen: (state: CommonFeedState) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = false;
        },
        wsClose: (state: CommonFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
        },
        wsError: (state: CommonFeedState, action: PayloadAction<string>) => {
            console.log(`${state.status} ${action.payload}`);
            state.error = true;
        },
        wsMessage: (state: CommonFeedState, action: PayloadAction<any>) => {
            console.log(action.payload);
        },
        wsDisconnect: (state: CommonFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
            state.error = false;
        },
    }
});

export const {
    wsConnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
    wsDisconnect,
} = slice.actions;

export default slice;
