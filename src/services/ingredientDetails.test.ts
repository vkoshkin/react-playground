import {
    showIngredient,
    initialState,
} from "./ingredientDetails";
import reducer from "./ingredientDetails";
import { Ingredient } from "./types";

describe("ingredientDetails", () => {
    const testIngredient: Ingredient = {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    };

    it("should set ingredient", () => {
        expect(reducer.reducer({ ...initialState }, showIngredient(testIngredient)))
            .toEqual({ ...initialState, ingredient: testIngredient });
    });

    const replaceIngredient: Ingredient = {
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    };

    it("should replace ingredient", () => {
        expect(reducer.reducer({ ...initialState, ingredient: testIngredient }, showIngredient(replaceIngredient)))
            .toEqual({ ...initialState, ingredient: replaceIngredient });
    });
});
