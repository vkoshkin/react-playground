import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modals");

function Modal(props) {
    const { header, children, onClose } = props;
    useEffect(() => {
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
        ReactDOM.createPortal(
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
            </ModalOverlay>,
            modalRoot
        )
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
