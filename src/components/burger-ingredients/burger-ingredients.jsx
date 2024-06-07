import { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
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

    const [state, setState] = useState("buns");

    const tabRef = useRef(null);
    const bunsHeaderRef = useRef(null);
    const saucesHeaderRef = useRef(null);
    const mainsHeaderRef = useRef(null);
    const scrollHandler = (e) => {
        const tabs = tabRef.current;
        const tabsBottom = tabs.getBoundingClientRect().bottom;
        
        const bunsHeader = bunsHeaderRef.current.getBoundingClientRect().top;
        const saucesHeader = saucesHeaderRef.current.getBoundingClientRect().top;
        const mainsHeader = mainsHeaderRef.current.getBoundingClientRect().top;

        if (mainsHeader <= tabsBottom) {
            setState("mains");
        } else if (saucesHeader <= tabsBottom) {
            setState("sauces");
        } else if (bunsHeader <= tabsBottom) {
            setState("buns");
        }
    };

    const scrollToBuns = () => bunsHeaderRef.current.scrollIntoView();
    const scrollToSauces = () => saucesHeaderRef.current.scrollIntoView();
    const scrollToMains = () => mainsHeaderRef.current.scrollIntoView();

    return (
        <div className={styles.ingredients}>
            <h1 className={styles.header}>Собери бургер</h1>

            <nav className={styles.tabs} ref={tabRef}>
                <Tab value="buns" active={state === "buns"} onClick={scrollToBuns}>
                    Булки
                </Tab>
                <Tab value="sauces" active={state === "sauces"} onClick={scrollToSauces}>
                    Соусы
                </Tab>
                <Tab value="mains" active={state === "mains"} onClick={scrollToMains}>
                    Начинка
                </Tab>
            </nav>

            <div className={styles.sections} onScroll={scrollHandler}>
                <section>
                    <h2 className={styles.section_header} ref={bunsHeaderRef}>
                        Булки
                    </h2>
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
                    <h2 className={styles.section_header} ref={saucesHeaderRef}>
                        Соусы
                    </h2>
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
                    <h2 className={styles.section_header} ref={mainsHeaderRef}>
                        Начинки
                    </h2>
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
