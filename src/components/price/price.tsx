import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./price.module.css";

interface PriceProps {
    price: number;
    count?: number;
};

const Price: FC<PriceProps> = ({ price, count }) => {
    const countValid = count !== null && count !== undefined;
    return (
        <div className={styles.price}>
            {countValid &&
                <p className={styles.price_value}>
                    {count} x {price}
                </p>
            }
            {!countValid &&
                <p className={styles.price_value}>
                    {price}
                </p>
            }
            <CurrencyIcon type="primary" />
        </div>
    );
}

export default Price;
