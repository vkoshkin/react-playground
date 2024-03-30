import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from './BurgerConstructorItem';
import styles from './BurgerConstructor.module.css';

class BurgerConstructor extends React.Component {

    render() {
        const { ingredients } = this.props;
        let price = 0;
        if (ingredients.top !== null && ingredients.bottom != null) {
            price += ingredients.top.price;
            price += ingredients.bottom.price;
        }
        for (const ingredient of ingredients.main) {
            price += ingredient.price;
        }
        const topIngredient = this.props.ingredients.top;
        const mainIngredients = this.props.ingredients.main;
        const bottomIngredient = this.props.ingredients.bottom;

        return (
            <div className={styles.constructor}>
                <div className={styles.list}>
                    {topIngredient !== null &&
                        <BurgerConstructorItem {...topIngredient} type="top" extraClass={styles.list_top} />
                    }
                    <div className={styles.list_scroll}>
                        {mainIngredients.map((ingredient, index) => {
                            const style = (index !== mainIngredients.length - 1) ? styles.list_main : null;
                            return (
                                <BurgerConstructorItem {...ingredient} isLocked="false" key={index} extraClass={style}/>
                            );
                        })}
                    </div>
                    {bottomIngredient !== null &&
                        <BurgerConstructorItem {...bottomIngredient} type="bottom" extraClass={styles.list_bottom} />
                    }
                </div>
                <div className={styles.footer}>
                    <div className={styles.footer_price}>
                        <span className={styles.footer_price_number}>{price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
    }
}

export default BurgerConstructor;
