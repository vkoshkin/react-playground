import React from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import BurgerIngredients from './components/ingredients/BurgerIngredients';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor';
import testData from './utils/data';

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
            <div className="app">
                <AppHeader />
                <main className="main">
                    <BurgerIngredients data={this.state.data}
                        ingredients={this.state.ingredients}
                        hook={(ingredient) => this.onAddIngredient(ingredient)} />
                    <BurgerConstructor ingredients={this.state.ingredients} />
                </main>
            </div>
        );
    }
}

export default App;
