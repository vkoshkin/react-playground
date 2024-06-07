import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient, moveIngredient } from "../../services/constructor";

import styles from "./burger-constructor-item.module.css";
import ingredientType from "../../utils/types";

function BurgerConstructorItem(props) {
    const { id, ingredient, type, isLocked, extraClass } = props;
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

    const dispatch = useDispatch();
    const onRemove = (ingredient, id) => {
        if (!type) {
            dispatch(removeIngredient({ ingredient, id }));
        }
    };
    const onMove = (sourceId, targetId) => {
        if (!type) {
            dispatch(moveIngredient({ sourceId, targetId }));
        }
    };

    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: "constructorItem",
        item: { id: id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });
    const [{ handlerId }, drop] = useDrop({
        accept: "constructorItem",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.id;
            const hoverIndex = id;
            if (!hoverIndex) {
                return
            }
            if (dragIndex === hoverIndex) {
                return
            }
            console.log(`hover ${hoverIndex} drag ${dragIndex}`);
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
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div className={styleClasses} style={{ opacity }} ref={ref}>
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
    id: PropTypes.string,
    ingredient: ingredientType,
    index: PropTypes.number,
    type: PropTypes.string,
    isLocked: PropTypes.bool.isRequired,
    extraClass: PropTypes.string,
};

export default BurgerConstructorItem;
