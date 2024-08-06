import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { fetchOrder } from "../services/order";
import OrderDescription from "../components/order-description/order-description";
import styles from "./order-page.module.css";

const OrderPage: FC = () => {
    const { orderNumber } = useParams();
    if (!orderNumber) {
        throw new Error("OrderPage shown without params");
    }
    const dispatch = useAppDispatch();
    const { selectedOrder, fetchRequest, fetchError } = useTypedSelector(state => state.order);

    useEffect(() => {
        const parsedOrderNumber = parseInt(orderNumber);
        dispatch(fetchOrder(parsedOrderNumber));
    }, [dispatch, orderNumber]);
    
    return (
        <div className={styles.page}>
            {fetchRequest &&
                <div className={styles.center}>
                    <div className="loader" />
                </div>
            }
            {fetchError &&
                <div className={styles.center}>
                    <p className="text text_type_main-medium">Не удалось загрузить заказ</p>
                </div>
            }
            {!fetchRequest && !fetchError && selectedOrder &&
                <OrderDescription />
            }
        </div>
    );
};

export default OrderPage;
