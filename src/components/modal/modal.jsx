import styles from './modal.module.css';

function Modal(props) {
    const { onClose } = props;
    return (
        <div className={styles.modal}>
            <div>I'm a modal dialog</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default Modal;
