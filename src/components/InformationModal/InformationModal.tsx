import React from "react";
import Modal from "react-modal";
import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import './InformationModal.css'

Modal.setAppElement('#root');

export type InformationModalProps = {
    isOpen: boolean;
    onRequestClose: () => void | Promise<void>;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void | Promise<void>;
    text: string;
};

export const InformationModal = ({isOpen, onRequestClose, onConfirm, text}: InformationModalProps) => {
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
                <button className="btn-confirm" onClick={onConfirm}>Rozumiem</button>
            </div>
        </Modal>
    );
};