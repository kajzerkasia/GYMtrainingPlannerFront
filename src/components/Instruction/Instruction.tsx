import React from "react";
import {TbBarbell, TbPlus, TbCheck, TbX, TbStairsUp, TbDotsVertical, TbLink, TbUserCircle, TbArrowNarrowRight, TbCalendarPlus} from "react-icons/tb";
import {IconContext, IconType} from "react-icons";
import './Instruction.css';
import {INSTRUCTION} from "../../constants/instruction";

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

export const Instruction = () => {
    return (
        <div className="instruction-wrapper">
            <h2 className="instruction-h2">Jak to działa?</h2>
            <ul className="instruction-ul">
                {
                    INSTRUCTION.map(item => (
                        <li key={item.icon} className="instruction-li">
                            <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                                {React.createElement(iconComponents[item.icon])}
                                <TbArrowNarrowRight style={{border: "none"}}/>
                                <p className="instruction-p">{item.text}</p>
                            </IconContext.Provider>
                        </li>
                    ))
                }
            </ul>
            <button className="btn-instruction-back" onClick={() => window.history.back()}>
                <p>Powrót</p>
            </button>
        </div>
    )
}