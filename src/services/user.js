import { createSlice } from "@reduxjs/toolkit";
import { postAuthRegister, postAuthLogin, getAuthUser, patchAuthUser } from "./api";

export function fetchUser() {
    return async function (dispatch) {
        if (!localStorage.getItem("accessToken")) {
            // если у меня нет токенов
            localStorage.setItem("accessToken", null);
            localStorage.setItem("refreshToken", null);
            dispatch(setUser(null));
            return;
        }

        const getResponse = await getAuthUser().catch(e => {
            console.log(`Error getting user: ${e}`);
        });
        if (getResponse && getResponse.success) {
            // успешное получение данных пользователя через accessToken
            dispatch(setUser(getResponse.user));
            return;
        }

        const patchResponse = await patchAuthUser().catch(e => {
            console.log(`Error refreshing user token ${e}`);
        });

        if (patchResponse && patchResponse.success) {
            // успешное обновление токена пользователя через refreshToken
            localStorage.setItem("accessToken", patchResponse.accessToken);
            localStorage.setItem("refreshToken", patchResponse.refreshToken);
            dispatch(setUser(getResponse.user));
            return;
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
        return;
    };
}

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
    userChecked: false,
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
            console.log(`user set to ${JSON.stringify(state.user)}`);
            state.userChecked = true;
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
