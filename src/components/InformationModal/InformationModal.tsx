import Modal from "react-modal";

import './InformationModal.css'

import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import React from "react";

Modal.setAppElement('#root');

// TODO: Zrobić typy dla propsów poniżej

export const InformationModal = ({isOpen, onRequestClose, onConfirm, text}: any) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="parts-modal"
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