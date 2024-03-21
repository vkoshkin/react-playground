import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

class AppHeader extends React.Component {

    render() {
        return (
            <header className={styles.header}>
                <Logo />
            </header>
        );
    }
}

export default AppHeader;
