import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "./burger-constructor-item";
import OrderDetails from "./order-details";
import Modal from "../modal/modal";
import { useModal } from "../hooks/useModal";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
    const { ingredients } = useSelector(state => state.app);
    let price = 0;
    if (ingredients.top !== null && ingredients.bottom != null) {
        price += ingredients.top.price;
        price += ingredients.bottom.price;
    }
    for (const ingredient of ingredients.main) {
        price += ingredient.price;
    }
    const topIngredient = ingredients.top;
    const mainIngredients = ingredients.main;
    const bottomIngredient = ingredients.bottom;

    const { isModalOpen, openModal, closeModal } = useModal();

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
                                key={index} />
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
                    <span className={styles.footer_price_number}>{price}</span>
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
