import PropTypes from 'prop-types';

import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
    const { header, children, onClose } = props;
    return (
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.header}>
                <p className={styles.header_text}>{header}</p>
                <div className={styles.close}>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
