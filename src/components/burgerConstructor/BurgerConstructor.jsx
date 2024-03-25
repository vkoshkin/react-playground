import React from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';

class BurgerConstructor extends React.Component {

    render() {
        return (
            <div className={styles.constructor}>
                <div className="mt-25">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            // thumbnail={img}
                        />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            // thumbnail={img}
                        />
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            // thumbnail={img}
                        />
                    </div>
                </div>
                <div className={styles.constructor_footer}>
                    <div className={styles.constructor_price}>
                        <span className={styles.constructor_price_number}>0</span>
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
