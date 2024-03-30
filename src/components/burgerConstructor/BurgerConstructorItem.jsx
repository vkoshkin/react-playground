import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructorItem.module.css';

class BurgerIngredientsItem extends React.PureComponent {

    render() {
        const { type, isLocked, name, price, image, extraClass } = this.props;
        let styleClasses = styles.container;
        if (extraClass !== null) {
            styleClasses += ' ' + extraClass;
        }
        return (
            <div className={styleClasses}>
                {isLocked &&
                    <div className={styles.drag}>
                        <DragIcon type="primary" />
                    </div>
                }
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={name}
                    price={price}
                    thumbnail={image}
                    extraClass={styles.element}
                />
            </div>
        );
    }
}

export default BurgerIngredientsItem;
