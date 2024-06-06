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
        // todoAdded(state, action) {
        //     const { id, text } = action.payload
        //     state.todos.push({
        //         id,
        //         text,
        //         completed: false
        //     })
        // },
        // todoToggled(state, action) {
        //     // Look for the specific nested object to update.
        //     // In this case, `action.payload` is the default field in the action,
        //     // and can hold the `id` value - no need for `action.id` separately
        //     const matchingTodo = state.todos.find(todo => todo.id === action.payload)
        //
        //     if (matchingTodo) {
        //         // Can directly "mutate" the nested object
        //         matchingTodo.completed = !matchingTodo.completed
        //     }
        // }

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

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
// 
export const { 
    getIngredients, 
    getIngredientsError, 
    getIngredientsSuccess,
    addIngredient,
} = appSlice.actions;

// Export the slice reducer as the default export
export default appSlice.reducer;
