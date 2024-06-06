import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const { dataRequest, dataRequestError } = useSelector(state => state.app);

    return (
        <div className={styles.app}>
            {!dataRequest && !dataRequestError &&
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.panel}>
                            <BurgerIngredients />
                        </div>
                        <div className={styles.panel}>
                            <BurgerConstructor />
                        </div>
                    </main>
                </>
            }
            {!dataRequest && dataRequestError &&
                <AppError />
            }
        </div>
    );
}

export default App;
