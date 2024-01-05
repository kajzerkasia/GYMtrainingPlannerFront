import React from "react";
import {Status} from 'types';
import {ExercisesForm} from "../components/ExercisesTable/ExercisesForm";
import {json, Link, useLoaderData} from "react-router-dom";
import {TbAlertTriangle, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import './ExercisesTable.css';
import {DemoSign} from "../components/DemoSign/DemoSign";
import {demoText} from "../constants/demoText";
import {text, textInformation} from "../constants/exercisesTableTexts";
import {useExercisesTableLogic} from "../hooks/useExercisesTableLogic";
import Modal from "../components/Modal/Modal";
import {apiUrl} from "../config/api";
import {PlanEntity, ExerciseEntity} from 'types';

export const ExercisesTable = () => {

    const data: any = useLoaderData();
    console.log(data);
    const exercisesList: ExerciseEntity[] = data.exercisesList as any;

    const {
        isEdited,
        confirmDeleteExercise,
        demoModalIsOpen,
        informationModalIsOpen,
        closeModal,
        closeDemoModal,
        addExercise,
        editExercise,
        handleUpdateExercise,
        handleDeleteExercise,
        handleConfirmDelete,
        handleCancelDelete,
    } = useExercisesTableLogic();

    return (
        <div className="wrapper-exercises-table">
            <DemoSign/>
            <div className="div-plan-info">
                <div className="inner-container">
                    {data.planInfo && (
                        <h3>Nazwa planu: {data.planInfo.name}</h3>
                    )}
                    <p>Nazwa części planu: {data.partName}</p>
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
                                handleUpdateExercise(values);
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

type ParamsType = {
    params: {
        slug?: string;
    }
};

export async function loader({params}: ParamsType) {
    const slug = params.slug;

    try {
        const response = await fetch(`${apiUrl}/api/add-part/plans?slug=${slug}`);

        if (!response.ok) {
            return json({message: 'Nie można pobrać danych o ćwiczeniach...'},
                {
                    status: 500,
                }
            );
        }

        const planPart = await response.json();

        if (!planPart || planPart.length === 0) {
            return json({message: 'Nie można pobrać danych o ćwiczeniach...'},
                {
                    status: 500,
                }
            );
        }

        const planInfoResponse = await fetch(`${apiUrl}/api/add-plan/list`);
        const plans = await planInfoResponse.json();
        const foundPlan = plans.find((plan: Partial<PlanEntity>) => plan.id === planPart[0].planId);

        const exercisesResponse = await fetch(`${apiUrl}/api/add-exercise/exercises?partId=${planPart[0].id}`);
        const exercises = await exercisesResponse.json();

        return {exercisesList: exercises, partName: planPart[0].name, planInfo: foundPlan as PlanEntity};
    } catch (error) {
        return json({message: 'Nie można pobrać danych o ćwiczeniach...'},
            {
                status: 500,
            }
        );
    }
}
