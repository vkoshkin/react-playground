import { FC, useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "../../services/store";
import { addIngredient, removeIngredient, moveIngredient } from "../../services/constructor";
import { IngredientDragType, IngredientDrag } from "./burger-constructor-drag";
import { Ingredient, IngredientId } from "../../services/types";
import styles from "./burger-constructor-item.module.css";

type ConstructorItemType = "top" | "bottom" | undefined;

interface BurgerConstructorItemProps {
    readonly id?: IngredientId;
    readonly ingredient: Ingredient | null;
    readonly type?: ConstructorItemType;
    readonly isLocked: boolean;
    readonly extraClass?: string;
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({id, ingredient, type, isLocked, extraClass}) => {
    let itemStyles: string = styles.container;
    if (extraClass !== undefined) {
        itemStyles += " " + extraClass;
    }
    let text: string = "";
    if (ingredient) {
        text = ingredient.name;
        if (type === "top") {
            text += " (верх)"
        } else if (type === "bottom") {
            text += " (низ)"
        }
    }
    const isBorderItem: boolean = type === "top" || type === "bottom";

    const dispatch = useAppDispatch();
    const onRemove = () => {
        if (type === undefined && id !== undefined) {
            dispatch(removeIngredient({ id: id! }));
        }
    };
    const onMove = (sourceId: IngredientId, targetId: IngredientId) => {
        if (type === undefined) {
            dispatch(moveIngredient({ sourceId, targetId }));
        }
    };
    const onAdd = (ingredientItem: IngredientDrag, targetId: IngredientId | undefined) => {
        const ingredient = ingredientItem.item!;
        if (ingredient.type === "bun" && isBorderItem) {
            dispatch(addIngredient({ ingredient: ingredient }));
        } else if (ingredient.type !== "bun" && !isBorderItem) {
            dispatch(addIngredient({ ingredient: ingredient, targetId: targetId }));
        }
    };

    const ref = useRef<HTMLDivElement>(null);
    const ingredientDrag: IngredientDrag = { id: id, item: ingredient };
    const [{ isDragging }, drag] = useDrag({
        type: IngredientDragType,
        item: ingredientDrag,
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: (_: DragSourceMonitor) => {
            return ingredient !== null;
        }
    });
    const [{ isHover }, drop] = useDrop({
        accept: IngredientDragType,
        collect: (monitor: DropTargetMonitor) => ({
            isHover: monitor.isOver()
        }),
        hover: (item: IngredientDrag, monitor: DropTargetMonitor) => {
            if (!ref.current) return;
            const dragIndex = item.id;
            const hoverIndex = id;
            // console.log(`${dragIndex} ${hoverIndex}`);
            if (dragIndex === hoverIndex) return;
            if (!dragIndex) return;
            if (!hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()!;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            onMove(dragIndex, hoverIndex);
        },
        drop: (item: IngredientDrag, _: DropTargetMonitor) => {
            if (item.id === undefined && item.item != null) {
                onAdd(item, id);
            }
        },
    });

    const opacity = isDragging ? 0 : 1;
    const emptyStyles = isHover ? `${styles.element_empty} ${styles.element_empty_hover}` : styles.element_empty;
    const emptyText = isBorderItem ? "Добавьте булку" : "Добавьте ингредиент";
    drag(drop(ref));
    return (
        <div className={itemStyles} style={{ opacity }} ref={ref}>
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
                <div className={emptyStyles}>
                    <div className={styles.element_empty_container}>
                        <span>{emptyText}</span>
                    </div>
                </div>
            }
        </div>
    );
}

export default BurgerConstructorItem;
