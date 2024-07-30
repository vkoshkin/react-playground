import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OrderId, postOrderRequest } from "./api";
import { clearConstructor } from "./constructor";
import { Ingredient } from "./types";
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
            dispatch(orderRequestSuccess(res.order));
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
    orderId: number;
};

const initialState: OrderState = {
    request: false,
    requestError: false,
    orderId: -1,
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderRequest: (state: OrderState) => {
            state.request = true;
        },
        orderRequestSuccess(state: OrderState, action : PayloadAction<OrderId>) {
            state.request = false;
            state.requestError = false;
            const payload = action.payload;
            state.orderId = payload.number;
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
