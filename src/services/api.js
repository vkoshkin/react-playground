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
