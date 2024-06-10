import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredients";
import ingredientDetailsReducer from "./ingredientDetails";
import constructorReducer from "./constructor";
import orderReducer from "./order";

const store = configureStore({
    reducer: {
        burgerIngredients: ingredientReducer,
        ingredientDetails: ingredientDetailsReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer,
    }
});

export default store;
