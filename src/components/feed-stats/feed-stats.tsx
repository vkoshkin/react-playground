import { FC } from "react";

import { useTypedSelector } from "../../services/store";
import styles from "./feed-stats.module.css";

const FeedStats: FC = () => {
    const { ordersTotal, ordersToday, ready, inProgress } = useTypedSelector(store => store.commonFeed);
    return (
        <div className={styles.stats}>
            <div className={styles.columns}>
                <section className={styles.column}>
                    <h2 className={styles.section_title}>
                        Готовы:
                    </h2>
                    <div className={styles.column_scroll}>
                        <ul className={styles.column_list}>
                            {ready.map(orderNumber =>
                                <li
                                    key={orderNumber}
                                    className={styles.column_list_item_finished}
                                >
                                    {orderNumber}
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
                <section className={styles.column}>
                    <h2 className={styles.section_title}>
                        В работе:
                    </h2>
                    <div className={styles.column_scroll}>
                        <ul className={styles.column_list}>
                            {inProgress.map(orderNumber =>
                                <li
                                    key={orderNumber}
                                    className={styles.column_list_item}
                                >
                                    {orderNumber}
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
            </div>

            <section className={styles.section}>
                <h2 className={styles.section_title}>
                    Выполнено за всё время:
                </h2>
                <p className={styles.section_count}>
                    {ordersTotal}
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.section_title}>
                    Выполнено сегодня:
                </h2>
                <p className={styles.section_count}>
                    {ordersToday}
                </p>
            </section>
        </div>
    );
}

export default FeedStats;
