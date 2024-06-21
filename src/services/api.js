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
