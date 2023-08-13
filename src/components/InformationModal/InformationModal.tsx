import React from 'react';
import {ReusableModal} from '../ReusableModal/ReusableModal';
import {TbAlertTriangle} from 'react-icons/tb';

interface InformationModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    text: string;
}

export const InformationModal = ({
                                     isOpen,
                                     onRequestClose,
                                     onConfirm,
                                     text,
                                 }: InformationModalProps) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onConfirm={onConfirm}
            text={text}
            icon={TbAlertTriangle}
            confirmText="Rozumiem"
        />
    );
};