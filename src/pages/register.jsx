import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register.module.css";

function Register(props) {
    return (
        <section>
            <h1 className={styles.header}>Регистрация</h1>
            <Input placeholder="Имя" extraClass={styles.name} />
            <EmailInput placeholder="E-mail" extraClass={styles.email} />
            <PasswordInput placeholder="Пароль" extraClass={styles.password} />
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </div>
            <p className={styles.sub}>Уже зарегистрированы? Войти</p>
        </section>
    );
}

export default Register;
