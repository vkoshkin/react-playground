import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

class AppHeader extends React.Component {

    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div>
                        <a className={styles.anchor} href="/">
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default pl-2">Конструктор</span>
                        </a>
                    </div>

                    <div className="ml-2">
                        <a className={styles.anchor} href="/">
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">Лента заказов</span>
                        </a>
                    </div>
                </nav>

                <Logo />

                <div className={styles.personal}>
                    <div>
                        <a className={styles.anchor} href="/">
                            <ProfileIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</span>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;
