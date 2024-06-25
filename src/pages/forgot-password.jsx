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
    const onClick = () => {
        dispatch(resetPassword(email));
    };
    if (passwordResetSuccess) {
        return <Navigate to={"/reset-password"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <EmailInput
                placeholder="Укажите e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                extraClass={styles.email}
            />
            <div className={styles.button}>
                {passwordResetError && <p>Не удалось восстановить пароль</p>}
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                    disabled={passwordResetRequest}
                >
                    Восстановить
                </Button>
            </div>
            <p className={styles.sub}>
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
