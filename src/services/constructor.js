import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bun: null,
    ingredients: [],
};

const slice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient(state, action) {
            const ingredient = action.payload;
            if (ingredient.type === "bun") {
                state.bun = ingredient;
            } else {
                state.ingredients.push(ingredient);
            }
        },
        removeIngredient(state, action) {
            const {ingredient, index} = action.payload;
            state.ingredients.splice(index, 1);
        },
    }
});

export const { 
    addIngredient,
    removeIngredient,
} = slice.actions;

export default slice.reducer;
