import React from 'react';
import './App.css';
import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from './components/burger-constructor';

function App() {
    return (
        <div className="app">
            <AppHeader />
            <main className="main">
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
