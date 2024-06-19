import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

function AppHeader(props) {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.menu_group}>
                    <div>
                        <NavLink className={styles.anchor} to="/">
                            {({ isActive }) => (
                                <>
                                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                    <span className={isActive ? styles.anchor_text_active : styles.anchor_text}>
                                        Конструктор
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </div>

                    <div className="ml-2">
                        <a className={styles.anchor} href="/">
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">
                                Лента заказов
                            </span>
                        </a>
                    </div>
                </div>

                <Logo />

                <div className={styles.personal}>
                    <div>
                        <NavLink className={styles.anchor} to="/profile">
                            {({ isActive }) => (
                                <>
                                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                                    <span className={isActive ? styles.anchor_text_active : styles.anchor_text}>
                                        Личный кабинет
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;
