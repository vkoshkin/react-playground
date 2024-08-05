import { FC } from "react"

import styles from "./ingredient-preview.module.css";

interface IngredientPreviewProps {
    readonly image: string;
    readonly altName: string;
    readonly zIndex?: number;
    readonly topText?: string;
    readonly extraClass?: string;
};

const IngredientPreview: FC<IngredientPreviewProps> = ({ image, altName, zIndex, topText, extraClass }) => {
    let style = {};
    if (zIndex) {
        style = { zIndex: zIndex };
    }
    let className = styles.ingredient;
    if (extraClass) {
        className += " " + extraClass;
    }
    return (
        <div
            className={className}
            style={style}
        >
            <img
                className={styles.ingredient_image}
                src={image}
                alt={altName}
            />
            {topText &&
                <div className={styles.more}>
                    <p className={styles.text}>
                        {topText}
                    </p>
                </div>
            }
        </div>
    );
};

export default IngredientPreview;
