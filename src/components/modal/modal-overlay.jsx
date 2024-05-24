import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
    const { children, onClose } = props;
    return (
        <section className={styles.overlay} onClick={onClose}>
            {children}
        </section>
    );
}

export default ModalOverlay;
