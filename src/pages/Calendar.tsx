import React, {useState} from "react";
import {CalendarAddons} from "../components/Calendar/CalendarAddons";
import {Accordion} from "../components/Accordion/Accordion";
import {DemoSign} from "../components/DemoSign/DemoSign";
import CalendarInstruction from "../components/Calendar/CalendarInstruction";
import Modal from "../components/Modal/Modal";
import {TbAlertTriangle} from "react-icons/tb";
import {UseDeleteEvent} from "../hooks/calendar/useDeleteEvent";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useParams} from "react-router-dom";
import classes from './Calendar.module.css';

const Calendar = () => {

    const [showInstructions, setShowInstructions] = useState(false);

    const params = useParams();

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
            <div className={classes.div_calendar_container}>
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
                <div className={classes.div_calendar}>
                    <CalendarAddons
                        openModal={openModal}
                        params={params}
                    />
                </div>
            </div>
        </>
    );
};

export default Calendar;
