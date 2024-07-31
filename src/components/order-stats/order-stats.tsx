import { FC } from "react";

import { useTypedSelector } from "../../services/store";
import styles from "./order-stats.module.css";

const OrderStats: FC = () => {
    const { ordersTotal, ordersToday, ready, inProgress } = useTypedSelector(store => store.commonFeed);
    return (
        <div>
            <section className={styles.section}>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={styles.column_section_title}>
                            Готовы:
                        </h2>
                        <ul className={styles.column_list}>
                            {ready.map(orderNumber => 
                                <li key={orderNumber} className={styles.column_list_item_finished}>{orderNumber}</li>
                            )}
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h2 className={styles.column_section_title}>
                            В работе:
                        </h2>
                        <ul className={styles.column_list}>
                            {inProgress.map(orderNumber => 
                                <li key={orderNumber} className={styles.column_list_item}>{orderNumber}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>

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

export default OrderStats;