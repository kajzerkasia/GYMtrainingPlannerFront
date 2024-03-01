import { useState } from 'react';

export const useDemoModal = () => {
    const [demoModalIsOpen, setDemoModalIsOpen] = useState<boolean>(false);

    const openDemoModal = () => {
        setDemoModalIsOpen(true);
    }

    const closeDemoModal = () => {
        setDemoModalIsOpen(false);
    };

    return {
        demoModalIsOpen,
        setDemoModalIsOpen,
        closeDemoModal,
        openDemoModal
    };
};