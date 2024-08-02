import { FC } from "react";

import { useTypedSelector } from "../../services/store";
import OrderItem from "../order-item/order-item";
import styles from "./feed-orders.module.css";

const FeedOrders: FC = () => {
    const { orders } = useTypedSelector(store => store.commonFeed);
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {orders.map(order =>
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