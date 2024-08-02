import { FC } from "react"

import styles from "./ingredient-image.module.css";

interface IngredientImageProps {
    readonly image: string;
    readonly altName: string;
    readonly zIndex?: number;
    readonly topText?: string
};

const IngredientImage: FC<IngredientImageProps> = ({ image, altName, zIndex, topText }) => {
    let style = {};
    if (zIndex) {
        style = { zIndex: zIndex };
    }
    return (
        <div
            className={styles.ingredient}
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

export default IngredientImage;
