import {useState} from 'react';

const UseModals = () => {

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
    const openConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true);
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
    }

    const openValidationModal = () => {
        setIsValidationModalOpen(true);
    }

    const closeValidationModal = () => {
        setIsValidationModalOpen(false);
    }

    return {
        isConfirmDeleteModalOpen,
        isValidationModalOpen,
        openConfirmDeleteModal,
        openValidationModal,
        closeConfirmDeleteModal,
        closeValidationModal,
    }
};

export default UseModals;