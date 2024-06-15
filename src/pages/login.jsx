import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";

function Login(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section>
                    <h1 className={styles.login_header}>Вход</h1>
                    <EmailInput placeholder="E-mail" extraClass={styles.login_email}/>
                    <PasswordInput placeholder="Пароль" extraClass={styles.login_password}/>
                    <div className={styles.login_button}>
                        <Button htmlType="button" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                    <p className={styles.login_register}>Вы новый пользователь? Зарегистрироваться</p>
                    <p className={styles.login_reset}>Забыли пароль? Восстановить пароль</p>
                </section>
            </main>
        </div>
    );
}

export default Login;
