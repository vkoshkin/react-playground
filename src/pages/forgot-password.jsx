import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { resetPassword } from "../services/password";
import styles from "./register.module.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { passwordResetRequest, passwordResetError, passwordResetSuccess } = useSelector(store => store.password);
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(email));
    };
    if (passwordResetSuccess) {
        return <Navigate to={"/reset-password"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <form onSubmit={onSubmit}>
                <EmailInput
                    placeholder="Укажите e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    extraClass={styles.field}
                />
                {passwordResetError &&
                    <div className={styles.error_pane}>
                        <p className={styles.error}>Не удалось восстановить пароль</p>
                    </div>
                }
                <div className={styles.button}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={passwordResetRequest}
                    >
                        Восстановить
                    </Button>
                </div>
            </form>
            <p className={styles.sub}>
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
