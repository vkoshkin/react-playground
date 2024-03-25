import React from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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

        return (
            <div className={styles.constructor}>
                <div className="mt-25">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {this.props.ingredients.top !== null && <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={this.props.ingredients.top.name}
                            price={this.props.ingredients.bottom.price}
                            thumbnail={this.props.ingredients.top.image}
                            extraClass={styles.constructor_element}
                        />}

                        {this.props.ingredients.main.map(ingredient => <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            extraClass={styles.constructor_element}
                        />)}
                        {this.props.ingredients.bottom !== null && <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={this.props.ingredients.bottom.name}
                            price={this.props.ingredients.bottom.price}
                            thumbnail={this.props.ingredients.bottom.image}
                            extraClass={styles.constructor_element}
                        />}
                    </div>
                </div>
                <div className={styles.constructor_footer}>
                    <div className={styles.constructor_price}>
                        <span className={styles.constructor_price_number}>{price}</span>
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
