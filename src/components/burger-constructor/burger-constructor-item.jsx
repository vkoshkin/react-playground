import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-item.module.css";
import ingredientType from "../../utils/types";

function BurgerConstructorItem(props) {
    const { ingredient, type, isLocked, extraClass, onRemove } = props;
    let styleClasses = styles.container;
    if (extraClass !== null) {
        styleClasses += " " + extraClass;
    }
    let text = ingredient.name;
    if (type === "top") {
        text += " (верх)"
    } else if (type === "bottom") {
        text += " (низ)"
    }

    return (
        <div className={styleClasses}>
            {!isLocked &&
                <div className={styles.drag}>
                    <DragIcon type="primary" />
                </div>
            }
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={ingredient.price}
                thumbnail={ingredient.image}
                extraClass={styles.element}
                handleClose={onRemove}
            />
        </div>
    );
}

BurgerConstructorItem.propTypes = {
    ingredient: ingredientType,
    index: PropTypes.number,
    type: PropTypes.string,
    isLocked: PropTypes.bool.isRequired,
    extraClass: PropTypes.string,
    onRemove: PropTypes.func,
};

export default BurgerConstructorItem;
