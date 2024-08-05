import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { postOrderRequest, getOrderRequest } from "./api";
import { clearConstructor } from "./constructor";
import { Ingredient, Order, OrderId, OrderNumber } from "./types";
import { AppDispatch } from "./store";

export const postOrder = (bun: Ingredient, ingredients: Array<Ingredient>) => (dispatch: AppDispatch) => {
    dispatch(orderRequest());
    let data: Array<string> = [];
    data.push(bun._id);
    for (const ingredient of ingredients) {
        data.push(ingredient._id);
    }
    data.push(bun._id);
    postOrderRequest(data).then(res => {
        if (res && res.success) {
            // console.log(JSON.stringify(res));
            dispatch(orderRequestSuccess(res.order.number));
            dispatch(clearConstructor());
        } else {
            dispatch(orderRequestError());
        }
    }).catch(e => {
        console.log(`Exception occurred while sending order ${e}`);
        dispatch(orderRequestError());
    });
};

export const fetchOrder = (orderNumber: OrderNumber) => (dispatch: AppDispatch) => {
    dispatch(orderFetchRequest());
    getOrderRequest(orderNumber).then(res => {
        if (res && res.success && res.orders.length === 1) {
            dispatch(orderFetchSuccess(res.orders[0]));
        } else {
            dispatch(orderFetchError());
        }
    }).catch(e => {
        console.log(`Exception occurred while sending order ${e}`);
        dispatch(orderFetchError());
    });
};

type OrderState = {
    request: boolean;
    requestError: boolean;
    orderNumber: number;
    
    selectedOrder: Order | null;
    fetchRequest: boolean;
    fetchError: boolean;
};

const initialState: OrderState = {
    request: false,
    requestError: false,
    orderNumber: -1,
    
    selectedOrder: null,
    fetchRequest: false,
    fetchError: false,
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderRequest: (state: OrderState) => {
            state.request = true;
        },
        orderRequestSuccess: (state: OrderState, action : PayloadAction<OrderNumber>) => {
            state.request = false;
            state.requestError = false;
            state.orderNumber = action.payload;
        },
        orderRequestError: (state: OrderState) => {
            state.request = false;
            state.requestError = true;
        },
        orderSelect: (state: OrderState, action: PayloadAction<Order>) => {
            state.selectedOrder = action.payload;
        },
        orderFetchRequest: (state: OrderState) => {
            state.selectedOrder = null;
            state.fetchRequest = true;
            state.fetchError = false;
        },
        orderFetchError: (state: OrderState) => {
            state.fetchRequest = false;
            state.fetchError = true;
        },
        orderFetchSuccess: (state: OrderState, action: PayloadAction<Order>) => {
            state.fetchRequest = false;
            state.fetchError = false;
            state.selectedOrder = action.payload;
        },
    }
});

export const {
    orderRequest,
    orderRequestSuccess,
    orderRequestError,
    orderFetchRequest,
    orderFetchError,
    orderSelect,
    orderFetchSuccess,
} = slice.actions;

export default slice;
