import React from 'react';

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
	}, []);

    return (
        <section className={styles.overlay} onClick={onClose}>
            {children}
        </section>
    );
}

export default ModalOverlay;
