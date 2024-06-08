import { createSlice } from "@reduxjs/toolkit";
import { postOrderRequest } from "./api";

export function postOrder(bun, ingredients) {
    return function (dispatch) {
        dispatch(orderRequest());
        let data = [];
        data.push(bun._id);
        for (const ingredient of ingredients) {
            data.push(ingredient._id);
        }
        data.push(bun._id);
        postOrderRequest(data).then(res => {
            if (res && res.success) {
                dispatch(orderRequestSuccess(res));
            } else {
                dispatch(orderRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while sending order ${e}`);
            dispatch(orderRequestError());
        });
    };
}

const initialState = {
    request: false,
    requestError: false,
    orderId: -1,
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderRequest(state, action) {
            state.request = true;
        },
        orderRequestSuccess(state, action) {
            state.request = false;
            state.requestError = false;
            const payload = action.payload;
            state.orderId = payload.order.number;
        },
        orderRequestError(state, action) {
            state.request = false;
            state.requestError = true;
        }
    }
});

export const { 
    orderRequest, 
    orderRequestSuccess, 
    orderRequestError,
} = slice.actions;

export default slice.reducer;
