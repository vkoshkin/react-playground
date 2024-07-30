import { FC, useEffect } from "react";

import { useAppDispatch } from "../services/store";
import { wsConnect, wsDisconnect } from "../services/common-feed";
import OrderList from "../components/order-list/order-list";
import OrderStats from "../components/order-stats/order-stats";
import styles from "./common-feed.module.css";

const CommonFeed: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(wsConnect("wss://norma.nomoreparties.space/orders/all"));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);
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
