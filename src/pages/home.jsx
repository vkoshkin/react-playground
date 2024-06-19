import { useSelector } from "react-redux";

import AppError from "../components/app/app-error";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

function Home() {
    const { request, requestError } = useSelector(state => state.burgerIngredients);
    return (
        <>
            {!request && !requestError &&
                <>
                    <div className={styles.panel}>
                        <BurgerIngredients />
                    </div>
                    <div className={styles.panel}>
                        <BurgerConstructor />
                    </div>
                </>
            }
            {!request && requestError &&
                <AppError />
            }
        </>
    );
}

export default Home;
