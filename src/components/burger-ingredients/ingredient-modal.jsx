import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details";

function IngredientModal(props) {
    const navigate = useNavigate();
    const onDismiss = () => {
        navigate(-1);
    };
    
    return (
        <Modal onClose={onDismiss}>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientModal;