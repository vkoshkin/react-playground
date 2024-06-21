import { createSlice } from "@reduxjs/toolkit";
import { postAuthRegister, postAuthLogin } from "./api";

export function registerUser(name, email, password) {
    return function (dispatch) {
        dispatch(registerRequest());
        postAuthRegister(name, email, password).then(response => {
            if (response && response.success) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
                dispatch(setUser(response.user));
            } else {
                dispatch(registerRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user register ${e}`);
            dispatch(registerRequestError());
        });
    };
}

export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginRequest());
        postAuthLogin(email, password).then(response => {
            console.log(response);
            if (response && response.success) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
                dispatch(setUser(response.user));
            } else {
                dispatch(loginRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user login ${e}`);
            dispatch(loginRequestError());
        });
    };
}

const initialState = {
    user: null,
    registerRequest: false,
    registerError: false,
    loginRequest: false,
    loginError: false,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.registerRequest = false;
            state.registerError = false;
            state.loginRequest = false;
            state.loginError = false;
        },
        registerRequest(state, action) {
            state.registerRequest = true;
            state.registerError = false;
        },
        registerRequestError(state, action) {
            state.registerRequest = false;
            state.registerError = true;
        },
        loginRequest(state, action) {
            state.loginRequest = true;
            state.loginError = false;
        },
        loginRequestError(state, action) {
            state.loginRequest = false;
            state.loginError = true;
        },
    }
});

export const {
    setUser,
    registerRequest,
    registerRequestError,
    loginRequest,
    loginRequestError,
} = slice.actions;

export default slice;
