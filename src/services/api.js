const BASE_URL = "https://norma.nomoreparties.space/api";

const INGREDIENTS_API = `${BASE_URL}/ingredients`;

export function getIngredientsRequest() {
    return fetch(INGREDIENTS_API)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
        .catch(e => {
            return { success: false };
        });
}

const ORDER_API = `${BASE_URL}/orders`;

export function postOrderRequest(data) {
    return fetch(ORDER_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({ ingredients: data }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        })
        .catch(e => {
            return { success: false };
        });
}
