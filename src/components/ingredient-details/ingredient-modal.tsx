import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details";

export const IngredientModal: FC = () => {
    const navigate = useNavigate();
    const onDismiss = () => {
        navigate(-1);
    };

    return (
        <Modal
            header={"Детали ингредиента"}
            onClose={onDismiss}
        >
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientModal;
