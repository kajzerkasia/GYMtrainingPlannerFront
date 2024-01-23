import { useState } from 'react';

export const UseModal = () => {
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);
    const [demoModalIsOpen, setDemoModalIsOpen] = useState<boolean>(false);

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const closeDemoModal = () => {
        setDemoModalIsOpen(false);
    };

    return {
        informationModalIsOpen,
        demoModalIsOpen,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeModal,
        closeDemoModal,
    };
};