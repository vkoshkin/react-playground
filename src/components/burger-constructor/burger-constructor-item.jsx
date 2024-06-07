import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { addIngredient, removeIngredient, moveIngredient } from "../../services/constructor";

import styles from "./burger-constructor-item.module.css";
import ingredientType from "../../utils/types";

function BurgerConstructorItem(props) {
    const { id, ingredient, type, isLocked, extraClass } = props;
    let styleClasses = styles.container;
    if (extraClass !== null) {
        styleClasses += " " + extraClass;
    }
    let text = "";
    if (ingredient) {
        text = ingredient.name;
        if (type === "top") {
            text += " (верх)"
        } else if (type === "bottom") {
            text += " (низ)"
        }
    }
    const isBorderItem = type === "top" || type === "bottom";

    const dispatch = useDispatch();
    const onRemove = () => {
        if (!type) {
            dispatch(removeIngredient({ id }));
        }
    };
    const onMove = (sourceId, targetId) => {
        if (!type) {
            dispatch(moveIngredient({ sourceId, targetId }));
        }
    };
    const onAdd = (ingredientItem, targetId) => {
        const ingredient = ingredientItem.item;
        if (ingredient.type === "bun" && isBorderItem) {
            dispatch(addIngredient({ ingredient: ingredient }));
        } else if (ingredient.type !== "bun" && !isBorderItem) {
            dispatch(addIngredient({ ingredient: ingredient, targetId: targetId }));
        }
    };

    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: "ingredient",
        item: { id: id, item: ingredient },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });
    const [{ isHover }, drop] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.id;
            const hoverIndex = id;
            if (dragIndex === hoverIndex) return;
            console.log(`hover ${hoverIndex} drag ${dragIndex}`);
            if (dragIndex === undefined) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            onMove(dragIndex, hoverIndex);
        },
        drop(item, monitor) {
            if (item.id === undefined) {
                onAdd(item, id);
            }
        },
    });

    const opacity = isDragging ? 0 : 1;
    const empty = isHover ? `${styles.element_empty} ${styles.element_empty_hover}` : styles.element_empty;
    const emptyText = isBorderItem ? "Добавьте булку" : "Добавьте ингредиент";
    drag(drop(ref));
    return (
        <div className={styleClasses} style={{ opacity }} ref={ref}>
            {!isLocked &&
                <div className={styles.drag}>
                    <DragIcon type="primary" />
                </div>
            }
            {ingredient &&
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={text}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    extraClass={styles.element}
                    handleClose={onRemove}
                />
            }
            {!ingredient &&
                <div className={empty}>
                    <div className={styles.element_empty_container}>
                        <span>{emptyText}</span>
                    </div>
                </div>
            }
        </div>
    );
}

BurgerConstructorItem.propTypes = {
    id: PropTypes.string,
    ingredient: ingredientType,
    index: PropTypes.number,
    type: PropTypes.string,
    isLocked: PropTypes.bool.isRequired,
    extraClass: PropTypes.string,
};

export default BurgerConstructorItem;
