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
        addIngredient: {
            reducer: (state, action) => {
                const { targetId, ingredientData } = action.payload;
                if (ingredientData.data.type === "bun") {
                    state.bun = ingredientData.data;
                } else {
                    if (!targetId) {
                        state.ingredients.push(ingredientData);
                    } else {
                        const ingredientIds = state.ingredients.map(i => i.id);
                        const index = ingredientIds.indexOf(targetId);
                        state.ingredients.splice(index, 0, ingredientData);
                    }
                }
            },
            prepare: (ingredientTarget) => {
                return {
                    payload: {
                        targetId: ingredientTarget.targetId,
                        ingredientData: {
                            id: uuid(),
                            data: ingredientTarget.ingredient,
                        }
                    }
                };
            },
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
        clearConstructor(state, action) {
            state.bun = null;
            state.ingredients = [];
        },
    }
});

export const {
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor,
} = slice.actions;

export default slice;
