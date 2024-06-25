import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { logoutUser } from "../services/user";
import styles from "./profile-menu.module.css";

function ProfileMenu() {
    const dispatch = useDispatch();
    const onExit = e => {
        dispatch(logoutUser());
    };
    return (
        <div className={styles.sections}>
            <nav className={styles.nav}>
                <Link to={""} className={styles.nav_link}>
                    <p className={styles.nav_text_inactive}>Профиль</p>
                </Link>
                <Link to={"orders"} className={styles.nav_link}>
                    <p className={styles.nav_text_inactive}>История заказов</p>
                </Link>
                <div className={styles.nav_link} onClick={onExit}>
                    <p className={styles.nav_exit}>Выход</p>
                </div>
                <p className={styles.nav_sub}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <section className={styles.section}>
                <Outlet />
            </section>
        </div>
    );
}

export default ProfileMenu;
