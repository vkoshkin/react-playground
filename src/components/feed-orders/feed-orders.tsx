import { FC, useMemo } from "react";

import { useTypedSelector } from "../../services/store";
import { Order } from "../../services/types";
import OrderItem from "../order-item/order-item";
import styles from "./feed-orders.module.css";

const FeedOrders: FC = () => {
    const { orders } = useTypedSelector(store => store.commonFeed);
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);

    const filteredOrders: Array<Order> = useMemo(() => {
        let result: Array<Order> = [];
        let ingredientIds: Array<string> = Object.keys(ingredients);
        for (const o of orders) {
            if (o.ingredients.every(i => ingredientIds.includes(i))) {
                result.push(o);
            }
        }
        return result;
    }, [orders]);

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {filteredOrders.map(order =>
                    <li
                        key={order._id}
                        className={styles.list_item}
                    >
                        <OrderItem order={order} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default FeedOrders;
