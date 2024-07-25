import { FC } from "react";

import styles from "./order-stats.module.css";

const OrderStats: FC = () => {
    return (
        <div>
            <section className={styles.section}>
                <div className={styles.rows}>
                    <div className={styles.row}>
                        <h2 className={styles.row_section_title}>
                            Готовы:
                        </h2>
                        <ul className={styles.row_list}>
                            <li className={styles.row_list_item_finished}>034533</li>
                            <li className={styles.row_list_item_finished}>034532</li>
                            <li className={styles.row_list_item_finished}>034530</li>
                            <li className={styles.row_list_item_finished}>034527</li>
                            <li className={styles.row_list_item_finished}>034525</li>
                        </ul>
                    </div>
                    <div className={styles.row}>
                        <h2 className={styles.row_section_title}>
                            В работе:
                        </h2>
                        <ul className={styles.row_list}>
                            <li className={styles.row_list_item}>034538</li>
                            <li className={styles.row_list_item}>034541</li>
                            <li className={styles.row_list_item}>034542</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.section_title}>
                    Выполнено за всё время:
                </h2>
                <p className={styles.section_count}>
                    28752
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.section_title}>
                    Выполнено сегодня:
                </h2>
                <p className={styles.section_count}>
                    138
                </p>
            </section>
        </div>
    );
}

export default OrderStats;