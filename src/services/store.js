import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "./ingredients";
import ingredientDetailsReducer from "./ingredientDetails";
import constructorReducer from "./constructor";
import orderReducer from "./order";
import userReducer from "./user";
import passwordReducer from "./password";

const store = configureStore({
    reducer: {
        [ingredientReducer.reducerPath]: ingredientReducer.reducer,
        [ingredientDetailsReducer.reducerPath]: ingredientDetailsReducer.reducer,
        [constructorReducer.reducerPath]: constructorReducer.reducer,
        [orderReducer.reducerPath]: orderReducer.reducer,
        [userReducer.reducerPath]: userReducer.reducer,
        [passwordReducer.reducerPath]: passwordReducer.reducer,
    }
});

export default store;
