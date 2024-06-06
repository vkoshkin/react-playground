import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient } from "../../services/app";

import BurgerConstructorItem from "./burger-constructor-item";
import OrderDetails from "./order-details";
import Modal from "../modal/modal";
import { useModal } from "../hooks/useModal";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
    const { constructorElements, burgerPrice } = useSelector(state => state.app);
    const topIngredient = constructorElements.top;
    const mainIngredients = constructorElements.main;
    const bottomIngredient = constructorElements.bottom;

    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const onRemove = (ingredient, index) => {
        dispatch(removeIngredient({ingredient, index}));
    };

    return (
        <div className={styles.constructor}>
            <div className={styles.list}>
                {topIngredient !== null &&
                    <BurgerConstructorItem ingredient={topIngredient}
                        type="top"
                        isLocked={true}
                        extraClass={styles.list_top} />
                }
                <div className={styles.list_scroll}>
                    {mainIngredients.map((ingredient, index) => {
                        const style = (index !== mainIngredients.length - 1) ? styles.list_main : null;
                        return (
                            <BurgerConstructorItem ingredient={ingredient}
                                isLocked={false}
                                extraClass={style}
                                onRemove={() => onRemove(ingredient, index)} />
                        );
                    })}
                </div>
                {bottomIngredient !== null &&
                    <BurgerConstructorItem ingredient={bottomIngredient}
                        type="bottom"
                        isLocked={true}
                        extraClass={styles.list_bottom} />
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.footer_price}>
                    <span className={styles.footer_price_number}>{burgerPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;
