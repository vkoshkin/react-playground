import { FC, useMemo } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-list-item.module.css";
import { Order } from "../../services/types";

export interface OrderListItem {
    readonly order: Order;
}

const OrderListItem: FC<OrderListItem> = ({order}) => {
    const orderDate = useMemo(() => {
        const time = Date.parse(order.updatedAt);
        return new Date(time);
    }, [order.updatedAt]);

    return (
        <div className={styles.item}>
            <div className={styles.order_date}>
                <span className={styles.order}>
                    #{order.number}
                </span>
                <FormattedDate 
                    date={orderDate} 
                    className={styles.date}
                />
            </div>
            <div className={styles.name}>
                <p className="text text_type_main-medium">
                    {order.name}
                </p>
            </div>
            <div className={styles.items_price}>
                <div className={styles.items}>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/bun-01.png"/>
                    </div>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/cheese.png"/>
                    </div>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/meat-03.png"/>
                    </div>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    </div>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/sauce-04.png"/>
                    </div>
                    <div className={styles.ingredient}>
                        <img className={styles.ingredient_image} src="https://code.s3.yandex.net/react/code/meat-02.png"/>
                    </div>
                </div>
                <div className={styles.price}>
                    <p className={styles.price_value}>2240</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default OrderListItem;