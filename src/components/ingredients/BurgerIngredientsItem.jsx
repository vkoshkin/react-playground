import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredientsItem.module.css';

class BurgerIngredientsItem extends React.PureComponent {

    render() {
        return (
            <div className={styles.item} onClick={this.props.onAdd}>
                <div>
                    <img className="pl-4 pr-4 mb-1" src={this.props.item.image} alt={this.props.item.name} />
                    <div className={styles.item_price}>
                        <span className="text text_type_digits-default mr-1">{this.props.item.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={styles.item_description}>
                        <p className="text text_type_main-default pt-1">
                            {this.props.item.name}
                        </p>
                    </div>
                </div>
                {this.props.count > 0 && <Counter count={this.props.count} size="default" />}
            </div>
        );
    }
}

export default BurgerIngredientsItem;
