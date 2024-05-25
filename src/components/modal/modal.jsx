import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
    const { header, onClose } = props;
    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <span className={styles.header_text}>
                    {header}
                </span>
                <div className={styles.close}>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
            </div>
        </div>
    );
}

export default Modal;
