import React from "react";
import {Status} from 'types';
import {ExercisesForm} from "./ExercisesForm";
import {Link} from "react-router-dom";
import {TbAlertTriangle, TbHeartbeat, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import './ExercisesTable.css';
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {text, textInformation} from "../../constants/exercisesTableTexts";
import {useExercisesTableLogic} from "../../hooks/useExercisesTableLogic";
import Modal from "../Modal/Modal";

export const ExercisesTable = () => {

    const {
        exercisesList,
        isEdited,
        confirmDeleteExercise,
        demoModalIsOpen,
        informationModalIsOpen,
        partName,
        planInfo,
        isLoading,
        closeModal,
        closeDemoModal,
        addExercise,
        editExercise,
        handleUpdateExercise,
        handleDeleteExercise,
        handleConfirmDelete,
        handleCancelDelete,
    } = useExercisesTableLogic();

    if (isLoading || !exercisesList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie ćwiczeń...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </div>
        );
    }

    return (
        <div className="wrapper-exercises-table">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <DemoSign/>
            <div className="div-plan-info">
                <div className="inner-container">
                    {planInfo && (
                        <h3>Nazwa planu: {planInfo.name}</h3>
                    )}
                    <p>Nazwa części planu: {partName}</p>
                </div>
            </div>
            <table className="exercises-table">

                <thead>
                <tr>
                    <td className="hidden"></td>
                    <th className="tr-add">
                        Kolejność
                    </th>
                    <th className="tr-add">
                        Ćwiczenie
                    </th>
                    <th className="tr-add">
                        Serie
                    </th>
                    <th className="tr-add">
                        Powtórzenia
                    </th>
                    <th className="tr-add">
                        Przerwa między seriami
                    </th>
                    <th className="tr-add">
                        Wskazówki dotyczące ćwiczenia
                    </th>
                    <th className="tr-add">
                        Poprawne wykonanie ćwiczenia (prawidłowy link)
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="icon-question">
                        <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                            <Link to="/instruction"><TbQuestionMark/></Link>
                        </IconContext.Provider>
                    </td>
                    <ExercisesForm
                        initialValues={{
                            order: '',
                            name: '',
                            series: '',
                            repetitions: '',
                            pause: '',
                            tips: '',
                            url: '',
                        }}
                        onSubmit={async (values, reset) => {
                            await addExercise(values);
                            reset();
                        }}
                        actionType={Status.Add}
                    />
                </tr>

                {exercisesList.map((exercise) => (
                    <tr key={`${exercise.id}`}>
                        <td className="icon-delete">
                            <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                                <button onClick={() => handleDeleteExercise(exercise.id)}><TbX/></button>
                            </IconContext.Provider>
                        </td>
                        <ExercisesForm
                            initialValues={exercise}
                            onSubmit={async (values, reset) => {
                                await editExercise(values, reset);
                                await handleUpdateExercise(values);
                            }}
                            actionType={Status.Save}
                            isEdited={isEdited}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="div-btn-back-exercises-container">
                <button className="btn-back-exercises" onClick={() => window.history.back()}>
                    Powrót do części planu
                </button>
            </div>
            <Modal
                open={confirmDeleteExercise}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                modalText={text}
                confirmText="Tak"
                cancelText="Nie"
                icon={TbAlertTriangle}
            />
            <InformationModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                text={textInformation}
            />
            <DemoModal
                isOpen={demoModalIsOpen}
                onRequestClose={closeDemoModal}
                onConfirm={closeDemoModal}
                text={demoText}
            />
        </div>
    )
}