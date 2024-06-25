import { useSelector } from "react-redux";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

function Profile() {
    const { user } = useSelector(store => store.user);
    return (
        <div>
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
        </div>
    );
}

export default Profile;
