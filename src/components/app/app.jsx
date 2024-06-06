import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchIngredients } from "../../services/actions";

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

    const { ingredientRequest, ingredientRequestError } = useSelector(state => state.app);

    return (
        <div className={styles.app}>
            {!ingredientRequest && !ingredientRequestError &&
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
            {!ingredientRequest && ingredientRequestError &&
                <AppError />
            }
        </div>
    );
}

export default App;
