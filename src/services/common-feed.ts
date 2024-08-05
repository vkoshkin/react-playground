import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CommonFeedResult } from "./api";
import { OrderId, OrderNumber, Order } from "./types";
import { WebSocketStatus } from "../utils/websockets";

type CommonFeedState = {
    status: WebSocketStatus;
    orders: Array<Order>;
    ordersTotal: number;
    ordersToday: number;
    ready: Array<OrderNumber>;
    inProgress: Array<OrderNumber>;
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
        feedWsConnect: (state: CommonFeedState, action: PayloadAction<string>) => {
        },
        feedWsConnecting: (state: CommonFeedState) => {
            state.status = WebSocketStatus.CONNECTING;
            state.error = false;
        },
        feedWsOpen: (state: CommonFeedState) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = false;
        },
        feedWsClose: (state: CommonFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
        },
        feedWsError: (state: CommonFeedState, action: PayloadAction<string>) => {
            console.log(`${state.status} ${action.payload}`);
            state.error = true;
        },
        feedWsMessage: (state: CommonFeedState, action: PayloadAction<CommonFeedResult>) => {
            if (!action.payload.success) {
                state.error = true;
                return;
            }
            console.log(action.payload);

            const ready: Array<OrderNumber> = [];
            const inProgress: Array<OrderNumber> = [];
            const set = new Set<string>();

            for (const order of action.payload.orders) {
                set.add(order.status);
                if (order.status === "done") {
                    ready.push(order.number);
                } else {
                    inProgress.push(order.number);
                }
            }

            state.orders = action.payload.orders;
            state.ordersTotal = action.payload.total;
            state.ordersToday = action.payload.totalToday;
            state.ready = ready;
            state.inProgress = inProgress;
            state.error = false;
        },
        feedWsDisconnect: (state: CommonFeedState) => {
            state.status = WebSocketStatus.OFFLINE;
            state.error = false;
        },
    }
});

export const {
    feedWsConnect,
    feedWsConnecting,
    feedWsOpen,
    feedWsClose,
    feedWsError,
    feedWsMessage,
    feedWsDisconnect,
} = slice.actions;

export default slice;
