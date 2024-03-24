import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredientsItem.module.css';

class BurgerIngredientsItem extends React.Component {

    render() {
        return (
            <div className={styles.item}>
                <img className="pl-4 pr-4 mb-1" src={this.props.item.image} alt={this.props.item.name} />
                <div className={styles.item_price}>
                    <span className="text text_type_digits-default">{this.props.item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.item_description}>
                    <p className="text text_type_main-default pt-1">
                        {this.props.item.name}
                    </p>
                </div>
            </div>
        );
    }
}

export default BurgerIngredientsItem;
