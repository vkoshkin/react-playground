import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import { showIngredient } from "../../services/ingredientDetails";
import styles from "./burger-ingredients-item.module.css";
import ingredientType from "../../utils/types";

function BurgerIngredientsItem(props) {
    const { ingredient, count } = props;

    const location = useLocation();
    const dispatch = useDispatch();
    const onIngredientClick = event => {
        dispatch(showIngredient(ingredient))
    };

    const [{}, dragRef] = useDrag({
        type: "ingredient",
        item: { id: undefined, item: ingredient },
    });
    return (
        <div className={styles.item} ref={dragRef}>
            <div>
                <Link
                    to={`/ingredients/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                    onClick={onIngredientClick}
                >
                    <img className={styles.item_image}
                        src={ingredient.image}
                        alt={ingredient.name}/>
                </Link>
                <div className={styles.item_price}>
                    <p className={styles.item_price_value}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.item_description}>
                    <p className={styles.item_description_text}>{ingredient.name}</p>
                </div>
            </div>
            {count > 0 && <Counter count={count} size="default" />}
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientType,
    count: PropTypes.number,
};

export default BurgerIngredientsItem;
