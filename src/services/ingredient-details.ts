import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "./types";

type IngredientDetailsState = {
    ingredient: Ingredient | null,
};

export const initialState: IngredientDetailsState = {
    ingredient: null,
};

const slice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        showIngredient(state: IngredientDetailsState, action: PayloadAction<Ingredient>) {
            state.ingredient = action.payload;
        },
    }
});

export const {
    showIngredient,
} = slice.actions;

export default slice;
