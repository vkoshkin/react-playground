import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./register.module.css";

function Register(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section>
                    <h1 className={styles.register_header}>Регистрация</h1>
                    <Input placeholder="Имя" extraClass={styles.register_name} />
                    <EmailInput placeholder="E-mail" extraClass={styles.register_email}/>
                    <PasswordInput placeholder="Пароль" extraClass={styles.register_password}/>
                    <div className={styles.register_button}>
                        <Button htmlType="button" type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </div>
                    <p className={styles.register_login}>Уже зарегистрированы? Войти</p>
                </section>
            </main>
        </div>
    );
}

export default Register;
