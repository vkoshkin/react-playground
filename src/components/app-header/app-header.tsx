import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

export const AppHeader: FC = () => {
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
                        <NavLink className={styles.anchor} to="/feed">
                            {({ isActive }) => (
                                <>
                                    <ListIcon type={isActive ? "primary" : "secondary"} />
                                    <span className={isActive ? styles.anchor_text_active : styles.anchor_text}>
                                        Лента заказов
                                    </span>
                                </>
                            )}
                        </NavLink>
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
