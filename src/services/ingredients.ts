import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getIngredientsRequest } from "./api";
import { Ingredient } from "./types";
import { AppDispatch } from "./store";

export const fetchIngredients = () => (dispatch: AppDispatch) => {
    dispatch(getIngredients());
    getIngredientsRequest().then(res => {
        if (res && res.success) {
            dispatch(getIngredientsSuccess(res.data));
        } else {
            dispatch(getIngredientsError());
        }
    }).catch(e => {
        console.log(`Exception occurred while fetching ingredients ${e}`);
        dispatch(getIngredientsError());
    });
}

type IngredientsState = {
    buns: Array<Ingredient>,
    sauces: Array<Ingredient>,
    mains: Array<Ingredient>,
    request: boolean,
    requestError: boolean,
};

const initialState: IngredientsState = {
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
        getIngredients: (state: IngredientsState) => {
            state.request = true;
        },
        getIngredientsError: (state: IngredientsState) => {
            state.request = false;
            state.requestError = true;
        },
        getIngredientsSuccess: (state: IngredientsState, action: PayloadAction<Array<Ingredient>>) => {
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

export default slice;
