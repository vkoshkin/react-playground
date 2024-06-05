import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-details.module.css";
import order1 from "../../images/order-1.svg"
import order2 from "../../images/order-2.svg"
import order3 from "../../images/order-3.svg"

function OrderDetails(props) {
    return (
        <div className={styles.layout}>
            <p className={styles.order_id}>034536</p>
            <p className={styles.order_id_desc}>идентификатор заказа</p>
            <div className={styles.order_icon}>
                <img src={order1} alt="Заказ" />
                <img src={order2} alt="Заказ" />
                <img src={order3} alt="Заказ" />
                <CheckMarkIcon type="primary" />
            </div>
            <p className={styles.order_info}>Ваш заказ начали готовить</p>
            <p className={styles.order_sub}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
};

export default OrderDetails;
