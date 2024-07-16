import { FC, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../services/user";
import { useAppDispatch, useTypedSelector } from "../services/store";
import { useForm } from "../hooks/useForm";
import styles from "./login.module.css";

type MailPassword = {
    email: string;
    password: string;
}

export const Login: FC<{}> = () => {
    const { loginRequest, loginError } = useTypedSelector(store => store.user);
    const { values, handleChange } = useForm<MailPassword>({ email: "", password: "" });
    const dispatch = useAppDispatch();
    const onSubmit: FormEventHandler = e => {
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
