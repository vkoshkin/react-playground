import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchIngredients } from "../../services/ingredients";

import AppError from "./app-error";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    const { request, requestError } = useSelector(state => state.burgerIngredients);
    return (
        <div className={styles.app}>
            {!request && !requestError &&
                <>
                    <DndProvider backend={HTML5Backend}>
                        <AppHeader />
                        <main className={styles.main}>
                            <div className={styles.panel}>
                                <BurgerIngredients />
                            </div>
                            <div className={styles.panel}>
                                <BurgerConstructor />
                            </div>
                        </main>
                    </DndProvider>
                </>
            }
            {!request && requestError &&
                <AppError />
            }
        </div>
    );
}

export default App;
