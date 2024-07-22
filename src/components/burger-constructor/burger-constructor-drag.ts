import { Ingredient, IngredientId } from "../../services/types";

export const IngredientDragType = "IngredientDrag";

export type IngredientDrag = {
    id: IngredientId | undefined;
    item: Ingredient | null;
};
