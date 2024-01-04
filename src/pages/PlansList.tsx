import React from 'react';
import {Status} from 'types';
import {TbQuestionMark, TbX, TbDotsVertical, TbUserCircle, TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link, useLoaderData} from "react-router-dom";
import './PlansList.css';
import {PlansListForm} from "../components/PlansList/PlansListForm";
import {DemoSign} from "../components/DemoSign/DemoSign";
import {demoText} from "../constants/demoText";
import {text, textInformation} from "../constants/plansListTexts";
import {usePlansListLogic} from "../hooks/usePlansListLogic";
import Modal from "../components/Modal/Modal";
import {apiUrl} from "../config/api";
import {PlanEntity} from 'types';

export const PlansList = () => {

    const data = useLoaderData();
    const plansList: PlanEntity[] = data as PlanEntity[];

    const {
        isEdited,
        confirmDeletePlan,
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

                        {plansList.map((plan: any) => (
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

export async function loader() {
    const response = await fetch(`${apiUrl}/api/add-plan/list`);

    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Nie można pobrać danych o planach treningowych...'}), {status: 500});
    } else {
        return response;
    }
}
