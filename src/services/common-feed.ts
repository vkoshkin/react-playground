import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FeedResult } from "./api";
import { Order } from "./types";
import { WebSocketStatus } from "../utils/websockets";

type CommonFeedState = {
    status: WebSocketStatus;
    orders: Array<Order>;
    ordersTotal: number;
    ordersToday: number;
    ready: Array<number>;
    inProgress: Array<number>;
    error: boolean;
};

const initialState: CommonFeedState = {
    status: WebSocketStatus.OFFLINE,
    orders: [],
    ordersTotal: 0,
    ordersToday: 0,
    ready: [],
    inProgress: [],
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
        wsMessage: (state: CommonFeedState, action: PayloadAction<FeedResult>) => {
            if (!action.payload.success) {
                state.error = true;
                return;
            }

            const ready: Array<number> = [];
            const inProgress: Array<number> = [];
            const set = new Set<string>();

            for (const order of action.payload.orders) {
                set.add(order.status);
                if (order.status === "done") {
                    ready.push(order.number);
                } else {
                    inProgress.push(order.number);
                }
            }
            console.log(set);

            state.orders = action.payload.orders;
            state.ordersTotal = action.payload.total;
            state.ordersToday = action.payload.totalToday;
            state.ready = ready;
            state.inProgress = inProgress;
            state.error = false;
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
