import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';
import ingredientType from '../../utils/types';

class BurgerIngredientsItem extends React.PureComponent {

    render() {
        return (
            <div className={styles.item} onClick={this.props.onAdd}>
                <div>
                    <img className="pl-4 pr-4 mb-1"
                        src={this.props.ingredient.image}
                        alt={this.props.ingredient.name} />
                    <div className={styles.item_price}>
                        <span className="text text_type_digits-default mr-1">{this.props.ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={styles.item_description}>
                        <p className="text text_type_main-default pt-1">
                            {this.props.ingredient.name}
                        </p>
                    </div>
                </div>
                {this.props.count > 0 && <Counter count={this.props.count} size="default" />}
            </div>
        );
    }
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.instanceOf(ingredientType).isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;
