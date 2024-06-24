import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { updatePassword } from "../services/user";
import styles from "./reset-password.module.css";

function ResetPassword(props) {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState();

    const { passwordUpdateRequest, passwordUpdateError, passwordUpdateSuccess } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(updatePassword(password, code));
    };
    if (passwordUpdateSuccess) {
        return <Navigate to={"/login"} />
    }
    return (
        <section>
            <h1 className={styles.header}>Восстановление пароля</h1>
            <PasswordInput
                placeholder="Введите новый пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                extraClass={styles.password}
            />
            <Input
                placeholder="Введите код из письма"
                value={code}
                onChange={e => setCode(e.target.value)}
                extraClass={styles.name}
            />
            <div className={styles.button}>
                {passwordUpdateError && <p>Не удалось обновить пароль</p>}
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={onClick}
                    disabled={passwordUpdateRequest}
                >
                    Сохранить
                </Button>
            </div>
            <p className={styles.sub}>
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ResetPassword;
