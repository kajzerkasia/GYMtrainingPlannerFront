import React from 'react';
import {ReusableModal} from '../ReusableModal/ReusableModal';
import {TbAlertTriangle} from 'react-icons/tb';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    text: string;
}

export const ConfirmDeleteModal = ({
                                       isOpen,
                                       onRequestClose,
                                       onConfirm,
                                       onCancel,
                                       text,
                                   }: ConfirmDeleteModalProps) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onConfirm={onConfirm}
            onCancel={onCancel}
            text={text}
            icon={TbAlertTriangle}
            confirmText="Tak"
            cancelText="Nie"
        />
    );
};