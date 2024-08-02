import { FC } from "react";

import { Ingredient } from "../../services/types";
import IngredientImage from "../ingredient-image/ingredient-image";
import Price from "../price/price";
import styles from "./order-description-item.module.css";

interface OrderDescriptionItemProps {
    readonly ingredient: Ingredient;
};

const OrderDescriptionItem: FC<OrderDescriptionItemProps> = ({ ingredient }) => {
    return (
        <div className={styles.item}>
            <IngredientImage
                image={ingredient.image}
                altName={ingredient.name}
            />
            <div className={styles.item_text}>
                <p className={styles.text}>
                    {ingredient.name}
                </p>
            </div>
            <Price price={ingredient.price}/>
        </div>
    );
};

export default OrderDescriptionItem;
