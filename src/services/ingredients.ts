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

export type IngredientsState = {
    buns: Array<Ingredient>;
    sauces: Array<Ingredient>;
    mains: Array<Ingredient>;
    ingredients: { [id: string]: Ingredient };
    request: boolean;
    requestError: boolean;
};

export const initialState: IngredientsState = {
    buns: [],
    sauces: [],
    mains: [],
    ingredients: {},
    request: false,
    requestError: false,
};

const slice = createSlice({
    name: "burgerIngredients",
    initialState,
    reducers: {
        getIngredients: (state: IngredientsState) => {
            state.request = true;
            state.requestError = false;
        },
        getIngredientsError: (state: IngredientsState) => {
            state.request = false;
            state.requestError = true;
        },
        getIngredientsSuccess: (state: IngredientsState, action: PayloadAction<Array<Ingredient>>) => {
            state.request = false;
            const data = action.payload;
            state.buns = [];
            state.sauces = [];
            state.mains = [];
            for (const row of data) {
                if (row.type === "bun") {
                    state.buns.push(row);
                } else if (row.type === "sauce") {
                    state.sauces.push(row);
                } else if (row.type === "main") {
                    state.mains.push(row);
                }
                state.ingredients[row._id] = row;
            }
        },
    }
});

export const { 
    getIngredients, 
    getIngredientsError, 
    getIngredientsSuccess,
} = slice.actions;

export default slice;
