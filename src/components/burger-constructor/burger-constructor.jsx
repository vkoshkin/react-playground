import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from './burger-constructor-item';
import BurgerConstructorOrder from './burger-constructor-order';
import styles from './burger-constructor.module.css';
import ingredientType from '../../utils/types';

function BurgerConstructor(props) {
    const [showOrder, setShowOrder] = React.useState(false);

    const { ingredients } = props;
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
                <Button htmlType="button" type="primary" size="medium" onClick={() => setShowOrder(true)}>
                    Оформить заказ
                </Button>
            </div>
            {showOrder && ReactDOM.createPortal((
                    <BurgerConstructorOrder onClose={() => setShowOrder(false)} />
                ),
                document.body
            )}
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.exact({
        top: ingredientType,
        main: PropTypes.arrayOf(ingredientType).isRequired,
        bottom: ingredientType,
    }).isRequired
};

export default BurgerConstructor;
