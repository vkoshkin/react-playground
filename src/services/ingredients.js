import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "./api";

export function fetchIngredients() {
    return function (dispatch) {
        dispatch(getIngredients());
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch(getIngredientsSuccess(res.data));
            } else {
                dispatch(getIngredientsError());
            }
        });
    };
}

const initialState = {
    buns: [],
    sauces: [],
    mains: [],
    request: false,
    requestError: false,
};

const slice = createSlice({
    name: "burgerIngredients",
    initialState,
    reducers: {
        getIngredients(state, action) {
            state.request = true;
        },
        getIngredientsError(state, action) {
            state.request = false;
            state.requestError = true;
        },
        getIngredientsSuccess(state, action) {
            state.request = false;
            const data = action.payload;
            state.buns = data.filter((row) => row.type === "bun");
            state.sauces = data.filter((row) => row.type === "sauce");
            state.mains = data.filter((row) => row.type === "main");
        },
    }
});

export const { 
    getIngredients, 
    getIngredientsError, 
    getIngredientsSuccess,
} = slice.actions;

export default slice.reducer;
