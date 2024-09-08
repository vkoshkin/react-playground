import {
    orderRequest,
    orderRequestSuccess,
    orderRequestError,
    orderSelect,
    orderFetchRequest,
    orderFetchError,
    orderFetchSuccess,
    initialState,
} from "./order";
import reducer from "./order";
import { Order } from "./types";

describe("order", () => {
    it("should set order request when posting order", () => {
        expect(reducer.reducer({ ...initialState }, orderRequest()))
            .toEqual({ ...initialState, request: true });
    });
    it("should set order request error when error caught", () => {
        expect(reducer.reducer({ ...initialState, request: true }, orderRequestError()))
            .toEqual({ ...initialState, request: false, requestError: true });
    });
    it("should set order number when order accepted", () => {
        const orderNumber = 48192;
        expect(reducer.reducer({ ...initialState, request: true }, orderRequestSuccess(orderNumber)))
            .toEqual({ ...initialState, request: false, requestError: false, orderNumber: orderNumber });
    });

    const testOrder: Order = {
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
    };

    it("should set request when fetching order", () => {
        expect(reducer.reducer({ ...initialState }, orderFetchRequest()))
            .toEqual({ ...initialState, fetchRequest: true });
    });
    it("should clear order when fetching another order", () => {
        expect(reducer.reducer({ ...initialState, selectedOrder: testOrder }, orderFetchRequest()))
            .toEqual({ ...initialState, selectedOrder: null, fetchRequest: true });
    });
    it("should set order fetch request error when error caught", () => {
        expect(reducer.reducer({ ...initialState, fetchRequest: true }, orderFetchError()))
            .toEqual({ ...initialState, fetchRequest: false, fetchError: true });
    });
    it("should set selected order after fetch request", () => {
        expect(reducer.reducer({ ...initialState, fetchRequest: true }, orderFetchSuccess(testOrder)))
            .toEqual({ ...initialState, fetchRequest: false, fetchError: false, selectedOrder: testOrder });
    });

    it("should set selected order after user selected order", () => {
        expect(reducer.reducer({ ...initialState }, orderSelect(testOrder)))
            .toEqual({ ...initialState, selectedOrder: testOrder });
    });
});
