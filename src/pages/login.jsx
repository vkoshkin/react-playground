import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";

function Login(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section>
                    <h1 className={styles.header}>Вход</h1>
                    <EmailInput placeholder="E-mail" extraClass={styles.email}/>
                    <PasswordInput placeholder="Пароль" extraClass={styles.password}/>
                    <div className={styles.button}>
                        <Button htmlType="button" type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                    <p className={styles.sub}>Вы новый пользователь? Зарегистрироваться</p>
                    <p className={styles.sub}>Забыли пароль? Восстановить пароль</p>
                </section>
            </main>
        </div>
    );
}

export default Login;
