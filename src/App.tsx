import React from 'react';
import './App.css';
import AppHeader from './components/header/app-header';
import BurgerIngredients from './components/ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor';
import testData from './utils/data';

function App() {
    return (
        <div className="app">
            <AppHeader />
            <main className="main">
                <BurgerIngredients data={testData}/>
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
