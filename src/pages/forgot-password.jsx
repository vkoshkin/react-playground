import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./register.module.css";

function ForgotPassword(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section>
                    <h1 className={styles.header}>Восстановление пароля</h1>
                    <EmailInput placeholder="Укажите e-mail" extraClass={styles.email}/>
                    <div className={styles.button}>
                        <Button htmlType="button" type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                    <p className={styles.sub}>Вспомнили пароль? Войти</p>
                </section>
            </main>
        </div>
    );
}

export default ForgotPassword;
