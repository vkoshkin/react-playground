import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: {
        buns: [],
        sauces: [],
        mains: [],
    },
    ingredientRequest: false,
    ingredientRequestError: false,
    constructorElements: {
        top: null,
        main: [],
        bottom: null,
    },
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        getIngredients(state, action) {
            state.ingredientRequest = true;
        },
        getIngredientsError(state, action) {
            state.ingredientRequest = false;
            state.ingredientRequestError = true;
        },
        getIngredientsSuccess(state, action) {
            state.ingredientRequest = false;
            const data = action.payload;
            state.ingredients.buns = data.filter((row) => row.type === "bun");
            state.ingredients.sauces = data.filter((row) => row.type === "sauce");
            state.ingredients.mains = data.filter((row) => row.type === "main");
        },
        addIngredient(state, action) {
            const ingredient = action.payload;
            if (ingredient.type === "bun") {
                state.constructorElements.top = ingredient;
                state.constructorElements.bottom = ingredient;
            } else {
                state.constructorElements.main.push(ingredient);
            }
        },
        removeIngredient(state, action) {
            const {ingredient, index} = action.payload;
            state.constructorElements.main.splice(index, 1);
        },
    }
});

export const { 
    getIngredients, 
    getIngredientsError, 
    getIngredientsSuccess,
    addIngredient,
    removeIngredient,
} = appSlice.actions;

export default appSlice.reducer;
