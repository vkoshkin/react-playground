import { useSelector } from "react-redux";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

function Profile() {
    const { user } = useSelector(store => store.user);
    return (
        <div className={styles.sections}>
            <nav className={styles.nav}>
                <p className={styles.nav_link}>Профиль</p>
                <p className={styles.nav_link}>История заказов</p>
                <p className={styles.nav_link}>Выход</p>
                <p className={styles.nav_text}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <section className={styles.profile}>
                <Input
                    placeholder="Имя"
                    value={user.name}
                    extraClass={styles.name}
                />
                <EmailInput
                    placeholder="Логин"
                    value={user.email}
                    extraClass={styles.email}
                />
                <PasswordInput
                    placeholder="Пароль"
                    value="**********"
                    extraClass={styles.password}
                />
            </section>
        </div>
    );
}

export default Profile;
