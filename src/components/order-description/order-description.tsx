import { FC, useMemo } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { useTypedSelector } from "../../services/store";
import { Ingredient } from "../../services/types";
import OrderDescriptionItem from "./order-description-item";
import Price from "../price/price";
import styles from "./order-description.module.css";

const OrderDescription: FC = () => {
    const { selectedOrder } = useTypedSelector(state => state.order);
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);

    const orderDate: Date = useMemo(() => {
        if (selectedOrder) {
            const time = Date.parse(selectedOrder.updatedAt);
            return new Date(time);
        }
        return new Date();
    }, [selectedOrder]);

    const price: number = useMemo(() => {
        if (!selectedOrder) return 0;
        let price = 0;
        for (const ingredientId of selectedOrder.ingredients) {
            if (!ingredients.hasOwnProperty(ingredientId)) {
                // fixme how to handle this one?
                console.log("wtf?");
            } else {
                price += ingredients[ingredientId].price;
            }
        }
        return price;
    }, [selectedOrder, ingredients]);

    const displayedIngredients: Map<Ingredient, number> = useMemo(() => {
        const resultMap = new Map<Ingredient, number>();
        if (!selectedOrder) return resultMap;
        for (const ingredientId of selectedOrder.ingredients) {
            const ingredient = ingredients[ingredientId];
            if (resultMap.has(ingredient)) {
                resultMap.set(ingredient, resultMap.get(ingredient)! + 1);
            } else {
                resultMap.set(ingredient, 1);
            }
        }
        return resultMap;
    }, [selectedOrder, ingredients]);

    return (
        <div className={styles.desc}>
            {selectedOrder &&
                <>
                    <h1 className={styles.order_number}>
                        #{selectedOrder.number}
                    </h1>
                    <section className={styles.order_name_status}>
                        <h2 className={styles.order_name}>
                            {selectedOrder.name}
                        </h2>
                        {selectedOrder.status === "done" &&
                            <p className={styles.status_text_finished}>
                                Выполнен
                            </p>
                        }
                        {selectedOrder.status === "pending" &&
                            <p className={styles.status_text}>
                                В работе
                            </p>
                        }
                    </section>
                    <section className={styles.order_ingredients}>
                        <h2 className={styles.order_ingredients_header}>
                            Состав:
                        </h2>
                        <div className={styles.order_ingredients_scroll}>
                            <ul className={styles.order_ingredients_list}>
                                {Array.from(displayedIngredients).map(([ingredient, count]) =>
                                    <li key={ingredient._id}>
                                        <OrderDescriptionItem ingredient={ingredient} count={count}/>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </section>
                    <div className={styles.order_footer}>
                        <FormattedDate
                            date={orderDate}
                            className={styles.order_date}
                        />
                        <Price price={price} />
                    </div>
                </>
            }
        </div>
    );
}

export default OrderDescription;
