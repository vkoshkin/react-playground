import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-item.module.css";
import { Ingredient } from "../../services/types";
import { IngredientDragType, IngredientDrag } from "../burger-constructor/burger-constructor-drag";

export interface BurgerIngredientsItemProps {
    readonly ingredient: Ingredient;
    readonly count: number | undefined;
}

export const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ ingredient, count }) => {
    const location = useLocation();
    const [_, dragRef] = useDrag<IngredientDrag>({
        type: IngredientDragType,
        item: { id: undefined, item: ingredient },
    });
    return (
        <li className={styles.item} ref={dragRef} data-testid="ingredient-item">
            <div>
                <Link
                    to={`/ingredients/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                    data-testid="ingredient-item-link"
                >
                    <img
                        className={styles.item_image}
                        src={ingredient.image}
                        alt={ingredient.name}
                    />
                </Link>
                <div className={styles.item_price}>
                    <p className={styles.item_price_value}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.item_description}>
                    <p className={styles.item_description_text}>{ingredient.name}</p>
                </div>
            </div>
            {count && <Counter count={count} size="default" />}
        </li>
    );
}

export default BurgerIngredientsItem;
