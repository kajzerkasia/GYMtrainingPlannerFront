import {useState} from "react";

const UseConfirmDeleteModal = () => {

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const openConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    }

    return {
        isConfirmDeleteModalOpen,
        openConfirmDeleteModal,
        closeConfirmDeleteModal,
    }
};

export default UseConfirmDeleteModal;