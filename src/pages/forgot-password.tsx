import { FC, FormEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { resetPassword } from "../services/password";
import { useForm } from "../hooks/useForm";
import styles from "./register.module.css";

type ForgotPasswordData = {
    email: string;
};

export const ForgotPassword: FC<void> = () => {
    const { 
        passwordResetRequest, 
        passwordResetError, 
        passwordResetSuccess 
    } = useTypedSelector(store => store.password);
    const dispatch = useAppDispatch();

    const { values, handleChange } = useForm<ForgotPasswordData>({ email: "" });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(values.email));
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
                    name="email"
                    value={values.email}
                    onChange={e => handleChange(e)}
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
