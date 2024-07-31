import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Order } from "./types";
import { WebSocketStatus } from "../utils/websockets";

type ProfileFeedState = {
    status: WebSocketStatus;
    orders: Array<Order>;
}

const initialState: ProfileFeedState = {
    status: WebSocketStatus.OFFLINE,
    orders: [],
};

const slice = createSlice({
    name: "orderFeed",
    initialState,
    reducers: {
    }
});

export default slice;
