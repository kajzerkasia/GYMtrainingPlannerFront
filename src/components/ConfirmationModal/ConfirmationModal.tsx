import Modal from "react-modal";

import './ConfirmationModal.css'

import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import React from "react";

Modal.setAppElement('#root');

export type ConfirmationModalProps = {
    isOpen: boolean;
    onRequestClose: () => void | Promise<void>;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void | Promise<void>;
    text: string;
};

export const ConfirmationModal = ({isOpen, onRequestClose, onConfirm, onCancel, text}: ConfirmationModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="information-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1200}
        >
            <h2>{text}</h2>
            <IconContext.Provider value={{className: 'icon-modal'}}>
                <TbAlertTriangle/>
            </IconContext.Provider>
            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Tak</button>
                <button className="btn-decline" onClick={onCancel}>Nie</button>
            </div>
        </Modal>
    );
};