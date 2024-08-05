import { FC } from "react";

import { useTypedSelector } from "../../services/store";
import OrderItem from "../order-item/order-item";
import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    const { orders } = useTypedSelector(store => store.profileFeed);
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {orders.map(order =>
                    <li
                        key={order._id}
                        className={styles.list_item}
                    >
                        <OrderItem
                            order={order}
                            displayStatus={true}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ProfileOrders;
