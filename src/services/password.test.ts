import {
    passwordResetRequest,
    passwordResetError,
    passwordResetSuccess,
    passwordUpdateRequest,
    passwordUpdateError,
    passwordUpdateSuccess,
    PasswordState,
    initialState,
    resetPassword
} from "./password";
import reducer from "./password";

describe("password", () => {
    it("should set reset request", () => {
        expect(reducer.reducer({ ...initialState }, passwordResetRequest()))
            .toEqual({
                ...initialState,
                passwordResetRequest: true,
                passwordResetError: false,
                passwordResetSuccess: false,
            })
    });
    it("should set reset request error", () => {
        expect(reducer.reducer({ ...initialState }, passwordResetError()))
            .toEqual({
                ...initialState,
                passwordResetRequest: false,
                passwordResetError: true,
                passwordResetSuccess: false,
            })
    });
    it("should set reset request success", () => {
        expect(reducer.reducer({ ...initialState }, passwordResetSuccess()))
            .toEqual({
                ...initialState,
                passwordResetRequest: false,
                passwordResetError: false,
                passwordResetSuccess: true,
            })
    });

    it("should set update request", () => {
        expect(reducer.reducer({ ...initialState }, passwordUpdateRequest()))
            .toEqual({
                ...initialState,
                passwordUpdateRequest: true,
                passwordUpdateError: false,
                passwordUpdateSuccess: false,
            })
    });
    it("should set update request error", () => {
        expect(reducer.reducer({ ...initialState }, passwordUpdateError()))
            .toEqual({
                ...initialState,
                passwordUpdateRequest: false,
                passwordUpdateError: true,
                passwordUpdateSuccess: false,
            })
    });
    it("should set update request success", () => {
        expect(reducer.reducer({ ...initialState }, passwordUpdateSuccess()))
            .toEqual({
                ...initialState,
                passwordUpdateRequest: false,
                passwordUpdateError: false,
                passwordUpdateSuccess: true,
            })
    });
});
