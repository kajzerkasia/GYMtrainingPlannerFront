import React from "react";
import {Status} from 'types';
import {RulesForm} from "./RulesForm";
import {TbHeartbeat, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import './RulesTable.css';
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {ConfirmDeleteModal} from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {text, textInformation} from "../../constants/rulesTableTexts";
import {useModal} from "../../hooks/useModal";
import {useRulesTableLogic} from "../../hooks/useRulesTableLogic";

export const RulesTable = () => {

    const {
        rulesList,
        isEdited,
        confirmDeleteRule,
        isLoading,
        planName,
        addRule,
        editRule,
        handleUpdateRule,
        handleDeleteRule,
        handleConfirmDelete,
        handleCancelDelete,
    } = useRulesTableLogic()

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
    } = useModal();

    if (isLoading || !rulesList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie zasad progresji...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

    return (
        <div className="rules-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <DemoSign/>
            <div className="inner-container">
                <h2>{planName}</h2>
            </div>
            <table className="rules-table">
                <thead>
                <tr className="tr-add">
                    <td colSpan={3} className="gradient-bgc-tr">
                        <h1 className="h1-rules">Zasady progresji</h1>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                        <td className="td-rule">
                            <Link to="/instruction"><TbQuestionMark/></Link>
                        </td>
                    </IconContext.Provider>
                    <RulesForm
                        initialValues={{
                            rule: '',
                        }}
                        onSubmit={async (values, reset) => {
                                await addRule(values);
                                reset();
                        }}
                        actionType={Status.Add}
                    />
                </tr>

                {rulesList.map((rule) => (
                    <tr key={`${rule.id}`}>
                        <td className="td-rule">
                            <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                                <button onClick={() => handleDeleteRule(rule.id)}><TbX/></button>
                            </IconContext.Provider>
                        </td>
                        <RulesForm
                            initialValues={rule}
                            onSubmit={async (values, reset) => {
                                    await editRule(values, reset);
                                    await handleUpdateRule(values);
                            }}
                            actionType={Status.Save}
                            isEdited={isEdited}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="btn-back-exercises" onClick={() => window.history.back()}>
                Powrót
            </button>
            <ConfirmDeleteModal
                isOpen={confirmDeleteRule}
                onRequestClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={text}
            />
            <InformationModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                text={textInformation}
            />
            {demoModalIsOpen && (
                <DemoModal
                    isOpen={demoModalIsOpen}
                    onRequestClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    text={demoText}
                />
            )}
        </div>
    )
}