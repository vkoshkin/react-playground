import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { 
    postAuthRegister, 
    postAuthLogin, 
    getAuthUser, 
    postRefreshAuthToken,
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
            dispatch(clearUser());
            dispatch(checkUser());
            return;
        }

        const getResponse = await getAuthUser().catch(e => {
            console.log(`Error getting user: ${e}`);
        });
        if (getResponse && getResponse.success) {
            console.log(`getAuthUser ${JSON.stringify(getResponse)}`);
            // успешное получение данных пользователя через accessToken
            dispatch(initUser(getResponse.user));
            return;
        }

        const refreshResponse = await postRefreshAuthToken().catch(e => {
            console.log(`Error refreshing user token ${e}`);
        });
        if (refreshResponse && refreshResponse.success) {
            console.log(`postAuthToken ${JSON.stringify(refreshResponse)}`);
            // успешное обновление токена пользователя через refreshToken
            localStorage.setItem("accessToken", refreshResponse.accessToken);
            localStorage.setItem("refreshToken", refreshResponse.refreshToken);
            dispatch(checkUser());
            return;
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
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
                dispatch(initUser(response.user));
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
                dispatch(initUser(response.user));
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
                dispatch(clearUser());
            } else {
                dispatch(logoutRequestError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user logout ${e}`);
            dispatch(logoutRequestError());
        });
    };
}

export const updateUserProfile = (name: string, email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(updateProfileRequest());
        patchAuthUser(name, email).then(response => {
            if (response && response.success) {
                dispatch(initUser(response.user));
            } else {
                dispatch(updateProfileError());
            }
        }).catch(e => {
            console.log(`Exception occurred while user save ${e}`);
            dispatch(updateProfileError());
        });
    };
}

export type UserState = {
    user: User | null;
    userChecked: boolean;
    registerRequest: boolean;
    registerError: boolean;
    loginRequest: boolean;
    loginError: boolean;
    logoutRequest: boolean;
    logoutError: boolean;
    updateRequest: boolean;
    updateError: boolean;
};

export const initialState: UserState = {
    user: null,
    userChecked: false,
    registerRequest: false,
    registerError: false,
    loginRequest: false,
    loginError: false,
    logoutRequest: false,
    logoutError: false,
    updateRequest: false,
    updateError: false,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state: UserState, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.userChecked = true;
            state.registerRequest = false;
            state.registerError = false;
            state.loginRequest = false;
            state.loginError = false;
            state.logoutRequest = false;
            state.logoutError = false;
            state.updateRequest = false;
            state.updateError = false;
        },
        clearUser: (state: UserState) => {
            state.user = null;
            state.registerRequest = false;
            state.registerError = false;
            state.loginRequest = false;
            state.loginError = false;
            state.logoutRequest = false;
            state.logoutError = false;
            state.updateRequest = false;
            state.updateError = false;
        },
        checkUser: (state: UserState) => {
            state.userChecked = true;
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
        updateProfileRequest: (state: UserState) => {
            state.updateRequest = true;
            state.updateError = false;
        },
        updateProfileError: (state: UserState) => {
            state.updateRequest = false;
            state.updateError = true;
        }
    }
});

export const {
    initUser,
    clearUser,
    checkUser,
    registerRequest,
    registerRequestError,
    loginRequest,
    loginRequestError,
    logoutRequest,
    logoutRequestError,
    updateProfileRequest,
    updateProfileError,
} = slice.actions;

export default slice;
