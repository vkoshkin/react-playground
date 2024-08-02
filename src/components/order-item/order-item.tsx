import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import Price from "../price/price";
import { useAppDispatch, useTypedSelector } from "../../services/store";
import { feedSelectOrder } from "../../services/common-feed";
import { Ingredient, Order } from "../../services/types";
import styles from "./order-item.module.css";
import IngredientImage from "../ingredient-image/ingredient-image";

export interface OrderItemProps {
    readonly order: Order;
};

const OrderItem: FC<OrderItemProps> = ({ order }) => {
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
        dispatch(feedSelectOrder(order._id));
        navigate(`${order._id}`, { state: { backgroundLocation: location } });
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
                    {displayedIngredients.map((ingredient, index) =>
                        <IngredientImage
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
