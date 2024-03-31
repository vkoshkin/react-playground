import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import testData from '../../utils/data';
import styles from './app.module.css';

class App extends React.Component {
    state = {
        data: testData,
        ingredients: {
            top: null,
            main: [],
            bottom: null,
        },
    };

    onAddIngredient = (ingredient) => {
        let updatedIngredients = { ...this.state.ingredients };
        if (ingredient.type === "bun") {
            updatedIngredients.top = ingredient;
            updatedIngredients.bottom = ingredient;
        } else {
            updatedIngredients.main.push(ingredient);
        }
        this.setState({ ...this.state, ingredients: updatedIngredients });
    }

    render() {
        return (
            <div className={styles.app}>
                <AppHeader />
                <main className={styles.main}>
                    <div className={styles.panel}>
                        <BurgerIngredients data={this.state.data}
                            ingredients={this.state.ingredients}
                            onAdd={(ingredient) => this.onAddIngredient(ingredient)} />
                    </div>
                    <div className={styles.panel}>
                        <BurgerConstructor ingredients={this.state.ingredients} />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
