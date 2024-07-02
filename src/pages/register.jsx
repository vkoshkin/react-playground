import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../services/user";
import { useForm } from "../hooks/useForm";
import styles from "./register.module.css";

function Register() {
    const { user, registerRequest, registerError } = useSelector(store => store.user);
    const { values, handleChange } = useForm({ name: "", email: "", password: "" });

    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(registerUser(values.name, values.email, values.password));
    };

    if (user != null) {
        return <Navigate to={"/"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Регистрация</h1>
            <form onSubmit={onSubmit}>
                <Input
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    onChange={e => handleChange(e)}
                    extraClass={styles.field}
                />
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
                {registerError &&
                    <div className={styles.error_pane}>
                        <p className={styles.error}>Не удалось зарегистрироваться</p>
                    </div>
                }
                <div className={styles.button}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={registerRequest}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className={styles.sub}>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </section>
    );
}

export default Register;
