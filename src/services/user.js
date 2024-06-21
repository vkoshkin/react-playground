import { createSlice } from "@reduxjs/toolkit";
import { postAuthRegister } from "./api";

export function registerUser(name, email, password) {
    return function(dispatch) {
        postAuthRegister(name, email, password).then(response => {
            if (response && response.success) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
                dispatch(registerRequestSuccess(response.user));
            } else {
                dispatch(registerRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while registering user ${e}`);
            dispatch(registerRequestError());
        });
    };
}

const initialState = {
    user: null,
    registerRequest: false,
    registerError: false,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerRequest(state, action) {
            state.registerRequest = true;
            state.registerError = false;
        },
        registerRequestSuccess(state, action) {
            state.user = action.payload;
            state.registerRequest = false;
            state.registerError = false;
        },
        registerRequestError(state, action) {
            state.registerRequest = false;
            state.registerError = true;
        },
    }
});

export const {
    registerRequest,
    registerRequestSuccess,
    registerRequestError,
} = slice.actions;

export default slice;
