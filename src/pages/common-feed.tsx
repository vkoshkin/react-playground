import { FC } from "react";

import OrderList from "../components/order-list/order-list";
import OrderStats from "../components/order-stats/order-stats";
import styles from "./common-feed.module.css";

const CommonFeed: FC = () => {
    return (
        <div className={styles.feed}>
            <h1 className={styles.header}>Лента заказов</h1>
            <div className={styles.panels}>
                <div className={styles.list}>
                    <OrderList />
                </div>
                <div className={styles.stats}>
                    <OrderStats />
                </div>
            </div>
        </div>
    );
}

export default CommonFeed;
