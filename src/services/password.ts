import { createSlice } from "@reduxjs/toolkit";
import { postPasswordReset, postPasswordUpdate } from "./api";

export const resetPassword = (email: string) => (dispatch: any) => {
    dispatch(passwordResetRequest());
    postPasswordReset(email).then(response => {
        if (response && response.success) {
            dispatch(passwordResetSuccess());
        } else {
            dispatch(passwordResetError());
        }
    }).catch(e => {
        console.log(`Exception occurred while password reset ${e}`);
        dispatch(passwordResetError());
    });
}

export const updatePassword = (password: string, code: string) => (dispatch: any) => {
    dispatch(passwordUpdateRequest());
    postPasswordUpdate(password, code).then(response => {
        if (response && response.success) {
            dispatch(passwordUpdateSuccess());
        } else {
            dispatch(passwordUpdateError());
        }
    }).catch(e => {
        console.log(`Exception occurred while password reset ${e}`);
        dispatch(passwordUpdateError());
    });
}

type PasswordState = {
    passwordResetRequest: boolean;
    passwordResetError: boolean;
    passwordResetSuccess: boolean;
    passwordUpdateRequest: boolean;
    passwordUpdateError: boolean;
    passwordUpdateSuccess: boolean;
};

const initialState: PasswordState = {
    passwordResetRequest: false,
    passwordResetError: false,
    passwordResetSuccess: false,
    passwordUpdateRequest: false,
    passwordUpdateError: false,
    passwordUpdateSuccess: false,
};

const slice = createSlice({
    name: "password",
    initialState,
    reducers: {
        passwordResetRequest: (state: PasswordState) => {
            state.passwordResetRequest = true;
            state.passwordResetError = false;
            state.passwordResetSuccess = false;
            state.passwordUpdateRequest = false;
            state.passwordUpdateError = false;
            state.passwordUpdateSuccess = false;
        },
        passwordResetError: (state: PasswordState) => {
            state.passwordResetRequest = false;
            state.passwordResetError = true;
            state.passwordResetSuccess = false;
        },
        passwordResetSuccess: (state: PasswordState) => {
            state.passwordResetRequest = false;
            state.passwordResetError = false;
            state.passwordResetSuccess = true;
        },
        passwordUpdateRequest: (state: PasswordState) => {
            state.passwordResetRequest = false;
            state.passwordResetError = false;
            state.passwordResetSuccess = false;
            state.passwordUpdateRequest = true;
            state.passwordUpdateError = false;
            state.passwordUpdateSuccess = false;
        },
        passwordUpdateError: (state: PasswordState) => {
            state.passwordUpdateRequest = false;
            state.passwordUpdateError = true;
            state.passwordUpdateSuccess = false;
        },
        passwordUpdateSuccess: (state: PasswordState) => {
            state.passwordUpdateRequest = false;
            state.passwordUpdateError = false;
            state.passwordUpdateSuccess = true;
        },
    }
});

export const {
    passwordResetRequest,
    passwordResetError,
    passwordResetSuccess,
    passwordUpdateRequest,
    passwordUpdateError,
    passwordUpdateSuccess,
} = slice.actions;

export default slice;
