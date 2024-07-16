import { FC } from "react";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

export const Home: FC<{}> = () => {
    return (
        <>
            <div className={styles.panel}>
                <BurgerIngredients />
            </div>
            <div className={styles.panel}>
                <BurgerConstructor />
            </div>
        </>
    );
}

export default Home;
