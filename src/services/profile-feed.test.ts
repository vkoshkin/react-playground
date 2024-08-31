import {
    profileWsConnect,
    profileWsConnecting,
    profileWsOpen,
    profileWsClose,
    profileWsError,
    profileWsMessage,
    profileWsDisconnect,
    initialState,
} from "./profile-feed";
import reducer from "./profile-feed";
import { CommonFeedResult } from "./api";
import { WebSocketStatus } from "../utils/websockets";
import { Order } from "./types";

describe("profile-feed", () => {
    it("should not change state when connect called", () => {
        expect(reducer.reducer({ ...initialState }, profileWsConnect("")))
            .toEqual({ ...initialState });
    });

    it("should update connecting status when connection status changed", () => {
        expect(reducer.reducer({ ...initialState }, profileWsConnecting()))
            .toEqual({ ...initialState, status: WebSocketStatus.CONNECTING });
    });

    it("should remove error flag when connecting", () => {
        expect(reducer.reducer({ ...initialState, error: true }, profileWsConnecting()))
            .toEqual({ ...initialState, status: WebSocketStatus.CONNECTING, error: false });
    });

    it("should update status when connection established", () => {
        expect(reducer.reducer({ ...initialState }, profileWsOpen()))
            .toEqual({ ...initialState, status: WebSocketStatus.ONLINE, error: false });
    });

    it("should update status when connection closed", () => {
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, profileWsClose()))
            .toEqual({ ...initialState, status: WebSocketStatus.OFFLINE });
    });

    it("should set error when error caught", () => {
        expect(reducer.reducer({ ...initialState }, profileWsError("Error!")))
            .toEqual({ ...initialState, error: true });
    });

    it("should update status when disconnect called by user", () => {
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, profileWsDisconnect()))
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
        "status": "done",
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
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, profileWsMessage(input)))
            .toEqual({
                ...initialState,
                status: WebSocketStatus.ONLINE,
                orders: testOrders,
                error: false,
            });
    });

    it("should set error when message returns error", () => {
        const input: CommonFeedResult = {
            success: false,
            orders: testOrders,
            total: 2,
            totalToday: 2,
        };
        expect(reducer.reducer({ ...initialState, status: WebSocketStatus.ONLINE }, profileWsMessage(input)))
            .toEqual({
                ...initialState,
                status: WebSocketStatus.ONLINE,
                orders: [],
                error: true,
            });
    });

});
