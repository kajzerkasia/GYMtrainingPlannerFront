import React, {ReactNode} from 'react';
import {TbAlertTriangle} from "react-icons/tb";
import Modal from "../Modal/Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import UseModals from "../../hooks/useModals";
import ItemsList from "./ItemsList";

interface TableElementsProps {
    children?: ReactNode;
    handleUpdate: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    handleDelete: () => void;
    availableFields: (keyof Record<string, any>)[];
}

const TableElements = ({handleUpdate, handleDelete, availableFields}: TableElementsProps) => {

    const {
        isConfirmDeleteModalOpen,
        isValidationModalOpen,
        closeValidationModal,
        closeConfirmDeleteModal,
    } = UseModals();

    const handleConfirmDelete = async () => {
        handleDelete();
    };

    return (
        <>
            <Modal
                open={isConfirmDeleteModalOpen}
                onClose={closeConfirmDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirmDeleteModal}
                modalText={text}
                confirmText="Tak"
                cancelText="Nie"
                icon={TbAlertTriangle}
            />
            <Modal
                open={isValidationModalOpen}
                onClose={closeValidationModal}
                onCancel={closeValidationModal}
                modalText={textInformation}
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <ItemsList
                availableFields={availableFields}
                handleUpdate={handleUpdate}
            />
        </>
    );
};

export default TableElements;