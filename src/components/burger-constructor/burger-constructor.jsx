import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "./burger-constructor-item";
import OrderDetails from "./order-details";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
    const { bun, ingredients } = useSelector(state => state.burgerConstructor);

    const { isModalOpen, openModal, closeModal } = useModal();

    const price = useMemo(() => {
        let price = 0;
        if (bun !== null) {
            price += bun.price * 2;
        }
        for (const ingredient of ingredients) {
            price += ingredient.data.price;
        }
        return price;
    }, [bun, ingredients]);

    return (
        <div className={styles.constructor}>
            <div className={styles.list}>
                <BurgerConstructorItem
                    ingredient={bun}
                    type="top"
                    isLocked={true}
                    extraClass={styles.list_top}
                />
                <div className={styles.list_scroll}>
                    {ingredients.length > 0 && ingredients.map((ingredient, index) => {
                        const style = (index !== ingredients.length - 1) ? styles.list_main : null;
                        return (
                            <BurgerConstructorItem
                                key={ingredient.id}
                                id={ingredient.id}
                                ingredient={ingredient.data}
                                isLocked={false}
                                extraClass={style}
                            />
                        );
                    })}
                    {ingredients.length === 0 &&
                        <BurgerConstructorItem
                            isLocked={true}
                        />
                    }
                </div>
                <BurgerConstructorItem
                    ingredient={bun}
                    type="bottom"
                    isLocked={true}
                    extraClass={styles.list_bottom}
                />
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
