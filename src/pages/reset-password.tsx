import { FC, FormEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { updatePassword } from "../services/password";
import styles from "./reset-password.module.css";
import { useForm } from "../hooks/useForm";

type ResetPasswordData = {
    password: string;
    code: string;
};

export const ResetPassword : FC<void> = () => {
    const { 
        passwordUpdateRequest, 
        passwordUpdateError, 
        passwordUpdateSuccess 
    } = useTypedSelector(store => store.password);
    const dispatch = useAppDispatch();

    const { values, handleChange } = useForm<ResetPasswordData>({ password: "", code: "" });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(values.password, values.code));
    };
    if (passwordUpdateSuccess) {
        return <Navigate to={"/login"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <form onSubmit={onSubmit}>
                <PasswordInput
                    placeholder="Введите новый пароль"
                    name="password"
                    value={values.password}
                    onChange={e => handleChange(e)}
                    extraClass={styles.field}
                />
                <Input
                    placeholder="Введите код из письма"
                    name="code"
                    value={values.code}
                    onChange={e => handleChange(e)}
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}
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
