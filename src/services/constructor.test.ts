import {
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor,
    initialState,
    ConstructorState,
    ConstructorAddAction,
    ConstructorRemoveAction,
    ConstructorMoveAction,
} from "./constructor";
import reducer from "./constructor";
import { Ingredient, IngredientId, IngredientItem } from "./types";
import { v4 as uuid } from "uuid";

describe("constructor", () => {
    const bunIngredient: Ingredient = {
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
    it("should add bun to ingredient", () => {
        const actionData: ConstructorAddAction = { ingredient: bunIngredient };
        expect(reducer.reducer({ ...initialState }, addIngredient(actionData)))
            .toEqual({ ...initialState, bun: bunIngredient });
    });

    const anotherBunIngredient: Ingredient = {
        "_id": "60666c42cc7b410027a1a9b2",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    };
    it("should replace bun", () => {
        const actionData: ConstructorAddAction = { ingredient: anotherBunIngredient };
        expect(reducer.reducer({ ...initialState, bun: bunIngredient }, addIngredient(actionData)))
            .toEqual({ ...initialState, bun: anotherBunIngredient });
    });


    const ingredients: Array<Ingredient> = [
        {
            "_id": "60666c42cc7b410027a1a9ba",
            "name": "Соус с шипами Антарианского плоскоходца",
            "type": "sauce",
            "proteins": 101,
            "fat": 99,
            "carbohydrates": 100,
            "calories": 100,
            "price": 88,
            "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
        },
        {
            "_id": "60666c42cc7b410027a1a9bd",
            "name": "Кристаллы марсианских альфа-сахаридов",
            "type": "main",
            "proteins": 234,
            "fat": 432,
            "carbohydrates": 111,
            "calories": 189,
            "price": 762,
            "image": "https://code.s3.yandex.net/react/code/core.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
        },
        {
            "_id": "60666c42cc7b410027a1a9be",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
        }
    ];

    it("should add ingredient", () => {
        const actionData: ConstructorAddAction = { ingredient: ingredients[0] };
        const actual = reducer.reducer({ ...initialState, bun: bunIngredient }, addIngredient(actionData));
        expect(actual.bun).toEqual(bunIngredient);
        expect(actual.ingredients.length).toEqual(1);
        expect(actual.ingredients[0].data).toEqual(ingredients[0]);
    });

    it("should add ingredient before another", () => {
        const preAction: ConstructorAddAction = { ingredient: ingredients[0] };
        const added = reducer.reducer({ ...initialState, bun: bunIngredient }, addIngredient(preAction));
        const preId = added.ingredients[0].id;

        const actionData: ConstructorAddAction = { ingredient: ingredients[1], targetId: preId };
        const actual = reducer.reducer(added, addIngredient(actionData));

        expect(actual.ingredients.length).toEqual(2);
        expect(actual.bun).toEqual(bunIngredient);
        expect(actual.ingredients[0].data).toEqual(ingredients[1]);
        expect(actual.ingredients[1].data).toEqual(ingredients[0]);
    });

    it("should add ingredient after another", () => {
        const preAction: ConstructorAddAction = { ingredient: ingredients[0] };
        const added = reducer.reducer({ ...initialState, bun: bunIngredient }, addIngredient(preAction));

        const actionData: ConstructorAddAction = { ingredient: ingredients[2] };
        const actual = reducer.reducer(added, addIngredient(actionData));

        expect(actual.ingredients.length).toEqual(2);
        expect(actual.bun).toEqual(bunIngredient);
        expect(actual.ingredients[0].data).toEqual(ingredients[0]);
        expect(actual.ingredients[1].data).toEqual(ingredients[2]);
    });


    it("should not changed if constructor is empty", () => {
        expect(reducer.reducer({ ...initialState }, clearConstructor()))
            .toEqual({ ...initialState });
    });
    it("should clear all", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, clearConstructor()))
            .toEqual({ bun: null, ingredients: [] });
    });

    it("should remove first present ingredient", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, removeIngredient({ id: state.ingredients[0].id })))
            .toEqual({
                bun: bunIngredient,
                ingredients: [state.ingredients[1], state.ingredients[2]],
            });
    });
    it("should remove present ingredient", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, removeIngredient({ id: state.ingredients[1].id })))
            .toEqual({
                bun: bunIngredient,
                ingredients: [state.ingredients[0], state.ingredients[2]],
            });
    });
    it("should remove last present ingredient", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, removeIngredient({ id: state.ingredients[2].id })))
            .toEqual({
                bun: bunIngredient,
                ingredients: [state.ingredients[0], state.ingredients[1]],
            });
    });

    it("should move ingredient 1", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, moveIngredient({
            sourceId: state.ingredients[0].id,
            targetId: state.ingredients[2].id,
        }))).toEqual({
            bun: bunIngredient,
            ingredients: [state.ingredients[2], state.ingredients[0], state.ingredients[1]],
        });
    });
    it("should move ingredient 2", () => {
        const state: ConstructorState = {
            bun: bunIngredient,
            ingredients: [
                { id: uuid(), data: ingredients[0] },
                { id: uuid(), data: ingredients[1] },
                { id: uuid(), data: ingredients[2] },
            ]
        };
        expect(reducer.reducer(state, moveIngredient({
            sourceId: state.ingredients[1].id,
            targetId: state.ingredients[2].id,
        }))).toEqual({
            bun: bunIngredient,
            ingredients: [state.ingredients[0], state.ingredients[2], state.ingredients[1]],
        });
    });
});
