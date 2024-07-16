import { FC, FormEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { registerUser } from "../services/user";
import { useForm } from "../hooks/useForm";
import styles from "./register.module.css";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
}

const Register: FC = () => {
    const { user, registerRequest, registerError } = useTypedSelector(store => store.user);
    const { values, handleChange } = useForm<RegisterForm>({ name: "", email: "", password: "" });

    const dispatch = useAppDispatch();
    const onSubmit: FormEventHandler = e => {
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
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
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
