import {useState} from 'react';

const useValidationModal = () => {

    const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

    const openValidationModal = () => {
        setIsValidationModalOpen(true);
    }

    const closeValidationModal = () => {
        setIsValidationModalOpen(false);
    }

    return {
        isValidationModalOpen,
        openValidationModal,
        closeValidationModal,
    }
};

export default useValidationModal;