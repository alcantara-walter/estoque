import styles from './Container.module.css';
import React from 'react';

function Container({ darkMode, children }) {

    const containerClass = darkMode ? styles.darkMode : styles.lightMode;
    return (
        <div className={styles.centralizar}>
            <main className={`${styles.container} ${containerClass}`}>
                {children}
            </main>
        </div>
    );
}

export default Container