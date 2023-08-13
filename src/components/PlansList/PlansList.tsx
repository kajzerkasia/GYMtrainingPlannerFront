import React from 'react';
import {Status} from 'types';
import {TbQuestionMark, TbX, TbHeartbeat, TbDotsVertical, TbUserCircle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import './PlansList.css';
import {PlansListForm} from "./PlansListForm";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {ConfirmDeleteModal} from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {text, textInformation} from "../../constants/plansListTexts";
import {useModal} from "../../hooks/useModal";
import {usePlansListLogic} from "../../hooks/usePlansListLogic";

export const PlansList = () => {

    const {
        plansList,
        isEdited,
        confirmDeletePlan,
        isLoading,
        addPlan,
        editPlan,
        handleUpdatePlan,
        handleDeletePlan,
        handleConfirmDelete,
        handleCancelDelete,
    } = usePlansListLogic();

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
    } = useModal();

    if (isLoading || !plansList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie planów treningowych...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

    return (
        <>
        <div className="parts-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>

            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">

                    <thead>
                    <tr className="tr-add">
                        <td className="training-plans" align="center" colSpan={4}>
                            <h1 className="h1-plan">Plany treningowe</h1>
                        </td>
                        <td>
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <TbUserCircle/>
                            </IconContext.Provider>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="question-td">
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <Link to="/instruction"><TbQuestionMark/></Link>
                            </IconContext.Provider>
                        </td>
                        <PlansListForm
                            initialValues={{
                                name: '',
                            }}
                            onSubmit={async (values, reset) => {
                                await addPlan(values);
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                    </tr>

                    {plansList.map((plan) => (
                        <tr key={`${plan.id}`}>
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => handleDeletePlan(plan.id)}><TbX/></button>
                                </IconContext.Provider>
                            </td>
                            <PlansListForm
                                initialValues={plan}
                                onSubmit={async (values, reset) => {
                                        await editPlan(values, reset);
                                        await handleUpdatePlan(values);
                                }}
                                actionType={Status.Save}
                                isEdited={isEdited}
                            />
                            <td className="dots" colSpan={1}>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <Link to={`/plans/${plan.slug}`}><TbDotsVertical/></Link>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ConfirmDeleteModal
                isOpen={confirmDeletePlan}
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
        </>
    )
}

// TODO: Zrobić resztę komponentów podobnie - pod demo, pomyśleć o refactorze wszystkich podobnych komponentów (Table), zmienić kolor tabeli na taki jak był