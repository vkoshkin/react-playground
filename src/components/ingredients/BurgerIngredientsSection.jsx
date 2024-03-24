import React from 'react';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsSection extends React.Component {

    render() {
        return (
            <section>
                <h2 className="text text_type_main-medium pt-10">
                    {this.props.title}
                </h2>
            </section>
        );
    }
}

export default BurgerIngredientsSection;
