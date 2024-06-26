import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../services/user";
import styles from "./register.module.css";

function Register() {
    const { user, registerRequest, registerError } = useSelector(store => store.user);

    const navigate = useNavigate();
    if (user != null) {
        navigate("/");
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(registerUser(name, email, password));
    };
    return (
        <section>
            <h1 className={styles.header}>Регистрация</h1>
            <form action={onSubmit}>
                <Input
                    placeholder="Имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    extraClass={styles.field}
                />
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
