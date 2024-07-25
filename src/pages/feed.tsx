import { FC } from "react";

import OrderList from "../components/order-list/order-list";
import OrderStats from "../components/order-stats/order-stats";
import styles from "./feed.module.css";

const Feed: FC = () => {
    return (
        <div className={styles.feed}>
            <h1 className={styles.header}>Лента заказов</h1>
            <div className={styles.panels}>
                <div className={styles.panel}>
                    <OrderList />
                </div>
                <div className={styles.panel}>
                    <OrderStats />
                </div>
            </div>
        </div>
    );
}

export default Feed;