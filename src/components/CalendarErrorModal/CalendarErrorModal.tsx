import React from 'react';
import {ReusableModal} from '../ReusableModal/ReusableModal';
import {TbAlertTriangle} from 'react-icons/tb';
import './CalendarErrorModal.css';

interface CalendarErrorModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    text: string;
}

export const CalendarErrorModal = ({
                                       isOpen,
                                       onRequestClose,
                                       onConfirm,
                                       text,
                                   }: CalendarErrorModalProps) => {
    return (
        <div className={`calendar-error-modal-container ${isOpen ? "open" : ""}`}>
            <ReusableModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                onConfirm={onConfirm}
                text={text}
                icon={TbAlertTriangle}
                confirmText="OK"
            />
        </div>
    );
};