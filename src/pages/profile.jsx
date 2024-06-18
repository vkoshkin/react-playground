import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeader from "../components/app-header/app-header";
import styles from "./profile.module.css";

function Profile(props) {
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.sections}>
                    <nav className={styles.nav}>
                        <p className={styles.nav_link}>Профиль</p>
                        <p className={styles.nav_link}>История заказов</p>
                        <p className={styles.nav_link}>Выход</p>
                        <p className={styles.nav_text}>В этом разделе вы можете изменить свои персональные данные</p>
                    </nav>
                    <section className={styles.profile}>
                        <Input placeholder="Имя" extraClass={styles.name} />
                        <EmailInput placeholder="Логин" extraClass={styles.email} />
                        <PasswordInput placeholder="Пароль" extraClass={styles.password} />
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Profile;
