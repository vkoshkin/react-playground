import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "./register.module.css";

function ForgotPassword(props) {
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <EmailInput placeholder="Укажите e-mail" extraClass={styles.email} />
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
            <p className={styles.sub}>
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
