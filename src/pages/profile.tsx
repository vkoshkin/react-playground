import { FC, FormEventHandler, useEffect, useState } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { User } from "../services/types";
import { updateUserProfile } from "../services/user";
import { useForm } from "../hooks/useForm";
import styles from "./profile.module.css";

const Profile: FC = () => {
    const { user, updateRequest, updateError } = useTypedSelector(store => store.user);

    const { values, handleChange, setValues } = useForm<User>({ name: user!.name, email: user!.email });
    const [changed, setChanged] = useState<boolean>(false);
    useEffect(() => {
        setChanged(values.name !== user!.name || values.email !== user!.email);
    }, [user, values])

    const dispatch = useAppDispatch();
    const onSubmit: FormEventHandler = e => {
        e.preventDefault();
        dispatch(updateUserProfile(values.name, values.email));
    };
    const onCancel = () => {
        setValues({ name: user!.name, email: user!.email });
    };
    return (
        <form onSubmit={onSubmit}>
            <Input
                placeholder="Имя"
                name="name"
                value={values.name}
                icon={"EditIcon"}
                onChange={e => { handleChange(e); } }
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                extraClass={styles.field}
            />
            <EmailInput
                placeholder="Логин"
                name="email"
                value={values.email}
                onChange={e => { handleChange(e) }}
                isIcon={true}
                extraClass={styles.field}
            />
            <PasswordInput
                placeholder="Пароль"
                value="ты не имеешь права, о ты не имеешь права"
                onChange={() => { }}
                disabled
                icon={"HideIcon"}
                extraClass={styles.field}
            />
            {updateError &&
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
                        disabled={updateRequest}
                    >
                        Сохранить
                    </Button>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={onCancel}
                        disabled={updateRequest}
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
