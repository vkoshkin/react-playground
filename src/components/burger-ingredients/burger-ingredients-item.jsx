import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { addIngredient } from "../../services/constructor";

import IngredientDetails from "./ingredient-details";
import Modal from "../modal/modal";
import { useModal } from "../hooks/useModal";
import styles from "./burger-ingredients-item.module.css";
import ingredientType from "../../utils/types";

function BurgerIngredientsItem(props) {
    const { ingredient, count } = props;
    const { isModalOpen, openModal, closeModal } = useModal();

    const onIngredientImageClick = event => {
        event.stopPropagation();
        openModal();
    };

    const dispatch = useDispatch();
    const onAdd = () => {
        dispatch(addIngredient(ingredient));
    };
    return (
        <div className={styles.item} onClick={e => onAdd()}>
            <div>
                <img className={styles.item_image}
                    src={ingredient.image}
                    alt={ingredient.name}
                    onClick={onIngredientImageClick} />
                <div className={styles.item_price}>
                    <p className={styles.item_price_value}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.item_description}>
                    <p className={styles.item_description_text}>{ingredient.name}</p>
                </div>
            </div>
            {count > 0 && <Counter count={count} size="default" />}

            {isModalOpen &&
                <Modal header={"Детали ингредиента"} onClose={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            }
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientType,
    count: PropTypes.number,
};

export default BurgerIngredientsItem;
