import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredient: null,
};

const slice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        showIngredient(state, action) {
            state.ingredient = action.payload;
        },
    }
});

export const { 
    showIngredient, 
} = slice.actions;

export default slice;
