import ModalOverlay from '../modal/modal-overlay';
import Modal from '../modal/modal';
import styles from './burger-ingredients-modal.module.css';

function BurgerIngredientsModal(props) {
    const { ingredient, onClose } = props;
    return (
        <ModalOverlay onClose={onClose}>
            <Modal header="Детали ингредиента" onClose={onClose}>
                <div className={styles.layout}>
                    <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
                    <span className={styles.name}>{ingredient.name}</span>
                    <div className={styles.nutritional_values_list}>
                        <div className={styles.nutritional_values_item}>
                            <span className={styles.nutritional_values_desc}>Калории,ккал</span>
                            <span className={styles.nutritional_values_number}>{ingredient.calories}</span>
                        </div>
                        <div className={styles.nutritional_values_item}>
                            <span className={styles.nutritional_values_desc}>Белки, г</span>
                            <span className={styles.nutritional_values_number}>{ingredient.proteins}</span>
                        </div>
                        <div className={styles.nutritional_values_item}>
                            <span className={styles.nutritional_values_desc}>Жиры, г</span>
                            <span className={styles.nutritional_values_number}>{ingredient.fat}</span>
                        </div>
                        <div className={styles.nutritional_values_item}>
                            <span className={styles.nutritional_values_desc}>Углеводы, г</span>
                            <span className={styles.nutritional_values_number}>{ingredient.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </ModalOverlay>
    );
}

export default BurgerIngredientsModal;
