import React, {useEffect, useState} from "react";
import {ExerciseEntity, Status} from 'types';
import {Logo} from "../Logo/Logo";
import {ExercisesForm} from "./ExercisesForm";
import './ExercisesTable.css';
import {useParams} from "react-router-dom";
import {TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal";
import {InformationModal} from "../InformationModal/InformationModal";

export const ExercisesTable = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteExercise, setConfirmDeleteExercise] = useState<boolean>(false);
    const [exerciseToDeleteId, setExerciseToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);

    const params = useParams();

    const text = 'Czy na pewno chcesz usunąć to ćwiczenie?';

    const textInformation = 'Aby dodać nowe ćwiczenie - wypełnij wszystkie pola!'

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/add-part/plans?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then((planPart) => {

                if (!planPart || planPart.length === 0) {
                    console.log('Brak części planu.')
                } else {

                    return fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises?partId=${planPart[0].id}`, {
                        method: 'GET',

                    }).then(res => res.json())
                        .then((exercises) => {
                            if (!exercises) {
                                return Promise.reject('Bark ćwiczeń.')
                            } else {
                                setExercisesList(exercises);
                            }
                        })

                }
            })

    }, [])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const addExercise = async (values: ExerciseEntity) => {
        fetch(`${process.env.REACT_APP_API_URL}/add-part/plans?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(async (planPart) => {
                if (!planPart || planPart.length === 0) {
                    console.log('Brak części planu.')
                } else {

                    const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises`, {
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
    };

    const editExercise = async (values: ExerciseEntity) => {

        setIsEdited(false);

        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises/${values.id}`, {
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

    };

    const handleUpdateExercise = (updatedExercise: ExerciseEntity) => {
        setExercisesList((exercisesList) =>
            exercisesList.map((exercise) =>
                exercise.id === updatedExercise.id ? updatedExercise : exercise
            )
        );
    };

    const handleDeleteExercise= async (exerciseId: any) => {
        setConfirmDeleteExercise(true);
        setExerciseToDeleteId(exerciseId);
    };

    const handleConfirmDelete = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises/${exerciseToDeleteId}`, {
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

    const handleCancelDelete = () => {
        setConfirmDeleteExercise(false);
        setExerciseToDeleteId(null);
    };

    return (
        <div className="wrapper-exercises-table">
            <Logo to="/plans" text="Gym Training Planner"/>
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
                        Poprawne wykonanie ćwiczenia (link)
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="icon-question">
                        <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                            <Logo to="/instruction" text={<TbQuestionMark/>}/>
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
                            if (values.order && values.name && values.series && values.repetitions && values.pause && values.tips && values.url) {
                                await addExercise(values);
                                reset();
                            } else {
                                setInformationModalIsOpen(true);
                            }
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
                            onSubmit={async (values) => {
                                await editExercise(values);
                                await handleUpdateExercise(values);
                            }}
                            actionType={Status.Save}
                            isEdited={isEdited}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            <Logo to="/plans" text="Powrót do strony głównej"></Logo>
            <ConfirmationModal
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
                onCancel={closeModal}
                text={textInformation}
            />
        </div>
    )
}