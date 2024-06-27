import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { saveUser } from "../services/user";
import { useForm } from "../hooks/useForm";
import styles from "./profile.module.css";

function Profile() {
    const { user, saveRequest, saveRequestError } = useSelector(store => store.user);

    const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email });
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        setChanged(values.name !== user.name || values.email !== user.email);
    }, [user, values])

    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        dispatch(saveUser(values.name, values.email));
    };
    const onCancel = () => {
        setValues(user.name, user.email);
    };
    return (
        <form onSubmit={onSubmit}>
            <Input
                placeholder="Имя"
                name="name"
                value={values.name}
                onChange={e => { handleChange(e) }}
                icon={"EditIcon"}
                extraClass={styles.field}
            />
            <EmailInput
                placeholder="Логин"
                name="email"
                value={values.email}
                onChange={e => { handleChange(e) }}
                icon={"EditIcon"}
                isIcon={true}
                extraClass={styles.field}
            />
            <PasswordInput
                placeholder="Пароль"
                value="ты не имеешь права, о ты не имеешь права"
                onChange={() => { }}
                disabled
                icon={""}
                extraClass={styles.field}
            />
            {saveRequestError &&
                <div className={styles.error_pane}>
                    <p className={styles.error}>Ошибка сохранения пользователя</p>
                </div>
            }
            {changed &&
                <div className={styles.buttons}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
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
        </form>
    );
}

export default Profile;
