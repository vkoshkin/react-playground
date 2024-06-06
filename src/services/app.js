import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: {
        buns: [],
        sauces: [],
        mains: [],
    },
    ingredientCount: {},
    ingredientRequest: false,
    ingredientRequestError: false,
    constructorElements: {
        top: null,
        main: [],
        bottom: null,
    },
    burgerPrice: 0,
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

            if (!state.ingredientCount[ingredient._id]) {
                state.ingredientCount[ingredient._id] = 1;
            } else {
                state.ingredientCount[ingredient._id] += 1;
            }

            if (ingredient.type === "bun") {
                state.burgerPrice += ingredient.price * 2;
            } else {
                state.burgerPrice += ingredient.price;
            }
        },
    }
});

export const { 
    getIngredients, 
    getIngredientsError, 
    getIngredientsSuccess,
    addIngredient,
} = appSlice.actions;

export default appSlice.reducer;
