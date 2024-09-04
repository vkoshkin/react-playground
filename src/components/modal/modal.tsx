import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

const modalRoot: HTMLElement = document.getElementById("modals")!;

export interface ModalProps {
    readonly header?: string;
    readonly onClose: () => void;
    readonly children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ header, onClose, children }) => {
    useEffect(() => {
        const trackKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", trackKeyDown);
        return () => {
            document.removeEventListener("keydown", trackKeyDown);
        };
    }, [onClose]);
    return (
        ReactDOM.createPortal(
            <ModalOverlay onClose={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()} data-testid="modal">
                    {header &&
                        <div className={styles.header}>
                            <p className={styles.header_text}>{header}</p>
                            <div className={styles.close} onClick={onClose} data-testid="modal-close">
                                <CloseIcon type="primary" />
                            </div>
                        </div>
                    }
                    {!header &&
                        <div className={styles.close_detached} onClick={onClose} data-testid="modal-close">
                            <CloseIcon type="primary" />
                        </div>
                    }
                    <div>
                        {children}
                    </div>
                </div>
            </ModalOverlay>,
            modalRoot
        )
    );
}

export default Modal;
