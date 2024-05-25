import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
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
                <img className="pl-4 pr-4 mb-1" 
                    src={ingredient.image} 
                    alt={ingredient.name} 
                    onClick={onIngredientImageClick}/>
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
            
            {showInfo && ReactDOM.createPortal((
                    <ModalOverlay onClose={() => setShowInfo(false)}>
                        <Modal onClose={() => setShowInfo(false)}>
                            
                        </Modal>
                    </ModalOverlay>
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
