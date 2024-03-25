import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem'
import styles from './BurgerIngredients.module.css';

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: "buns",
        }
    }

    render() {
        const { data, ingredients } = this.props;
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
                    <Tab value="buns" active={this.state.currentTab === "buns"} >
                        Булки
                    </Tab>
                    <Tab value="sauces" active={this.state.currentTab === "sauces"} >
                        Соусы
                    </Tab>
                    <Tab value="mains" active={this.state.currentTab === "mains"} >
                        Начинка
                    </Tab>
                </nav>

                <div className={styles.sections}>
                    <section>
                        <h2 className="text text_type_main-medium pt-10">Булки</h2>
                        <div className={styles.section_container}>
                            {buns.map(data => <BurgerIngredientsItem
                                key={data._id}
                                item={data}
                                count={counts[data._id]}
                                onAdd={() => this.props.hook(data)} />)}
                        </div>
                    </section>

                    <section>
                        <h2 className="text text_type_main-medium pt-10">Соусы</h2>
                        <div className={styles.section_container}>
                            {sauces.map(data => <BurgerIngredientsItem
                                key={data._id}
                                item={data}
                                count={counts[data._id]}
                                onAdd={() => this.props.hook(data)} />)}
                        </div>
                    </section>

                    <section>
                        <h2 className="text text_type_main-medium pt-10">Начинки</h2>
                        <div className={styles.section_container}>
                            {mains.map(data => <BurgerIngredientsItem
                                key={data._id}
                                item={data}
                                count={counts[data._id]}
                                onAdd={() => this.props.hook(data)} />)}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default BurgerIngredients;
