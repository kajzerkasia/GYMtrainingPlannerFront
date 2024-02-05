import React, {useState} from "react";
import './Calendar.css'
import {CalendarAddons} from "../components/Calendar/CalendarAddons";
import {Accordion} from "../components/Accordion/Accordion";
import {DemoSign} from "../components/DemoSign/DemoSign";
import CalendarInstruction from "../components/Calendar/CalendarInstruction";
import Modal from "../components/Modal/Modal";
import {TbAlertTriangle} from "react-icons/tb";
import {UseDeleteEvent} from "../hooks/calendar/useDeleteEvent";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const Calendar = () => {

    const [showInstructions, setShowInstructions] = useState(false);

    const toggleInstructions = () => {
        setShowInstructions(prevShowInstructions => !prevShowInstructions);
    };

    const {
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {handleDeleteEvent} = UseDeleteEvent();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            {selectedEventId && (
                <Modal
                    open={isOpen}
                    onClose={closeModal}
                    onConfirm={() => handleDeleteEvent(selectedEventId)}
                    onCancel={closeModal}
                    modalText="Czy na pewno chcesz usunąć ten trening"
                    confirmText="Tak"
                    cancelText="Nie"
                    icon={TbAlertTriangle}
                />
            )}
            <div className="div-calendar-info">
                <Accordion
                    title="Kalendarz treningów"
                    isOpen={showInstructions}
                    toggleAccordion={toggleInstructions}
                >
                    <DemoSign/>
                    <CalendarInstruction
                        toggleAccordion={toggleInstructions}
                    />
                </Accordion>
                <div style={{height: "730px"}} className="div-calendar">
                    <CalendarAddons
                        openModal={openModal}
                    />
                </div>
            </div>
        </>
    );
};

export default Calendar;
