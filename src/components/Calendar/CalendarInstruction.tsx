import React from 'react';
import CalendarInstructionList from "./CalendarInstructionList";
import {ADD_TRAINING_INSTRUCTION, DELETE_TRAINING_INSTRUCTION, EDIT_TRAINING_INSTRUCTION} from "../../constants/calendarInstruction";
import {TbPencil, TbPlus, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import './CalendarInstruction.css';

interface CalendarInstructionProps {
    toggleAccordion: () => void;
}

const CalendarInstruction = ({toggleAccordion}: CalendarInstructionProps) => {
    return (
        <div className="calendar-div">
            <div className="calendar-instruction-header">
                <h1 className="calendar-instruction-h1">Jak to działa?</h1>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button
                        className="close-instruction"
                        onClick={toggleAccordion}>
                        <TbX/>
                    </button>
                </IconContext.Provider>
            </div>
            <CalendarInstructionList
                array={ADD_TRAINING_INSTRUCTION}
                title="Jak dodać trening do kalendarza?"
            >
                <TbPlus/>
            </CalendarInstructionList>
            <CalendarInstructionList
                array={EDIT_TRAINING_INSTRUCTION}
                title="Jak edytować dodany trening w kalendarzu?"
            >
                <TbPencil/>
            </CalendarInstructionList>
            <CalendarInstructionList
                array={DELETE_TRAINING_INSTRUCTION}
                title="Jak usunąć dany trening z kalendarza?"
            >
                <TbX/>
            </CalendarInstructionList>
        </div>
    );
};

export default CalendarInstruction;