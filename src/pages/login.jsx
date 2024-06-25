import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../services/user";
import styles from "./login.module.css";

function Login() {
    const { loginRequest, loginError } = useSelector(store => store.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(loginUser(email, password));
    };
    return (
        <section>
            <h1 className={styles.header}>Вход</h1>
            <EmailInput
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                extraClass={styles.field}
            />
            <PasswordInput
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                extraClass={styles.field}
            />
            {loginError &&
                <div className={styles.error_pane}>
                    <p className={styles.error}>Не удалось войти в систему</p>
                </div>
            }
            <div className={styles.button}>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                    disabled={loginRequest}
                >
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
