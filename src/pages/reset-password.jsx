import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./reset-password.module.css";

function ResetPassword(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section>
                    <h1 className={styles.header}>Восстановление пароля</h1>
                    <PasswordInput placeholder="Введите новый пароль" extraClass={styles.password}/>
                    <Input placeholder="Введите код из письма" extraClass={styles.name} />
                    <div className={styles.button}>
                        <Button htmlType="button" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                    <p className={styles.sub}>Вспомнили пароль? Войти</p>
                </section>
            </main>
        </div>
    );
}

export default ResetPassword;