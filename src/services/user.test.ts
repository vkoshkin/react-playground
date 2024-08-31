import { User } from "./types";
import userReducer from "./user";
import {
    initialState,
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
} from "./user";

describe("user", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockResolvedValue(
            Promise.resolve({
                status: 200,
                ok: true,
                json: Promise.resolve({
                    result: "ok"
                }),
            } as any)
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const testUser: User = { name: "test", email: "test@test.com" };

    it("should init user when got credentials", () => {
        expect(userReducer.reducer({ ...initialState }, initUser(testUser)))
            .toEqual({ 
                ...initialState, 
                user: testUser, 
                userChecked: true, 
                registerRequest: false, 
                registerError: false, 
                loginRequest: false, 
                logoutRequest: false,
                logoutError: false,
                updateRequest: false,
                updateError: false,
            });
    });

    it("should clear user when logout", () => {
        expect(userReducer.reducer({ ...initialState, user: testUser }, clearUser()))
            .toEqual({ ...initialState, user: null });
    });

    it("should do nothing on clear user when user is anonymous", () => {
        expect(userReducer.reducer({ ...initialState }, clearUser()))
            .toEqual({ ...initialState });
    });

    it("should set user checked if user data loaded", () => {
        expect(userReducer.reducer({ ...initialState, user: testUser }, checkUser()))
            .toEqual({ ...initialState, user: testUser, userChecked: true });
    });

    it("should set user checked if user is anonymous", () => {
        expect(userReducer.reducer({ ...initialState, user: null }, checkUser()))
            .toEqual({ ...initialState, user: null, userChecked: true });
    });

    it("should set register request when register called", () => {
        expect(userReducer.reducer({ ...initialState }, registerRequest()))
            .toEqual({ ...initialState, registerRequest: true, registerError: false });
    });
    it("should set register request error when caught error while registering", () => {
        expect(userReducer.reducer({ ...initialState }, registerRequestError()))
            .toEqual({ ...initialState, registerRequest: false, registerError: true });
    });

    it("should set login request when user login called", () => {
        expect(userReducer.reducer({ ...initialState }, loginRequest()))
            .toEqual({ ...initialState, loginRequest: true, loginError: false });
    });
    it("should set login request error when caught error while login", () => {
        expect(userReducer.reducer({ ...initialState }, loginRequestError()))
            .toEqual({ ...initialState, loginRequest: false, loginError: true });
    });

    it("should set logout request when user logout called", () => {
        expect(userReducer.reducer({ ...initialState }, logoutRequest()))
            .toEqual({ ...initialState, logoutRequest: true, logoutError: false });
    });
    it("should set logout request error when caught error while logout", () => {
        expect(userReducer.reducer({ ...initialState }, logoutRequestError()))
            .toEqual({ ...initialState, logoutRequest: false, logoutError: true });
    });

    it("should set update profile request when update called", () => {
        expect(userReducer.reducer({ ...initialState }, updateProfileRequest()))
            .toEqual({ ...initialState, updateRequest: true, updateError: false });
    });
    it("should set update profile error when caught error while update", () => {
        expect(userReducer.reducer({ ...initialState }, updateProfileError()))
            .toEqual({ ...initialState, updateRequest: false, updateError: true });
    });
});
