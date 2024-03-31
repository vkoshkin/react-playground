import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';
import ingredientType from '../../utils/types';

function BurgerIngredientsItem(props) {
    const { ingredient, count, onAdd } = props;
    return (
        <div className={styles.item} onClick={onAdd}>
            <div>
                <img className="pl-4 pr-4 mb-1" src={ingredient.image} alt={ingredient.name} />
                <div className={styles.item_price}>
                    <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.item_description}>
                    <p className="text text_type_main-default pt-1">
                        {ingredient.name}
                    </p>
                </div>
            </div>
            {count > 0 && <Counter count={count} size="default" />}
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.instanceOf(ingredientType).isRequired,
    count: PropTypes.number,
    onAdd: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;
