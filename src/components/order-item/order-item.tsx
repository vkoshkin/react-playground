import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import Price from "../price/price";
import { useTypedSelector } from "../../services/store";
import { Ingredient, Order } from "../../services/types";
import styles from "./order-item.module.css";

export interface OrderItem {
    readonly order: Order;
};

type DisplayedIngredients = {
    readonly ingredients: Array<Ingredient>;
    readonly otherCount: number;
};

const OrderItem: FC<OrderItem> = ({ order }) => {
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);

    const orderDate: Date = useMemo(() => {
        const time = Date.parse(order.updatedAt);
        return new Date(time);
    }, [order.updatedAt]);

    const price: number = useMemo(() => {
        let price = 0;
        for (const ingredientId of order.ingredients) {
            if (!ingredients.hasOwnProperty(ingredientId)) {
                // fixme how to handle this one?
                console.log("wtf?");
            } else {
                price += ingredients[ingredientId].price;
            }
        }
        return price;
    }, [order.ingredients, ingredients]);

    const displayedIngredients: DisplayedIngredients = useMemo(() => {
        const displayed: Array<string> = order.ingredients.slice(0, 6);
        const displayedResult: Array<Ingredient> = [];
        for (const ingredientId of displayed) {
            displayedResult.push(ingredients[ingredientId]);
        }
        const count = Math.max(order.ingredients.length - 6, 0);
        return { ingredients: displayedResult, otherCount: count };
    }, [order, ingredients]);

    const navigate = useNavigate();
    const location = useLocation();
    const click = () => {
        navigate(`${order._id}`, {state: { backgroundLocation: location }});
    };

    return (
        <div className={styles.item} onClick={click}>
            <div className={styles.order_date}>
                <span className={styles.order}>
                    #{order.number}
                </span>
                <FormattedDate
                    date={orderDate}
                    className={styles.date}
                />
            </div>
            <div className={styles.name}>
                <p className="text text_type_main-medium">
                    {order.name}
                </p>
            </div>
            <div className={styles.items_price}>
                <div className={styles.items}>
                    {displayedIngredients.ingredients.map((ingredient, index) =>
                        <div
                            key={index}
                            className={styles.ingredient}
                            style={{ zIndex: displayedIngredients.ingredients.length - index }}
                        >
                            <img
                                className={styles.ingredient_image}
                                src={ingredient.image}
                                alt={ingredient.name}
                            />
                        </div>
                    )}
                    {displayedIngredients.otherCount > 0 &&
                        <div
                            className={styles.ingredient_more}
                            style={{ zIndex: 1 }}
                        >
                            <p className={styles.ingredient_text}>
                                +{displayedIngredients.otherCount}
                            </p>
                        </div>
                    }
                </div>
                <Price price={price} />
            </div>
        </div>
    );
}

export default OrderItem;
