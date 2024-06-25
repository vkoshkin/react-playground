import { createSlice } from "@reduxjs/toolkit";
import { 
    postPasswordReset, 
    postPasswordUpdate,
} from "./api";

export function resetPassword(email) {
    return function (dispatch) {
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
    };
}

export function updatePassword(password, code) {
    return function (dispatch) {
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
    };
}

const initialState = {
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
        passwordResetRequest(state, action) {
            state.passwordResetRequest = true;
            state.passwordResetError = false;
            state.passwordResetSuccess = false;
        },
        passwordResetError(state, action) {
            state.passwordResetRequest = false;
            state.passwordResetError = true;
            state.passwordResetSuccess = false;
        },
        passwordResetSuccess(state, action) {
            state.passwordResetRequest = false;
            state.passwordResetError = false;
            state.passwordResetSuccess = true;
        },
        passwordUpdateRequest(state, action) {
            state.passwordUpdateRequest = true;
            state.passwordUpdateError = false;
            state.passwordUpdateSuccess = false;
        },
        passwordUpdateError(state, action) {
            state.passwordUpdateRequest = false;
            state.passwordUpdateError = true;
            state.passwordUpdateSuccess = false;
        },
        passwordUpdateSuccess(state, action) {
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
