import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
    const { children, onClose } = props;
	const trackKeyDown = (e) => {
	    if (e.key === "Escape") {
            onClose();
        }
	};
    React.useEffect(()=>{
	    document.addEventListener("keydown", trackKeyDown);
	    return () => {
		    document.removeEventListener("keydown", trackKeyDown);
	    }
	});
    return (
        <section className={styles.overlay} onClick={onClose}>
            {children}
        </section>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
