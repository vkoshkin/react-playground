import { useState, useCallback } from "react";

type TModalController = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const useModal = (): TModalController => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
};
