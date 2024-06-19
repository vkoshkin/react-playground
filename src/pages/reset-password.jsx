import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "./reset-password.module.css";

function ResetPassword(props) {
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <PasswordInput placeholder="Введите новый пароль" extraClass={styles.password} />
            <Input placeholder="Введите код из письма" extraClass={styles.name} />
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
            <p className={styles.sub}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </section>
    );
}

export default ResetPassword;
