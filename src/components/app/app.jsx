import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import testData from '../../utils/data';
import styles from './app.module.css';

function App() {
    const [state, setState] = React.useState({
        data: testData,
        ingredients: {
            top: null,
            main: [],
            bottom: null,
        },
    });

    const onAddIngredient = (ingredient) => {
        let updatedIngredients = { ...state.ingredients };
        if (ingredient.type === "bun") {
            updatedIngredients.top = ingredient;
            updatedIngredients.bottom = ingredient;
        } else {
            updatedIngredients.main.push(ingredient);
        }
        setState({ ...state, ingredients: updatedIngredients });
    }

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.panel}>
                    <BurgerIngredients data={state.data}
                        ingredients={state.ingredients}
                        onAdd={(ingredient) => onAddIngredient(ingredient)} />
                </div>
                <div className={styles.panel}>
                    <BurgerConstructor ingredients={state.ingredients} />
                </div>
            </main>
        </div>
    );
}

export default App;
