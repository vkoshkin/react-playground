import React from 'react';

import AppError from './app-error';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

const API_ENDPOINT = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [state, setState] = React.useState({
        data: [],
        ingredients: {
            top: null,
            main: [],
            bottom: null,
        },
        isLoading: false,
        hasError: false,
    });

    React.useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, isLoading: true, hasError: false });
            await fetch(API_ENDPOINT)
                .then(response => response.json())
                .then(responseJson => setState({ ...state, data: responseJson.data, isLoading: false }))
                .catch(e => {
                    setState({ ...state, hasError: true, isLoading: false });
                });
        }
        fetchData();
    }, []);

    const onAddIngredient = (ingredient) => {
        let updatedIngredients = { ...state.ingredients };
        if (ingredient.type === "bun") {
            updatedIngredients.top = ingredient;
            updatedIngredients.bottom = ingredient;
        } else {
            updatedIngredients.main.push(ingredient);
        }
        setState({ ...state, ingredients: updatedIngredients });
    };

    return (
        <div className={styles.app}>
            {!state.isLoading && !state.hasError &&
                <AppHeader />
            }
            {!state.isLoading && !state.hasError &&
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
            }
            {!state.isLoading && state.hasError &&
                <AppError />
            }
        </div>
    );
}

export default App;
