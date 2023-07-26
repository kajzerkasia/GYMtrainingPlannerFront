import React from "react";
import Modal from "react-modal";
import './CalendarModal.css'

Modal.setAppElement('#root');

export type CalendarModalProps = {
    isOpen: boolean;
    onRequestClose?: () => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    text: string;
};

export const CalendarModal = ({isOpen, onRequestClose, onConfirm, onCancel, text}: CalendarModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="calendar-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1200}
        >
            <h2>{text}</h2>

            <div className="modal-buttons">
                <button className="btn-confirm" onClick={onConfirm}>Tak</button>
                <button className="btn-decline" onClick={onCancel}>Nie</button>
            </div>
        </Modal>
    );
};