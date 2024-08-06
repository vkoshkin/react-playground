import { request } from "../utils/requests";
import { Ingredient, Order, OrderNumber, User } from "./types";

export interface CommonResult {
    readonly success: boolean;
    readonly message?: string;
}

export interface GetIngredientsResult extends CommonResult {
    readonly data: Array<Ingredient>;
}

export function getIngredientsRequest(): Promise<GetIngredientsResult> {
    return request<GetIngredientsResult>("ingredients");
}

export interface ResponseOrder {
    readonly ingredients: Array<Ingredient>;
    readonly number: OrderNumber;
}

export interface OrderResult extends CommonResult {
    readonly name: string;
    readonly order: ResponseOrder;
}

export function postOrderRequest(data: Array<string>): Promise<OrderResult> {
    return request("orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("accessToken")!,
        },
        redirect: "follow",
        body: JSON.stringify({ ingredients: data }),
    });
}

export interface GetOrderResult extends CommonResult {
    orders: Array<Order>;
}

export function getOrderRequest(orderNumber: OrderNumber): Promise<GetOrderResult> {
    return request(`orders/${orderNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    });
}

export interface TokenContainer {
    readonly accessToken: string;
    readonly refreshToken: string;
}

export interface RegisterUserResult extends CommonResult, TokenContainer {
    readonly user: User;
}

export function postAuthRegister(name: string, email: string, password: string): Promise<RegisterUserResult> {
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

export interface LoginResult extends CommonResult, TokenContainer {
    readonly user: User;
}

export function postAuthLogin(email: string, password: string): Promise<LoginResult> {
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

export function postAuthLogout(): Promise<CommonResult> {
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

export interface UpdateTokenResult extends CommonResult, TokenContainer {
}

export function postAuthToken(): Promise<UpdateTokenResult> {
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

export interface GetAuthResult extends CommonResult {
    readonly user: User;
}

export function getAuthUser(): Promise<GetAuthResult> {
    return request("auth/user", {
        method: "GET",
        headers: {
            "Authorization": localStorage.getItem("accessToken")!,
        },
    });
}

export interface PatchUserResult extends CommonResult {
    readonly user: User;
}

export function patchAuthUser(name: string, email: string): Promise<PatchUserResult> {
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

export function postPasswordReset(email: string): Promise<CommonResult> {
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

export function postPasswordUpdate(password: string, code: string): Promise<CommonResult> {
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

export interface CommonFeedResult extends CommonResult {
    orders: Array<Order>;
    total: number;
    totalToday: number;
}
