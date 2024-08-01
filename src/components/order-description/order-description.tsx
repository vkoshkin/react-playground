import { FC } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-description.module.css";
import Price from "../price/price";

const OrderDescription: FC = () => {
    return (
        <div className={styles.desc}>
            <h1 className={styles.order_number}>
                #034533
            </h1>
            <div className={styles.order_name_status}>
                <h2 className={styles.order_name}>
                    Black Hole Singularity острый бургер
                </h2>
                <p className={styles.order_status}>
                    Выполнен
                </p>
            </div>
            <div className={styles.order_ingredients}>
                <h2 className={styles.order_ingredients_header}>Состав:</h2>
            </div>
            <div className={styles.order_footer}>
                <FormattedDate 
                    date={new Date()}
                    className={styles.order_date}
                />
                <Price price={510}/>
            </div>
        </div>
    );
}

export default OrderDescription;
