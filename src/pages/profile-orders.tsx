import { FC } from "react";

import OrderList from "../components/order-list/order-list";
import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    return (
        <div className={styles.orders}>
            <OrderList/>
        </div>
    );
}

export default ProfileOrders;
