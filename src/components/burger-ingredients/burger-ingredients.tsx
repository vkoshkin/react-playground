import { FC, UIEvent, useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "./burger-ingredients-item"
import styles from "./burger-ingredients.module.css";
import { useTypedSelector } from "../../services/store";

export const BurgerIngredients: FC = () => {
    const { buns, sauces, mains } = useTypedSelector(state => state.burgerIngredients);
    const { bun, ingredients } = useTypedSelector(state => state.burgerConstructor);

    const ingredientCount = useMemo<Map<string, number>>(() => {
        let countMap = new Map<string, number>();
        if (bun !== null) {
            countMap.set(bun._id, 1);
        }
        for (const ingredient of ingredients) {
            if (!countMap.has(ingredient.data._id)) {
                countMap.set(ingredient.data._id, 1);
            } else {
                let count: number = countMap.get(ingredient.data._id)!;
                countMap.set(ingredient.data._id, count + 1);
            }
        }
        return countMap;
    }, [bun, ingredients]);

    const [state, setState] = useState<string>("buns");

    const tabRef = useRef<HTMLElement>(null);
    const bunsHeaderRef = useRef<HTMLHeadingElement>(null);
    const saucesHeaderRef = useRef<HTMLHeadingElement>(null);
    const mainsHeaderRef = useRef<HTMLHeadingElement>(null);
    const scrollHandler = (_: UIEvent<HTMLElement>) => {
        const tabs = tabRef.current!;
        const tabsBottom = tabs.getBoundingClientRect().bottom;

        const bunsHeader = bunsHeaderRef.current!.getBoundingClientRect().top;
        const saucesHeader = saucesHeaderRef.current!.getBoundingClientRect().top;
        const mainsHeader = mainsHeaderRef.current!.getBoundingClientRect().top;

        if (mainsHeader <= tabsBottom) {
            setState("mains");
        } else if (saucesHeader <= tabsBottom) {
            setState("sauces");
        } else if (bunsHeader <= tabsBottom) {
            setState("buns");
        }
    };

    const scrollToBuns = () => bunsHeaderRef.current!.scrollIntoView();
    const scrollToSauces = () => saucesHeaderRef.current!.scrollIntoView();
    const scrollToMains = () => mainsHeaderRef.current!.scrollIntoView();

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
                    <ul className={styles.section_container}>
                        {buns.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount.get(ingredient._id)} />
                        )}
                    </ul>
                </section>

                <section>
                    <h2 className={styles.section_header} ref={saucesHeaderRef}>
                        Соусы
                    </h2>
                    <ul className={styles.section_container}>
                        {sauces.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount.get(ingredient._id)} />
                        )}
                    </ul>
                </section>

                <section>
                    <h2 className={styles.section_header} ref={mainsHeaderRef}>
                        Начинки
                    </h2>
                    <ul className={styles.section_container}>
                        {mains.map(ingredient =>
                            <BurgerIngredientsItem
                                key={ingredient._id}
                                ingredient={ingredient}
                                count={ingredientCount.get(ingredient._id)} />
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default BurgerIngredients;
