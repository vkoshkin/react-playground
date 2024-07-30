import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import ingredientReducer from "./ingredients";
import ingredientDetailsReducer from "./ingredientDetails";
import constructorReducer from "./constructor";
import orderReducer from "./order";
import userReducer from "./user";
import passwordReducer from "./password";
import commonFeedReducer from "./common-feed";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { wsClose, wsConnect, wsConnecting, wsDisconnect, wsError, wsMessage, wsOpen } from "./common-feed";

const rootReducer = combineReducers({
    [ingredientReducer.reducerPath]: ingredientReducer.reducer,
    [ingredientDetailsReducer.reducerPath]: ingredientDetailsReducer.reducer,
    [constructorReducer.reducerPath]: constructorReducer.reducer,
    [orderReducer.reducerPath]: orderReducer.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [passwordReducer.reducerPath]: passwordReducer.reducer,
    [commonFeedReducer.reducerPath]: commonFeedReducer.reducer,
});

const commonFeedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    // sendMessage: 
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onMessage: wsMessage,
    onError: wsError,
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
