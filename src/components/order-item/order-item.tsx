import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useTypedSelector } from "../../services/store";
import { Ingredient, Order } from "../../services/types";
import { orderSelect } from "../../services/order";
import IngredientPreview from "../ingredient-preview/ingredient-preview";
import Price from "../price/price";
import styles from "./order-item.module.css";

export interface OrderItemProps {
    readonly order: Order;
    readonly displayStatus?: boolean;
};

const OrderItem: FC<OrderItemProps> = ({ order, displayStatus }) => {
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

    const displayedIngredients: Array<Ingredient> = useMemo(() => {
        return order.ingredients.slice(0, 6).map(ingredientId => ingredients[ingredientId]);
    }, [order, ingredients]);

    const otherCount: number = useMemo(() => {
        return Math.max(order.ingredients.length - 6, 0);
    }, [order]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const click = () => {
        dispatch(orderSelect(order));
        navigate(`${order.number}`, { state: { backgroundLocation: location } });
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
            {displayStatus &&
                <div className={styles.status}>
                    {order.status === "created" &&
                        <p className={styles.status_text}>
                            Создан
                        </p>
                    }
                    {order.status === "pending" &&
                        <p className={styles.status_text}>
                            Готовится
                        </p>
                    }
                    {order.status === "done" &&
                        <p className={styles.status_text_finished}>
                            Выполнен
                        </p>
                    }
                </div>
            }
            <div className={styles.items_price}>
                <div className={styles.items}>
                    {displayedIngredients.map((ingredient, index) =>
                        <IngredientPreview
                            key={index}
                            image={ingredient.image}
                            altName={ingredient.name}
                            zIndex={displayedIngredients.length - index}
                            topText={
                                index === displayedIngredients.length - 1
                                    && otherCount > 0
                                    ? `+${otherCount}`
                                    : undefined
                            }
                            extraClass={styles.ingredient_item}
                        />
                    )}
                </div>
                <Price price={price} />
            </div>
        </div>
    );
}

export default OrderItem;
