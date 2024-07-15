import { request } from "../utils/requests";
import { Ingredient } from "./types";

interface GetIngredientsResult {
    readonly success: boolean;
    readonly data: Array<Ingredient>;
}

export function getIngredientsRequest(): Promise<GetIngredientsResult> {
    return request<GetIngredientsResult>("ingredients");
}

export interface Order {
    readonly number: number;
}

export interface OrderResult {
    readonly success: boolean;
    readonly name: string;
    readonly order: Order;
}

export function postOrderRequest(data: Array<string>): Promise<OrderResult> {
    return request("orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data),
    });
}

export function postAuthRegister(name: string, email: string, password: string) {
    return request("auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });
}

export function postAuthLogin(email: string, password: string) {
    return request("auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

export function postAuthLogout() {
    return request("auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
}

export function postAuthToken() {
    return request("auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken"),
        }),
    });
}

export function getAuthUser() {
    return request("auth/user", {
        method: "GET",
        headers: {
            "Authorization": localStorage.getItem("accessToken")!,
        },
    });
}

export function patchAuthUser(name: string, email: string) {
    return request("auth/user", {
        method: "PATCH",
        headers: {
            "Authorization": localStorage.getItem("accessToken")!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    });
}

export function postPasswordReset(email: string) {
    return request("password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
        }),
    });
}

export function postPasswordUpdate(password: string, code: string) {
    return request("password-reset/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": password,
            "token": code,
        }),
    });
}
