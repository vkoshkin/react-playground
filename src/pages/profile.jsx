import { useState } from "react";
import { useSelector } from "react-redux";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

function Profile() {
    const { user } = useSelector(store => store.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [changed, setChanged] = useState(false);
    const dataChanged = (currName, currEmail) => {
        setChanged(currName !== user.name || currEmail !== user.email);
    };
    return (
        <div>
            <Input
                placeholder="Имя"
                value={name}
                onChange={e => { setName(e.target.value); dataChanged(e.target.value, email); }}
                icon={"EditIcon"}
                extraClass={styles.name}
            />
            <EmailInput
                placeholder="Логин"
                value={email}
                onChange={e => { setEmail(e.target.value); dataChanged(name, e.target.value); }}
                icon={"EditIcon"}
                isIcon={true}
                extraClass={styles.email}
            />
            <PasswordInput
                placeholder="Пароль"
                value="ты не имеешь права, о ты не имеешь права"
                onChange={() => { }}
                disabled
                icon={""}
                extraClass={styles.password}
            />
            {changed &&
                <div className={styles.buttons}>
                    <Button htmlType="button" type="primary" size="medium">
                        Сохранить
                    </Button>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.cancel}>
                        Отмена
                    </Button>
                </div>
            }
        </div>
    );
}

export default Profile;
