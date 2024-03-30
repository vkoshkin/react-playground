import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructorItem.module.css';

class BurgerIngredientsItem extends React.PureComponent {

    render() {
        const { type, isLocked, name, price, image } = this.props;
        return (
            <div className={styles.constructor_container}>
                {isLocked && <div className={styles.constructor_drag}>
                    <DragIcon type="primary" />
                </div>}
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={name}
                    price={price}
                    thumbnail={image}
                    extraClass={styles.constructor_element}
                />
            </div>
        );
    }
}

export default BurgerIngredientsItem;
