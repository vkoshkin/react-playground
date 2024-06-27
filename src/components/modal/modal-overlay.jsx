import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

function ModalOverlay(props) {
    const { children, onClose } = props;
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
