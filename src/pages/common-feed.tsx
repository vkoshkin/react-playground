import { FC, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { feedWsConnect, feedWsDisconnect } from "../services/common-feed";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedStats from "../components/feed-stats/feed-stats";
import styles from "./common-feed.module.css";
import { WebSocketStatus, WS_FEED_URL } from "../utils/websockets";

const CommonFeed: FC = () => {
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);
    const { orders, status } = useTypedSelector(state => state.commonFeed);

    const ingredientCount = Object.keys(ingredients).length;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(feedWsConnect(WS_FEED_URL));
        return () => {
            dispatch(feedWsDisconnect());
        };
    }, [dispatch]);
    return (
        <div className={styles.feed}>
            <h1 className={styles.header}>Лента заказов</h1>
            {(status !== WebSocketStatus.ONLINE || orders.length === 0 || ingredientCount === 0) &&
                <div className={styles.loading}>
                    <div className="loader" />
                </div>
            }
            {status === WebSocketStatus.ONLINE && orders.length > 0 && ingredientCount > 0 &&
                <div className={styles.panels}>
                    <div className={styles.list}>
                        <FeedOrders />
                    </div>
                    <div className={styles.stats}>
                        <FeedStats />
                    </div>
                </div>
            }
        </div>
    );
}

export default CommonFeed;
