import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsSection from './burger-ingredients-section';
import styles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            currentTab: "buns",
        }
    }

    render() {
        const { data } = this.props;
        const buns = data.filter((row) => row.type === "bun");
        const sauces = data.filter((row) => row.type === "sauce");
        const mains = data.filter((row) => row.type === "main");

        return (
            <div className={styles.ingredients}>
                <h1 className="text text_type_main-large pt-10 pb-5">Собери бургер</h1>

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

                <BurgerIngredientsSection title="Булки" data={buns} />
                <BurgerIngredientsSection title="Соусы" data={sauces} />
                <BurgerIngredientsSection title="Начинки" data={mains} />
            </div>
        );
    }
}

export default BurgerIngredients;
