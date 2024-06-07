import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredients";
import constructorReducer from "./constructor";

const store = configureStore({
    reducer: {
        burgerIngredients: ingredientReducer,
        burgerConstructor: constructorReducer,
    }
});

export default store;
