import { FC, ReactNode } from "react";

import styles from "./modal-overlay.module.css";

export interface ModalOverlayProps {
    readonly onClose: () => void;
    readonly children?: ReactNode;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({onClose, children}) => {
    return (
        <section className={styles.overlay} onClick={(e) => { e.stopPropagation(); onClose(); }}>
            {children}
        </section>
    );
}

export default ModalOverlay;
