import PropTypes from 'prop-types';

import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

function Modal(props) {
    const { header, children, onClose } = props;
    return (
        <ModalOverlay onClose={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <p className={styles.header_text}>{header}</p>
                    <div className={styles.close}>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
