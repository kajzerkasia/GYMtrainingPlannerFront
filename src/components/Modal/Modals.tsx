import React from 'react';
import Modal from "./Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import {TbAlertTriangle} from "react-icons/tb";
import {demoText} from "../../constants/demoText";
import {UseModal} from "../../hooks/useModal";

interface ModalsProps {
    confirmDeleteItem: boolean;
    handleConfirmDelete: () => void;
}

const Modals = ({confirmDeleteItem, handleConfirmDelete}: ModalsProps) => {


    const {demoModalIsOpen, closeDemoModal, informationModalIsOpen, closeModal} = UseModal();
    return (

        <>
            <Modal
                open={confirmDeleteItem}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                onCancel={closeModal}
                modalText={text}
                confirmText="Tak"
                cancelText="Nie"
                icon={TbAlertTriangle}
            />
            <Modal
                open={informationModalIsOpen}
                onClose={closeModal}
                onConfirm={closeModal}
                modalText={textInformation}
                confirmText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <Modal
                open={demoModalIsOpen}
                onClose={closeDemoModal}
                onConfirm={closeDemoModal}
                modalText={demoText}
                confirmText="OK"
                icon={TbAlertTriangle}
            />
        </>
    );
};

export default Modals;