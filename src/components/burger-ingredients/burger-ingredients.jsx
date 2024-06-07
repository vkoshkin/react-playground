import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "./burger-ingredients-item"
import styles from "./burger-ingredients.module.css";

function BurgerIngredients(props) {
    const { buns, sauces, mains } = useSelector(state => state.burgerIngredients);
    const { bun, ingredients } = useSelector(state => state.burgerConstructor);

    const ingredientCount = useMemo(() => {
        const counts = {};
        if (bun !== null) {
            counts[bun._id] = 1;
        }
        for (const ingredient of ingredients) {
            if (!counts[ingredient._id]) {
                counts[ingredient._id] = 1;
            } else {
                counts[ingredient._id] += 1;
            }
        }
        return counts;
    }, [bun, ingredients]);

    const [state, setState] = useState({
        currentTab: "buns",
    });

    return (
        <div className={styles.ingredients}>
            <h1 className={styles.header}>Собери бургер</h1>

            <nav className={styles.tabs}>
                <Tab value="buns" active={state.currentTab === "buns"} >
                    Булки
                </Tab>
                <Tab value="sauces" active={state.currentTab === "sauces"} >
                    Соусы
                </Tab>
                <Tab value="mains" active={state.currentTab === "mains"} >
                    Начинка
                </Tab>
            </nav>

            <div className={styles.sections}>
                <section>
                    <h2 className={styles.section_header}>Булки</h2>
                    <div className={styles.section_container}>
                        {buns.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount[ingredient._id]} />
                        )}
                    </div>
                </section>

                <section>
                    <h2 className={styles.section_header}>Соусы</h2>
                    <div className={styles.section_container}>
                        {sauces.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount[ingredient._id]} />
                        )}
                    </div>
                </section>

                <section>
                    <h2 className={styles.section_header}>Начинки</h2>
                    <div className={styles.section_container}>
                        {mains.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount[ingredient._id]} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BurgerIngredients;
