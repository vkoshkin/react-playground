import React from 'react';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem'

class BurgerIngredientsSection extends React.Component {

    render() {
        return (
            <section>
                <h2 className="text text_type_main-medium pt-10">
                    {this.props.title}
                </h2>
                {this.props.data.map(data => <BurgerIngredientsItem item={data}/>)}
            </section>
        );
    }
}

export default BurgerIngredientsSection;
