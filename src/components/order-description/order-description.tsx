import { FC, useMemo } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { useTypedSelector } from "../../services/store";
import { Ingredient } from "../../services/types";
import OrderDescriptionItem from "./order-description-item";
import Price from "../price/price";
import styles from "./order-description.module.css";

const OrderDescription: FC = () => {
    const { selectedOrder } = useTypedSelector(state => state.commonFeed);
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

    const displayedIngredients: Array<Ingredient> = useMemo(() => {
        if (!selectedOrder) return [];
        const displayedResult: Array<Ingredient> = [];
        for (const ingredientId of selectedOrder.ingredients) {
            displayedResult.push(ingredients[ingredientId]);
        }
        return displayedResult;
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
                        <p className={styles.order_status}>
                            Выполнен
                        </p>
                    </section>
                    <section className={styles.order_ingredients}>
                        <h2 className={styles.order_ingredients_header}>
                            Состав:
                        </h2>
                        <div className={styles.order_ingredients_scroll}>
                            <ul className={styles.order_ingredients_list}>
                                {displayedIngredients.map(ingredient => 
                                    <li key={ingredient._id}>
                                        <OrderDescriptionItem ingredient={ingredient} />
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
