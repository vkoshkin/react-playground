import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";

function findIngredientById(ingredients, id) {
    for (let i of ingredients) {
        if (i._id === id) {
            console.log(i);
            return i;
        }
    }
    return null;
}

function IngredientDetails(props) {
    const { id } = useParams();
    const { buns, sauces, mains } = useSelector(store => store.burgerIngredients);
    let ingredient = findIngredientById(buns, id);
    ingredient = ingredient ? ingredient : findIngredientById(sauces, id);
    ingredient = ingredient ? ingredient : findIngredientById(mains, id);
    return (
        <div className={styles.layout}>
            {ingredient &&
                <>
                    <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
                    <span className={styles.name}>{ingredient.name}</span>
                    <div className={styles.nutritional_values_list}>
                        <div className={styles.nutritional_value_item}>
                            <span className={styles.nutritional_value_desc}>Калории, ккал</span>
                            <span className={styles.nutritional_value_number}>{ingredient.calories}</span>
                        </div>
                        <div className={styles.nutritional_value_item}>
                            <span className={styles.nutritional_value_desc}>Белки, г</span>
                            <span className={styles.nutritional_value_number}>{ingredient.proteins}</span>
                        </div>
                        <div className={styles.nutritional_value_item}>
                            <span className={styles.nutritional_value_desc}>Жиры, г</span>
                            <span className={styles.nutritional_value_number}>{ingredient.fat}</span>
                        </div>
                        <div className={styles.nutritional_value_item}>
                            <span className={styles.nutritional_value_desc}>Углеводы, г</span>
                            <span className={styles.nutritional_value_number}>{ingredient.carbohydrates}</span>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default IngredientDetails;
