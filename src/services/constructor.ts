import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { Ingredient, IngredientId, IngredientItem } from "./types";

type ConstructorState = {
    bun: Ingredient | null,
    ingredients: Array<IngredientItem>,
};
const initialState: ConstructorState = {
    bun: null,
    ingredients: [],
};

type ConstructorAddAction = {
    targetId?: IngredientId,
    ingredient: Ingredient,
    ingredientData?: IngredientItem,
};
type ConstructorRemoveAction = {
    id: IngredientId,
};
type ConstructorMoveAction = {
    sourceId: IngredientId,
    targetId: IngredientId,
};

const slice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state: ConstructorState, action: PayloadAction<ConstructorAddAction>) => {
                const addAction = action.payload;
                const targetId: IngredientId | undefined = addAction.targetId;
                const ingredientData: IngredientItem = addAction.ingredientData!;
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
            prepare: (ingredientTarget: ConstructorAddAction) => {
                return {
                    payload: {
                        targetId: ingredientTarget.targetId,
                        ingredient: ingredientTarget.ingredient,
                        ingredientData: {
                            id: uuid(),
                            data: ingredientTarget.ingredient,
                        }
                    }
                };
            },
        },
        removeIngredient: (state: ConstructorState, action: PayloadAction<ConstructorRemoveAction>) => {
            const { id } = action.payload;
            const ingredientIds = state.ingredients.map(i => i.id);
            const index = ingredientIds.indexOf(id);
            state.ingredients.splice(index, 1);
        },
        moveIngredient: (state: ConstructorState, action: PayloadAction<ConstructorMoveAction>) => {
            const moveAction = action.payload;
            const ingredientIds = state.ingredients.map(i => i.id);
            const sourceIndex = ingredientIds.indexOf(moveAction.sourceId);
            const targetIndex = ingredientIds.indexOf(moveAction.targetId);
            state.ingredients.splice(sourceIndex, 0, state.ingredients.splice(targetIndex, 1)[0]);
        },
        clearConstructor: (state: ConstructorState) => {
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
