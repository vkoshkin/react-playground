import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredientsItem.module.css';

class BurgerIngredientsItem extends React.Component {

    render() {
        return (
            <div className={styles.item}>
                <img className="pl-4 pr-4 pb-1" src={this.props.item.image_large} alt=""/>
                <div>
                    <span className="text text_type_digits-default">{this.props.item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default pt-1">
                    {this.props.item.name}
                </p>
            </div>
        );
    }
}

export default BurgerIngredientsItem;
