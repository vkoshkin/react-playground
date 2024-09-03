import { FC } from "react";

import styles from "./app-error.module.css";
import error from "../../images/error.gif";

export const AppError: FC = () => {
    return (
        <div className={styles.error} data-testid="error">
            <p className={styles.header}>Ошибка на бекенде, нам очень жаль</p>
            <p className={styles.text}>Это наш бекендер</p>
            <img src={error} alt="Бекендер" />
            <p className={styles.text}>Перезапустите страницу, может быть это поможет</p>
        </div>
    );
}

export default AppError;
