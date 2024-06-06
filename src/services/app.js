import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    dataRequest: false,
    dataRequestError: false,
    ingredients: {
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
            state.dataRequest = true;
        },
        getIngredientsError(state, action) {
            state.dataRequest = false;
            state.dataRequestError = true;
        },
        getIngredientsSuccess(state, action) {
            state.dataRequest = false;
            const data = action.payload;
            state.data = data;
        },
        addIngredient(state, action) {
            const ingredient = action.payload;
            if (ingredient.type === "bun") {
                state.ingredients.top = ingredient;
                state.ingredients.bottom = ingredient;
            } else {
                state.ingredients.main.push(ingredient);
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
