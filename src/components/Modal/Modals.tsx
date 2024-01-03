import React from 'react';
import Modal from "./Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import {TbAlertTriangle} from "react-icons/tb";
import {demoText} from "../../constants/demoText";
import {useModal} from "../../hooks/useModal";

const Modals = ({confirmDeleteItem, handleCancelDelete, handleConfirmDelete}: any) => {


    const {demoModalIsOpen, closeDemoModal, informationModalIsOpen, closeModal} = useModal();
    return (

        <>
            <Modal
                open={confirmDeleteItem}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
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