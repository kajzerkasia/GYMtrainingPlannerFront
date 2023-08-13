import React, {useEffect} from "react";
import {ExerciseEntity, PlanEntity, Status} from 'types';
import {ExercisesForm} from "./ExercisesForm";
import {Link, useParams} from "react-router-dom";
import {TbHeartbeat, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import {apiUrl} from "../../config/api";
import './ExercisesTable.css';
import {MoonLoader} from "react-spinners";
import {isDemoEnabled} from "../../helpers/env";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {ConfirmDeleteModal} from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {text, textInformation} from "../../constants/exercisesTableTexts";
import {useModal} from "../../hooks/useModal";
import {useExercisesTableLogic} from "../../hooks/useExercisesTableLogic";

export const validateURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const ExercisesTable = () => {

    const {
        exercisesList,
        isEdited,
        confirmDeleteExercise,
        exerciseToDeleteId,
        partName,
        planInfo,
        isLoading,
        setExercisesList,
        setIsEdited,
        setConfirmDeleteExercise,
        setExerciseToDeleteId,
        setPartName,
        setPlanInfo,
        setIsLoading,
    } = useExercisesTableLogic();

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeModal,
        closeDemoModal,
    } = useModal();

    const params = useParams();

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`${apiUrl}/api/add-part/plans?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then((planPart) => {

                if (!planPart || planPart.length === 0) {
                    console.log('Brak części planu.')
                } else {
                    setPartName(planPart[0].name);

                    fetch(`${apiUrl}/api/add-plan/list`, {
                        method: 'GET',
                    })
                        .then(res => res.json())
                        .then((plans: Partial<PlanEntity>[]) => {
                            const foundPlan = plans.find((plan: Partial<PlanEntity>) => plan.id === planPart[0].planId);
                            if (foundPlan) {
                                setPlanInfo(foundPlan as PlanEntity);
                            }
                        });

                    return fetch(`${apiUrl}/api/add-exercise/exercises?partId=${planPart[0].id}`, {
                        method: 'GET',

                    }).then(res => res.json())
                        .then((exercises) => {
                            if (!exercises) {
                                return Promise.reject('Brak ćwiczeń.')
                            } else {
                                setExercisesList(exercises);
                                setIsLoading(false);
                            }
                        })
                        .catch((error) => {
                            console.error("Wystąpił błąd podczas próby pobrania danych o ćwiczeniach.", error);
                            setIsLoading(false);
                        });
                }
            })

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };

    }, [params.slug])

    const addExercise = async (values: ExerciseEntity) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true); // Otwórz demoModal, jeśli demo jest włączone
        } else if (
            values.order &&
            values.name &&
            values.series &&
            values.repetitions &&
            values.pause &&
            values.tips &&
            values.url &&
            validateURL(values.url)) {
            fetch(`${apiUrl}/api/add-part/plans?slug=${params.slug}`, {
                method: 'GET',
            })
                .then(r => r.json())
                .then(async (planPart) => {
                    if (!planPart || planPart.length === 0) {
                        console.log('Brak części planu.')
                    } else {
                        const res = await fetch(`${apiUrl}/api/add-exercise/exercises?partId=${planPart[0].id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({...values, partId: planPart[0].id}),
                        })

                        const data = await res.json();

                        setExercisesList(list => [...list, data]);

                    }
                })
        } else {
            values.url = 'Podaj poprawny adres URL';
            setInformationModalIsOpen(true);
        }
    };

    const editExercise = async (values: ExerciseEntity, reset: () => void) => {

        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (
            values.order &&
            values.name &&
            values.series &&
            values.repetitions &&
            values.pause &&
            values.tips &&
            values.url &&
            validateURL(values.url)) {

            const res = await fetch(`${apiUrl}/api/add-exercise/exercises/${values.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                throw new Error('Wystąpił błąd podczas próby zaktualizowania ćwiczenia.');
            }

            setIsEdited(true);

            return await res.json();

        } else {
            setInformationModalIsOpen(true);
            reset();
            values.url = 'Podaj poprawny adres URL';
        }

    };

    const handleUpdateExercise = (updatedExercise: ExerciseEntity) => {
        setExercisesList((exercisesList) =>
            exercisesList.map((exercise) =>
                exercise.id === updatedExercise.id ? updatedExercise : exercise
            )
        );
    };

    const handleDeleteExercise = async (exerciseId: any) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            setExerciseToDeleteId(exerciseId);
        } else {
            setConfirmDeleteExercise(true);
            setExerciseToDeleteId(exerciseId);
        }
    };

    const handleConfirmDelete = async () => {
        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            const res = await fetch(`${apiUrl}/api/add-exercise/exercises/${exerciseToDeleteId}`, {
                method: 'DELETE',
            });
            if ([400, 500].includes(res.status)) {
                const error = await res.json();
                alert(`Wystąpił błąd: ${error.message}`);
                return;
            }
            setExercisesList((exercisesList) =>
                exercisesList.filter((exercise) => exercise.id !== exerciseToDeleteId)
            );
            setConfirmDeleteExercise(false);
        };
    };

    const handleCancelDelete = () => {
        setConfirmDeleteExercise(false);
        setExerciseToDeleteId(null);
    };

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
            <ConfirmDeleteModal
                isOpen={confirmDeleteExercise}
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