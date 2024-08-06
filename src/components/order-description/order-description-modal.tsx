import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../modal/modal";
import OrderDescription from "./order-description";

export const OrderDescriptionModal: FC = () => {
    const navigate = useNavigate();
    const onDismiss = () => {
        navigate(-1);
    };
    
    return (
        <Modal onClose={onDismiss}>
            <OrderDescription />
        </Modal>
    );
}

export default OrderDescriptionModal;
