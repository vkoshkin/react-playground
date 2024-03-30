import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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
                <div className={styles.list}>
                    {this.props.ingredients.top !== null && <div className={styles.constructor_container}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={this.props.ingredients.top.name}
                            price={this.props.ingredients.bottom.price}
                            thumbnail={this.props.ingredients.top.image}
                            extraClass={styles.constructor_element}
                        />
                    </div>}
                    <div className={styles.list_scroll}>
                        {this.props.ingredients.main.map(ingredient => <div className={styles.constructor_container}>
                            <div className={styles.constructor_drag}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                extraClass={styles.constructor_element}
                            />
                        </div>)}
                    </div>
                    {this.props.ingredients.bottom !== null && <div className={styles.constructor_container}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={this.props.ingredients.bottom.name}
                            price={this.props.ingredients.bottom.price}
                            thumbnail={this.props.ingredients.bottom.image}
                            extraClass={styles.constructor_element}
                        />
                    </div>}
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
