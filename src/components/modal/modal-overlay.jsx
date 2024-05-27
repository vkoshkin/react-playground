import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
    const { children, onClose } = props;
    React.useEffect(() => {
        const trackKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", trackKeyDown);
        return () => {
            document.removeEventListener("keydown", trackKeyDown);
        }
    }, [onClose]);
    return (
        <section className={styles.overlay} onClick={(e) => { e.stopPropagation(); onClose(); }}>
            {children}
        </section>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
