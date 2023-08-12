import React from "react";
import Modal from "react-modal";
import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import './DemoModal.css';

Modal.setAppElement('#root');

export type DemoModalProps = {
    isOpen: boolean;
    onRequestClose: () => void | Promise<void>;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void | Promise<void>;
    text: string;
};

export const DemoModal = ({isOpen, onRequestClose, onConfirm, onCancel, text}: DemoModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="confirmation-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1200}
        >
            <h2>{text}</h2>
            <IconContext.Provider value={{className: 'icon-modal'}}>
                <TbAlertTriangle/>
            </IconContext.Provider>
            <div className="modal-buttons">
                <button className="btn-decline" onClick={onCancel}>OK</button>
            </div>
        </Modal>
    );
};