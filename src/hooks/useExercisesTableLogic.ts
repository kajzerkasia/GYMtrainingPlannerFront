import {useEffect, useState} from "react";
import {ExerciseEntity, PlanEntity} from 'types';
import {useParams} from "react-router-dom";
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {useModal} from "./useModal";
import {validateURL} from "../helpers/validateUrl";

export const useExercisesTableLogic = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteExercise, setConfirmDeleteExercise] = useState<boolean>(false);
    const [exerciseToDeleteId, setExerciseToDeleteId] = useState(null);
    const [partName, setPartName] = useState("");
    const [planInfo, setPlanInfo] = useState<PlanEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const {
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeDemoModal,
        closeModal,
        demoModalIsOpen,
        informationModalIsOpen,
    } = useModal();

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
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteExercise(false);
        setExerciseToDeleteId(null);
    };

    return {
        exercisesList,
        isEdited,
        confirmDeleteExercise,
        exerciseToDeleteId,
        partName,
        planInfo,
        isLoading,
        demoModalIsOpen,
        informationModalIsOpen,
        closeModal,
        closeDemoModal,
        setExercisesList,
        setIsEdited,
        setConfirmDeleteExercise,
        setExerciseToDeleteId,
        setPartName,
        setPlanInfo,
        setIsLoading,
        addExercise,
        editExercise,
        handleUpdateExercise,
        handleDeleteExercise,
        handleConfirmDelete,
        handleCancelDelete,
    }
};

