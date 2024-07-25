import { FC } from "react";

import OrderListItem from "./order-list-item";
import styles from "./order-list.module.css";

const OrderList: FC = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
                <li className={styles.list_item}>
                    <OrderListItem />
                </li>
            </ul>
        </div>
    );
}

export default OrderList;