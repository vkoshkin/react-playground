import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';
import ingredientType from '../../utils/types';

function IngredientDetails(props) {
    const { ingredient, onClose } = props;
    return (
        <Modal header="Детали ингредиента" onClose={onClose}>
            <div className={styles.layout}>
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
            </div>
        </Modal>
    );
}

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
