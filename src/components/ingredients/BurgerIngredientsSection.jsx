import React from 'react';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem'
import styles from './BurgerIngredientsSection.module.css';

class BurgerIngredientsSection extends React.Component {

    render() {
        return (
            <section>
                <h2 className="text text_type_main-medium pt-10">
                    {this.props.title}
                </h2>
                <div className={styles.container}>
                    {this.props.data.map(data => <BurgerIngredientsItem item={data}/>)}
                </div>
            </section>
        );
    }
}

export default BurgerIngredientsSection;
