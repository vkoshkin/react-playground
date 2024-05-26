import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import styles from './burger-constructor-order.module.css';
import Order1 from '../../images/order-1.svg'
import Order2 from '../../images/order-2.svg'
import Order3 from '../../images/order-3.svg'

function BurgerConstructorOrder(props) {
    const { onClose } = props;
    return (
        <ModalOverlay onClose={onClose}>
            <Modal onClose={onClose}>
                <div className={styles.layout}>
                    <p className={styles.order_id}>034536</p>
                    <p className={styles.order_id_desc}>идентификатор заказа</p>
                    <div className={styles.order_icon}>
                        <img src={Order1} alt="Заказ" />
                        <img src={Order2} alt="Заказ" />
                        <img src={Order3} alt="Заказ" />
                        <CheckMarkIcon type="primary" />
                    </div>
                    <p className={styles.order_info}>Ваш заказ начали готовить</p>
                    <p className={styles.order_sub}>Дождитесь готовности на орбитальной станции</p>
                </div>
            </Modal>
        </ModalOverlay>
    );
}

BurgerConstructorOrder.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default BurgerConstructorOrder;
