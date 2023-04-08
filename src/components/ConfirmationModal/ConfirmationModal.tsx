import Modal from "react-modal";

import './ConfirmationModal.css'

import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import React from "react";

Modal.setAppElement('#root');

export const ConfirmationModal = ({isOpen, onRequestClose, onConfirm, onCancel}: any) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="parts-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1000}
        >
            <h2>Czy na pewno chcesz usunąć tę część planu? Spowoduje to także usunięcie wszystkich ćwiczeń przypisanych do tej części planu</h2>
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