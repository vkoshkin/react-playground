import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./price.module.css";

interface PriceProps {
    price: number;
};

const Price: FC<PriceProps> = ({ price }) => {
    return (
        <div className={styles.price}>
            <p className={styles.price_value}>
                {price}
            </p>
            <CurrencyIcon type="primary" />
        </div>
    );
}

export default Price;
