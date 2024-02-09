import React from "react";
import {TbBarbell, TbPlus, TbCheck, TbX, TbStairsUp, TbDotsVertical, TbLink, TbUserCircle, TbArrowNarrowRight, TbCalendarPlus} from "react-icons/tb";
import {IconContext, IconType} from "react-icons";
import {INSTRUCTION} from "../../constants/instruction";
import BackButton from "../../components/BackButton/BackButton";
import classes from './Instruction.module.css';

const iconComponents: { [key: string]: IconType } = {
    TbUserCircle,
    TbDotsVertical,
    TbStairsUp,
    TbPlus,
    TbCheck,
    TbX,
    TbBarbell,
    TbLink,
    TbCalendarPlus,
};

const Instruction = () => {
    return (
        <div className={`${classes.div_container} ${classes.instruction}`}>
            <h2>Jak to działa?</h2>
            <ul>
                {
                    INSTRUCTION.map(item => (
                        <li key={item.icon}>
                            <IconContext.Provider value={{className: `${classes.instruction_icon}`}}>
                                {React.createElement(iconComponents[item.icon])}
                                <TbArrowNarrowRight style={{border: "none"}}/>
                                <p>{item.text}</p>
                            </IconContext.Provider>
                        </li>
                    ))
                }
            </ul>
            <BackButton/>
        </div>
    )
}

export default Instruction;