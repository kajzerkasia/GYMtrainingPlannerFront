import React from 'react';
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {Status} from 'types';
import {TbQuestionMark, TbStairsUp, TbHeartbeat, TbDotsVertical, TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import './PartsOfPlanTable.css';
import {GoBack} from "../GoBack/GoBack";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import Modal from "../Modal/Modal";
import usePartsOfPlanFunctions from "../../hooks/usePartsOfPlanFunctions";
import {useModal} from "../../hooks/useModal";
import PartsOfPlanElements from "./PartsOfPlanElements";

export const PartsOfPlanTable = () => {

    const {
        isLoading,
        isEdited,
        itemsList,
        confirmDeleteItem,
        params,
        handleEditPartOfPlan,
        addPartOfPlan,
        deletePart,
        handleConfirmDelete,
        handleCancelDelete,
    } = usePartsOfPlanFunctions();

    const {demoModalIsOpen, closeDemoModal, informationModalIsOpen, closeModal} = useModal();

    if (isLoading || !itemsList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie częsci planu..</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </div>
        );
    }

    return (
        <div className="parts-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">

                    <thead>
                    <tr className="tr-add">
                        <td colSpan={3} className="training-plan">
                            <h1 className="h1-plan">Nazwa planu treningowego (TODO)</h1>
                        </td>
                        <td className="dots" colSpan={1}>
                            <IconContext.Provider value={{className: 'react-icons-dots'}}>
                                <Link to={`/details/${params.slug}`}><TbDotsVertical/></Link>
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
                        <PartsOfPlanForm
                            initialValues={{
                                name: '',
                            }}
                            onSubmit={async (values, reset) => {
                                addPartOfPlan(values);
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                        <td className="td-progression-rules">
                            <IconContext.Provider value={{className: 'react-icons-progression'}}>
                                <Link to={`/rules/${params.slug}`}><TbStairsUp/></Link>
                            </IconContext.Provider>
                        </td>
                    </tr>
                    <PartsOfPlanElements
                        itemsList={itemsList}
                        isEdited={isEdited}
                        handleEditPartOfPlan={handleEditPartOfPlan}
                        deletePart={deletePart}
                    />
                    </tbody>
                </table>
                <GoBack to={`/list`} text="Powrót do wszystkich planów"></GoBack>
            </div>
            <Modal
                open={confirmDeleteItem}
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
    )
}
