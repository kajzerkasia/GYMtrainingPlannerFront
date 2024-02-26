import React from 'react';
import CalendarInstructionList from "../CalendarInstructionList/CalendarInstructionList";
import {ADD_TRAINING_INSTRUCTION, DELETE_TRAINING_INSTRUCTION, EDIT_TRAINING_INSTRUCTION} from "../../../constants/calendarInstruction";
import {TbPencil, TbPlus, TbX} from "react-icons/tb";
import classes from './CalendarInstruction.module.css';
import IconProvider from "../../IconProvider/IconProvider";
import Button from "../../Button/Button";

interface CalendarInstructionProps {
    toggleAccordion: () => void;
}

const CalendarInstruction = ({toggleAccordion}: CalendarInstructionProps) => {
    return (
        <div className={classes.div_container}>
            <div className={classes.header}>
                <h1 className={classes.h1}>Jak to działa?</h1>
                <IconProvider>
                    <Button
                        className={classes.button}
                        onClick={toggleAccordion}>
                        <TbX/>
                    </Button>
                </IconProvider>
            </div>
            <CalendarInstructionList
                array={ADD_TRAINING_INSTRUCTION}
                title="Jak dodać trening do kalendarza?"
            >
                <IconProvider>
                    <TbPlus/>
                </IconProvider>
            </CalendarInstructionList>
            <CalendarInstructionList
                array={EDIT_TRAINING_INSTRUCTION}
                title="Jak edytować dodany trening w kalendarzu?"
            >
                <IconProvider>
                    <TbPencil/>
                </IconProvider>
            </CalendarInstructionList>
            <CalendarInstructionList
                array={DELETE_TRAINING_INSTRUCTION}
                title="Jak usunąć dany trening z kalendarza?"
            >
                <IconProvider>
                    <TbX/>
                </IconProvider>
            </CalendarInstructionList>
        </div>
    );
};

export default CalendarInstruction;