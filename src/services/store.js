import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredients";
import constructorReducer from "./constructor";
import orderReducer from "./order";

const store = configureStore({
    reducer: {
        burgerIngredients: ingredientReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer,
    }
});

export default store;
