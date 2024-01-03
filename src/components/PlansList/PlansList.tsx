import React from 'react';
import {Status} from 'types';
import {TbQuestionMark, TbX, TbDotsVertical, TbUserCircle, TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import './PlansList.css';
import {PlansListForm} from "./PlansListForm";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {text, textInformation} from "../../constants/plansListTexts";
import {usePlansListLogic} from "../../hooks/usePlansListLogic";
import Modal from "../Modal/Modal";

export const PlansList = () => {

    const {
        plansList,
        isEdited,
        confirmDeletePlan,
        isLoading,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
        addPlan,
        editPlan,
        handleUpdatePlan,
        handleDeletePlan,
        handleConfirmDelete,
        handleCancelDelete,
    } = usePlansListLogic();

    if (isLoading || !plansList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie planów treningowych...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </div>
        );
    }

    return (
        <>
            <div className="parts-wrapper">
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
                                        handleUpdatePlan(values);
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
                <Modal
                    open={confirmDeletePlan}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    modalText={text}
                    confirmText="Tak"
                    cancelText="Nie"
                    icon={TbAlertTriangle}
                />
                <Modal
                    open={informationModalIsOpen}
                    onClose={closeModal}
                    onConfirm={closeModal}
                    modalText={textInformation}
                    confirmText="Rozumiem"
                    icon={TbAlertTriangle}
                />
                <Modal
                    open={demoModalIsOpen}
                    onClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    modalText={demoText}
                    confirmText="OK"
                    icon={TbAlertTriangle}
                />
            </div>
        </>
    )
}