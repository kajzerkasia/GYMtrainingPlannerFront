import React from "react";
import Modal from "react-modal";
import './CalendarModal.css'
import {BasicCalendar} from "../BasicCalendar/BasicCalendar";

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
            <p>Kliknij w dany dzień ay dodać określony trening.</p>
            <div style={{ height: "90vh"}} className="div-calendar">
                <BasicCalendar/>
            </div>
            <div className="div-btn-back-container">
                <button className="btn-back" onClick={onCancel}>Powrót</button>
            </div>
        </Modal>
    );
};