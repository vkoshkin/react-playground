import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './burger-ingredients-item'
import styles from './burger-ingredients.module.css';
import ingredientType from '../../utils/types';

function BurgerIngredients(props) {
    const [state, useState] = React.useState({
        currentTab: "buns",
    });

    const { data, ingredients, onAdd } = props;
    const buns = data.filter((row) => row.type === "bun");
    const sauces = data.filter((row) => row.type === "sauce");
    const mains = data.filter((row) => row.type === "main");

    const counts = {};
    if (ingredients.top !== null && ingredients.bottom !== null) {
        counts[ingredients.top._id] = 1;
    }
    for (const ingredient of ingredients.main) {
        if (!counts[ingredient._id]) {
            counts[ingredient._id] = 1;
        } else {
            counts[ingredient._id] += 1;
        }
    }

    return (
        <div className={styles.ingredients}>
            <h1 className={styles.header}>Собери бургер</h1>

            <nav className={styles.tabs}>
                <Tab value="buns" active={state.currentTab === "buns"} >
                    Булки
                </Tab>
                <Tab value="sauces" active={state.currentTab === "sauces"} >
                    Соусы
                </Tab>
                <Tab value="mains" active={state.currentTab === "mains"} >
                    Начинка
                </Tab>
            </nav>

            <div className={styles.sections}>
                <section>
                    <h2 className="text text_type_main-medium pt-10">Булки</h2>
                    <div className={styles.section_container}>
                        {buns.map(data =>
                            <BurgerIngredientsItem
                                key={data._id}
                                ingredient={data}
                                count={counts[data._id]}
                                onAdd={() => onAdd(data)} />
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                    <div className={styles.section_container}>
                        {sauces.map(data =>
                            <BurgerIngredientsItem
                                key={data._id}
                                ingredient={data}
                                count={counts[data._id]}
                                onAdd={() => onAdd(data)} />
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                    <div className={styles.section_container}>
                        {mains.map(data =>
                            <BurgerIngredientsItem
                                key={data._id}
                                ingredient={data}
                                count={counts[data._id]}
                                onAdd={() => onAdd(data)} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredients: PropTypes.exact({
        top: PropTypes.instanceOf(ingredientType),
        ingredients: PropTypes.arrayOf(ingredientType).isRequired,
        bottom: PropTypes.instanceOf(ingredientType),
    }).isRequired,
    data: PropTypes.arrayOf(ingredientType).isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default BurgerIngredients;
