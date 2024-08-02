import { FC } from "react";

import styles from "./order-description-item.module.css";
import { Ingredient } from "../../services/types";

interface OrderDescriptionItemProps {
    readonly ingredient: Ingredient;
};

const OrderDescriptionItem: FC<OrderDescriptionItemProps> = ({ ingredient }) => {
    return (
        <div className={styles.item}>
        </div>
    );
};

export default OrderDescriptionItem;
