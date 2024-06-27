import { request } from "../utils/requests";

export function getIngredientsRequest() {
    return request("ingredients");
}

export function postOrderRequest(data) {
    return request("orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({ ingredients: data }),
    });
}

export function postAuthRegister(name, email, password) {
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

export function postAuthLogin(email, password) {
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
            "Authorization": localStorage.getItem("accessToken"),
        },
    });
}

export function patchAuthUser(name, email) {
    return request("auth/user", {
        method: "PATCH",
        headers: {
            "Authorization": localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    });
}

export function postPasswordReset(email) {
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

export function postPasswordUpdate(password, code) {
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
