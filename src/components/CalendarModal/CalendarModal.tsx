import React, {useState} from "react";
import Modal from "react-modal";
import './CalendarModal.css'
import {BasicCalendar} from "../BasicCalendar/BasicCalendar";
import {Accordion} from "../Accordion/Accordion";

Modal.setAppElement('#root');

export type CalendarModalProps = {
    isOpen: boolean;
    onRequestClose?: () => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    text: string;
};

export const CalendarModal = ({ isOpen, onRequestClose, onCancel }: CalendarModalProps) => {

    const [showInstructions, setShowInstructions] = useState(true);

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="calendar-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1200}
        >
            <div className="div-calendar-info">
                <Accordion
                    title="Jak to działa?"
                    isOpen={showInstructions}
                    toggleAccordion={toggleInstructions}
                >
                <p>Kliknij w dany dzień, a następnie wybierz plan treningowy, część planu oraz planowaną godzinę ropoczęcia i zakończenia treningu. Zawsze możesz edytować dany trening klikając w niego i zmieniając jego godziny. Klikając ponownie w dany dzień bez treningu lub w istniejący trening zamykasz okno dodawnia/edytowania treningu.</p>
                </Accordion>
            </div>
            <div style={{ height: "730px"}} className="div-calendar">
                <BasicCalendar/>
            </div>
            <div className="div-btn-back-container">
                <button className="btn-back" onClick={onCancel}>Powrót</button>
            </div>
        </Modal>
    );
};

// Dodać wszędzie demo dodal przy dodawaniu, usuwanie, edytowaniu.