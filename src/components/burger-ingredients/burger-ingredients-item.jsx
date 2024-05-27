import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from './ingredient-details';
import styles from './burger-ingredients-item.module.css';
import ingredientType from '../../utils/types';

function BurgerIngredientsItem(props) {
    const [showInfo, setShowInfo] = React.useState(false);
    const { ingredient, count, onAdd } = props;

    const onIngredientImageClick = event => {
        event.stopPropagation();
        setShowInfo(true);
    };
    return (
        <div className={styles.item} onClick={onAdd}>
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

            {showInfo && ReactDOM.createPortal(
                (
                    <IngredientDetails ingredient={ingredient} onClose={() => setShowInfo(false)} />
                ),
                document.body
            )}
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientType,
    count: PropTypes.number,
    onAdd: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;
