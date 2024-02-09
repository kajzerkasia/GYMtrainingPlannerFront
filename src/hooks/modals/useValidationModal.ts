import {useState} from 'react';

const UseValidationModal = () => {

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

export default UseValidationModal;