import { FC } from "react";

import { Ingredient } from "../../services/types";
import IngredientPreview from "../ingredient-preview/ingredient-preview";
import Price from "../price/price";
import styles from "./order-description-item.module.css";

interface OrderDescriptionItemProps {
    readonly ingredient: Ingredient;
    readonly count: number;
};

const OrderDescriptionItem: FC<OrderDescriptionItemProps> = ({ ingredient, count }) => {
    return (
        <div className={styles.item}>
            <IngredientPreview
                image={ingredient.image}
                altName={ingredient.name}
            />
            <div className={styles.item_text}>
                <p className={styles.text}>
                    {ingredient.name}
                </p>
            </div>
            <Price price={ingredient.price} count={count} />
        </div>
    );
};

export default OrderDescriptionItem;
