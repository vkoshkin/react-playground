const BASE_URL = "https://norma.nomoreparties.space/api";

export function request<T>(endpoint: string, options: RequestInit = { method: "GET" }): Promise<T> {
    return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse<T>)
}

function checkResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
}
