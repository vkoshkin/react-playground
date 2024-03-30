import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

class BurgerIngredientsItem extends React.PureComponent {

    render() {
        const { ingredient, type, isLocked, extraClass } = this.props;
        let styleClasses = styles.container;
        if (extraClass !== null) {
            styleClasses += ' ' + extraClass;
        }
        let text = ingredient.name;
        if (type === "top") {
            text += " (верх)"
        } else if (type === "bottom") {
            text += " (низ)"
        }

        return (
            <div className={styleClasses}>
                {!isLocked &&
                    <div className={styles.drag}>
                        <DragIcon type="primary" />
                    </div>
                }
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={text}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    extraClass={styles.element}
                />
            </div>
        );
    }
}

export default BurgerIngredientsItem;
