import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import styles from './burger-constructor-order.module.css';

function BurgerConstructorOrder(props) {
    const { onClose } = props;
    return (
        <ModalOverlay onClose={onClose}>
            <Modal onClose={onClose}>
                <div className={styles.layout}>
                    <span className={styles.order_id}>034536</span>
                    <span className={styles.order_id_desc}>идентификатор заказа</span>
                    <div className={styles.order_icon}>
                        <CheckMarkIcon type="primary"/>
                    </div>
                    <span className={styles.order_info}>Ваш заказ начали готовить</span>
                    <span className={styles.order_sub}>Дождитесь готовности на орбитальной станции</span>
                </div>
            </Modal>
        </ModalOverlay>
    );
}

export default BurgerConstructorOrder;
