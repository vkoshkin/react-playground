import {
    feedWsConnect,
    feedWsConnecting,
    feedWsOpen,
    feedWsClose,
    feedWsError,
    feedWsMessage,
    feedWsDisconnect,
    initialState,
} from "./common-feed";
import reducer from "./common-feed";
import { CommonFeedResult } from "./api";
import { Order } from "./types";
import { WebSocketStatus } from "../utils/websockets";

describe("common-feed", () => {
    it("should not change state when connect called", () => {
        expect(reducer.reducer({ ...initialState }, feedWsConnect("")))
            .toEqual({ ...initialState });
    });

    it("should update connecting status when connection status changed", () => {
        expect(reducer.reducer({ ...initialState }, feedWsConnecting()))
            .toEqual({ ...initialState, status: WebSocketStatus.CONNECTING });
    });

    it("should remove error flag when connecting", () => {
        expect(reducer.reducer({ ...initialState, error: true }, feedWsConnecting()))
            .toEqual({ ...initialState, status: WebSocketStatus.CONNECTING, error: false });
    });

    it("should update status when connection established", () => {
        expect(reducer.reducer({ ...initialState }, feedWsOpen()))
            .toEqual({ ...initialState, status: WebSocketStatus.ONLINE, error: false });
    });

    it("should update status when connection closed", () => {
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, feedWsClose()))
            .toEqual({ ...initialState, status: WebSocketStatus.OFFLINE });
    });

    it("should set error when error caught", () => {
        expect(reducer.reducer({ ...initialState }, feedWsError("Error!")))
            .toEqual({ ...initialState, error: true });
    });

    it("should update status when disconnect called by user", () => {
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, feedWsDisconnect()))
            .toEqual({ ...initialState, status: WebSocketStatus.OFFLINE });
    });


    const testOrders: Array<Order> = [{
        "_id": "66ad13d1119d45001b4fd2eb",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        "name": "Space флюоресцентный бургер",
        "createdAt": "2024-08-02T17:13:53.079Z",
        "updatedAt": "2024-08-02T17:13:53.863Z",
        "number": 48192
    },
    {
        "_id": "66ad13d1119d45001b4fd2ec",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa093d"
        ],
        "status": "inprogress",
        "name": "Space флюоресцентный бургер",
        "createdAt": "2024-08-02T17:13:53.140Z",
        "updatedAt": "2024-08-02T17:13:53.974Z",
        "number": 48193
    }];

    it("should update orders when successful message received", () => {
        const input: CommonFeedResult = {
            success: true,
            orders: testOrders,
            total: 2,
            totalToday: 2,
        };
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, feedWsMessage(input)))
            .toEqual({
                ...initialState,
                error: false,
                status: WebSocketStatus.ONLINE,
                orders: testOrders,
                ready: [testOrders[0].number],
                inProgress: [testOrders[1].number],
                ordersTotal: 2,
                ordersToday: 2,
            });
    });

    it("should set error when message returns error", () => {
        const input: CommonFeedResult = {
            success: false,
            orders: testOrders,
            total: 2,
            totalToday: 2,
        };
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, feedWsMessage(input)))
            .toEqual({
                ...initialState,
                error: true,
                status: WebSocketStatus.ONLINE,
                orders: [],
                ready: [],
                inProgress: [],
                ordersTotal: 0,
                ordersToday: 0,
            });
    });
});
