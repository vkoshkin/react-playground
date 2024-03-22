import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends React.Component {

    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className="p-5 mt-4 mb-4">
                        <span className={styles.anchor}>
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default pl-2">Конструктор</span>
                        </span>
                    </div>

                    <div className="p-5 mt-4 mb-4 ml-2">
                        <span className={styles.anchor}>
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span>
                        </span>
                    </div>
                </nav>

                <Logo />

                <div className={styles.personal}>
                    <div className="p-5 mt-4 mb-4">
                        <span className={styles.anchor}>
                            <ProfileIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span>
                        </span>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;
