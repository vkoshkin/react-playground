import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient } from "../../services/constructor";

import BurgerConstructorItem from "./burger-constructor-item";
import OrderDetails from "./order-details";
import Modal from "../modal/modal";
import { useModal } from "../hooks/useModal";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
    const { bun, ingredients } = useSelector(state => state.burgerConstructor);

    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const onRemove = (ingredient, index) => {
        dispatch(removeIngredient({ingredient, index}));
    };

    const price = useMemo(() => {
        let price = 0;
        if (bun !== null) {
            price += bun.price * 2;
        }
        for (const ingredient of ingredients) {
            price += ingredient.price;
        }
        return price;
    }, [bun, ingredients]);

    return (
        <div className={styles.constructor}>
            <div className={styles.list}>
                {bun !== null &&
                    <BurgerConstructorItem ingredient={bun}
                        type="top"
                        isLocked={true}
                        extraClass={styles.list_top} />
                }
                <div className={styles.list_scroll}>
                    {ingredients.map((ingredient, index) => {
                        const style = (index !== ingredients.length - 1) ? styles.list_main : null;
                        return (
                            <BurgerConstructorItem ingredient={ingredient}
                                isLocked={false}
                                extraClass={style}
                                onRemove={() => onRemove(ingredient, index)} />
                        );
                    })}
                </div>
                {bun !== null &&
                    <BurgerConstructorItem ingredient={bun}
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
