import { FC, useEffect } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { postOrder } from "../../services/order";
import { useAppDispatch, useTypedSelector } from "../../services/store";
import styles from "./order-details.module.css";
import order1 from "../../images/order-1.svg"
import order2 from "../../images/order-2.svg"
import order3 from "../../images/order-3.svg"

export const OrderDetails: FC = () => {
    const { bun, ingredients } = useTypedSelector(state => state.burgerConstructor);
    const { request, requestError, orderId } = useTypedSelector(state => state.order);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(postOrder(bun!, ingredients.map(e => e.data)));
    }, []);

    return (
        <div className={styles.layout}>
            {request && !requestError &&
                <span className={styles.loader}></span>
            }
            {!request && !requestError &&
                <>
                    <p className={styles.order_id}>{orderId}</p>
                    <p className={styles.order_id_desc}>идентификатор заказа</p>
                    <div className={styles.order_icon}>
                        <img src={order1} alt="Заказ" />
                        <img src={order2} alt="Заказ" />
                        <img src={order3} alt="Заказ" />
                        <CheckMarkIcon type="primary" />
                    </div>
                    <p className={styles.order_info}>Ваш заказ начали готовить</p>
                    <p className={styles.order_sub}>Дождитесь готовности на орбитальной станции</p>
                </>
            }
            {!request && requestError &&
                <>
                    <p className={styles.order_id_desc}>Не удалось создать заказ</p>
                    <p className={styles.order_info}>Промстимте пожалумста, заказ не получилось оформить</p>
                    <p className={styles.order_sub}>Попробуйте ещё раз, мы не удалили Вашу корзину</p>
                </>
            }
        </div>
    );
}

export default OrderDetails;
