import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { 
    postAuthRegister, 
    postAuthLogin, 
    getAuthUser, 
    postAuthToken,
    patchAuthUser, 
    postAuthLogout,
} from "./api";
import { User } from "./types";
import { AppDispatch } from "./store";

export const fetchUser = () => {
    return async function (dispatch: AppDispatch) {
        if (!localStorage.getItem("accessToken")) {
            // если у меня нет токенов
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
            return;
        }

        const getResponse = await getAuthUser().catch(e => {
            console.log(`Error getting user: ${e}`);
        });
        if (getResponse && getResponse.success) {
            console.log(`getAuthUser ${JSON.stringify(getResponse)}`);
            // успешное получение данных пользователя через accessToken
            dispatch(setUser(getResponse.user));
            return;
        }

        const postResponse = await postAuthToken().catch(e => {
            console.log(`Error refreshing user token ${e}`);
        });
        if (postResponse && postResponse.success) {
            console.log(`postAuthToken ${JSON.stringify(postResponse)}`);
            // успешное обновление токена пользователя через refreshToken
            localStorage.setItem("accessToken", postResponse.accessToken);
            localStorage.setItem("refreshToken", postResponse.refreshToken);
            return;
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
        return;
    };
}

export const registerUser = (name: string, email: string, password: string) => {
    return function (dispatch: AppDispatch) {
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

export const loginUser = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(loginRequest());
        postAuthLogin(email, password).then(response => {
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

export const logoutUser = () => {
    return function (dispatch: AppDispatch) {
        dispatch(logoutRequest());
        postAuthLogout().then(response => {
            if (response && response.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            } else {
                dispatch(logoutRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user logout ${e}`);
            dispatch(logoutRequestError());
        });
    };
}

export const saveUser = (name: string, email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(saveRequest());
        patchAuthUser(name, email).then(response => {
            if (response && response.success) {
                dispatch(setUser(response.user));
            } else {
                dispatch(saveRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user save ${e}`);
            dispatch(logoutRequestError());
        });
    };
}

type UserState = {
    user: User | null;
    userChecked: boolean;
    registerRequest: boolean;
    registerError: boolean;
    loginRequest: boolean;
    loginError: boolean;
    logoutRequest: boolean;
    logoutError: boolean;
    saveRequest: boolean;
    saveRequestError: boolean;
};

const initialState: UserState = {
    user: null,
    userChecked: false,
    registerRequest: false,
    registerError: false,
    loginRequest: false,
    loginError: false,
    logoutRequest: false,
    logoutError: false,
    saveRequest: false,
    saveRequestError: false,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            console.log(`user set to ${JSON.stringify(state.user)}`);
            state.userChecked = true;
            state.registerRequest = false;
            state.registerError = false;
            state.loginRequest = false;
            state.loginError = false;
            state.logoutRequest = false;
            state.logoutError = false;
            state.saveRequest = false;
            state.saveRequestError = false;
        },
        registerRequest: (state: UserState) => {
            state.registerRequest = true;
            state.registerError = false;
        },
        registerRequestError: (state: UserState) => {
            state.registerRequest = false;
            state.registerError = true;
        },
        loginRequest: (state: UserState) => {
            state.loginRequest = true;
            state.loginError = false;
        },
        loginRequestError: (state: UserState) => {
            state.loginRequest = false;
            state.loginError = true;
        },
        logoutRequest: (state: UserState) => {
            state.logoutRequest = true;
            state.logoutError = false;
        },
        logoutRequestError: (state: UserState) => {
            state.logoutRequest = false;
            state.logoutError = true;
        },
        saveRequest: (state: UserState) => {
            state.saveRequest = true;
            state.saveRequestError = false;
        },
        saveRequestError: (state: UserState) => {
            state.saveRequest = false;
            state.saveRequestError = true;
        }
    }
});

export const {
    setUser,
    registerRequest,
    registerRequestError,
    loginRequest,
    loginRequestError,
    logoutRequest,
    logoutRequestError,
    saveRequest,
    saveRequestError,
} = slice.actions;

export default slice;
