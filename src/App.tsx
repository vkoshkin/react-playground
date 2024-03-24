import React from 'react';
import './App.css';
import AppHeader from './components/header/AppHeader';
import BurgerIngredients from './components/ingredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
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
