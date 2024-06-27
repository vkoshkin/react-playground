import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../services/user";
import { useForm } from "../hooks/useForm";
import styles from "./login.module.css";

function Login() {
    const { loginRequest, loginError } = useSelector(store => store.user);
    const { values, handleChange } = useForm({ email: "", password: "" });
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(values.email, values.password));
    };
    return (
        <section>
            <h1 className={styles.header}>Вход</h1>
            <form onSubmit={onSubmit}>
                <EmailInput
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    onChange={e => handleChange(e)}
                    extraClass={styles.field}
                />
                <PasswordInput
                    placeholder="Пароль"
                    name="password"
                    value={values.password}
                    onChange={e => handleChange(e)}
                    extraClass={styles.field}
                />
                {loginError &&
                    <div className={styles.error_pane}>
                        <p className={styles.error}>Не удалось войти в систему</p>
                    </div>
                }
                <div className={styles.button}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={loginRequest}
                    >
                        Войти
                    </Button>
                </div>
            </form>
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
