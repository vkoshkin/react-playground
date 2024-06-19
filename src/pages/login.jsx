import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "./login.module.css";

function Login(props) {
    return (
        <section>
            <h1 className={styles.header}>Вход</h1>
            <EmailInput placeholder="E-mail" extraClass={styles.email} />
            <PasswordInput placeholder="Пароль" extraClass={styles.password} />
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
            </div>
            <p className={styles.sub}>
                Вы новый пользователь? <Link to="/register">Зарегистрироваться</Link>
            </p>
            <p className={styles.sub}>
                Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
            </p>
        </section>
    );
}

export default Login;
