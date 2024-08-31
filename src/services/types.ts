
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

export type OrderId = string;

export type OrderNumber = number;

export interface Order {
    readonly ingredients: Array<string>;
    readonly _id: OrderId;
    readonly status: string;
    readonly number: OrderNumber;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};
