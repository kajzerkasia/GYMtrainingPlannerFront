import React from 'react';
import {ReusableModal} from '../ReusableModal/ReusableModal';
import {TbAlertTriangle} from 'react-icons/tb';

interface DemoModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    text: string;
}

export const DemoModal = ({
                              isOpen,
                              onRequestClose,
                              onConfirm,
                              text,
                          }: DemoModalProps) => {

    return (
        <ReusableModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onConfirm={onConfirm}
            text={text}
            icon={TbAlertTriangle}
            confirmText="OK"
        />
    );
};