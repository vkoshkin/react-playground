import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends React.Component {

    render() {
        return (
            <header>
                <nav className={styles.nav}>
                    <div className={styles.menu_group}>
                        <div>
                            <a className={styles.anchor} href="/">
                                <BurgerIcon type="primary" />
                                <span className="text text_type_main-default pl-2">
                                    Конструктор
                                </span>
                            </a>
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
                            <a className={styles.anchor} href="/">
                                <ProfileIcon type="secondary" />
                                <span className="text text_type_main-default text_color_inactive pl-2">
                                    Личный кабинет
                                </span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default AppHeader;
