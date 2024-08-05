import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { postOrderRequest } from "./api";
import { clearConstructor } from "./constructor";
import { Ingredient, Order, OrderNumber } from "./types";
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
            console.log(JSON.stringify(res));
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

type OrderState = {
    request: boolean;
    requestError: boolean;
    orderNumber: number;
};

const initialState: OrderState = {
    request: false,
    requestError: false,
    orderNumber: -1,
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderRequest: (state: OrderState) => {
            state.request = true;
        },
        orderRequestSuccess(state: OrderState, action : PayloadAction<OrderNumber>) {
            state.request = false;
            state.requestError = false;
            state.orderNumber = action.payload;
        },
        orderRequestError: (state: OrderState) => {
            state.request = false;
            state.requestError = true;
        },
    }
});

export const {
    orderRequest,
    orderRequestSuccess,
    orderRequestError,
} = slice.actions;

export default slice;
