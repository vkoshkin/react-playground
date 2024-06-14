import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredients } from "../services/ingredients";

import AppError from "../components/app/app-error";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    const { request, requestError } = useSelector(state => state.burgerIngredients);
    return (
        <div className={styles.app}>
            {!request && !requestError &&
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
            {!request && requestError &&
                <AppError />
            }
        </div>
    );
}

export default Home;
