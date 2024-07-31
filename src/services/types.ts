
export type User = {
    readonly name: string;
    readonly email: string;
};

export type Ingredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly price: number;
    readonly calories: number;
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly image: string,
    readonly image_large: string,
};

export type IngredientId = string;

export type IngredientItem = {
    id: IngredientId,
    data: Ingredient,
};

const objectFromWss = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e7",
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e8",
                "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
};

export type Order = {
    readonly ingredients: Array<string>;
    readonly _id: string;
    readonly status: string;
    readonly number: number;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};
