import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { updatePassword } from "../services/password";
import styles from "./reset-password.module.css";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState();

    const { passwordUpdateRequest, passwordUpdateError, passwordUpdateSuccess } = useSelector(store => store.password);
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(updatePassword(password, code));
    };
    if (passwordUpdateSuccess) {
        return <Navigate to={"/login"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <form action={onSubmit}>
                <PasswordInput
                    placeholder="Введите новый пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    extraClass={styles.field}
                />
                <Input
                    placeholder="Введите код из письма"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    extraClass={styles.field}
                />
                {passwordUpdateError &&
                    <div className={styles.error_pane}>
                        <p className={styles.error}>Не удалось обновить пароль</p>
                    </div>
                }
                <div className={styles.button}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={passwordUpdateRequest}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
            <p className={styles.sub}>
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ResetPassword;
