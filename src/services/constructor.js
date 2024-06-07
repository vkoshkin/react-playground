import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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
                state.ingredients.push({
                    id: uuid(),
                    data: ingredient
                });
            }
        },
        removeIngredient(state, action) {
            const { ingredient, id } = action.payload;
            const ingredientIds = state.ingredients.map(i => i.id);
            const index = ingredientIds.indexOf(id);
            state.ingredients.splice(index, 1);
        },
        moveIngredient(state, action) {
            const { sourceId, targetId } = action.payload;
            const ingredientIds = state.ingredients.map(i => i.id);
            const sourceIndex = ingredientIds.indexOf(sourceId);
            const targetIndex = ingredientIds.indexOf(targetId);
            state.ingredients.splice(sourceIndex, 0, state.ingredients.splice(targetIndex, 1)[0]);
        },
    }
});

export const {
    addIngredient,
    removeIngredient,
    moveIngredient,
} = slice.actions;

export default slice.reducer;
