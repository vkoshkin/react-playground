import React from 'react';

import AppHeader from '../header/AppHeader';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
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
                            hook={(ingredient) => this.onAddIngredient(ingredient)} />
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
