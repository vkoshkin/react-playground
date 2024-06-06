const INGREDIENTS_API = "https://norma.nomoreparties.space/api/ingredients";

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
