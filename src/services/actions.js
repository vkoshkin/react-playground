import { getIngredients, getIngredientsError, getIngredientsSuccess } from "./app";
import { getIngredientsRequest } from "./api";

export function fetchIngredients() {
    return function (dispatch) {
        dispatch(getIngredients());
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch(getIngredientsSuccess(res.data));
            } else {
                dispatch(getIngredientsError());
            }
        });
    };
}
