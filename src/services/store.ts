import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import ingredientReducer from "./ingredients";
import ingredientDetailsReducer from "./ingredientDetails";
import constructorReducer from "./constructor";
import orderReducer from "./order";
import userReducer from "./user";
import passwordReducer from "./password";
import { socketMiddleware } from "../utils/websocket";

const rootReducer = combineReducers({
    [ingredientReducer.reducerPath]: ingredientReducer.reducer,
    [ingredientDetailsReducer.reducerPath]: ingredientDetailsReducer.reducer,
    [constructorReducer.reducerPath]: constructorReducer.reducer,
    [orderReducer.reducerPath]: orderReducer.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [passwordReducer.reducerPath]: passwordReducer.reducer,
});

const commonFeedMiddleware = socketMiddleware({
});

const profileFeedMiddleware = socketMiddleware({
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(commonFeedMiddleware, profileFeedMiddleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
