import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { saveUser } from "../services/user";
import styles from "./profile.module.css";

function Profile() {
    const { user, saveRequest, saveRequestError } = useSelector(store => store.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        setChanged(name !== user.name || email !== user.email);
    }, [user, name, email])
    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(saveUser(name, email));
    };
    const onCancel = () => {
        setName(user.name);
        setEmail(user.email);
    };
    return (
        <div>
            <Input
                placeholder="Имя"
                value={name}
                onChange={e => { setName(e.target.value) }}
                icon={"EditIcon"}
                extraClass={styles.name}
            />
            <EmailInput
                placeholder="Логин"
                value={email}
                onChange={e => { setEmail(e.target.value) }}
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
            {saveRequestError &&
                <div>
                    <p className="text text_type_main-default">Ошибка сохранения пользователя</p>
                </div>
            }
            {changed &&
                <div className={styles.buttons}>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={onSave}
                        disabled={saveRequest}
                    >
                        Сохранить
                    </Button>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={onCancel}
                        disabled={saveRequest}
                        extraClass={styles.cancel}
                    >
                        Отмена
                    </Button>
                </div>
            }
        </div>
    );
}

export default Profile;
