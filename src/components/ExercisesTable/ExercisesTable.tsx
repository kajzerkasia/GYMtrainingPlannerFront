import React, {useEffect, useState} from "react";
import {ExerciseEntity, Status} from 'types';
import {Logo} from "../Logo/Logo";
import {ExerciseForm} from "./ExerciseForm";
import './ExercisesTable.css';
import {useParams} from "react-router-dom";
import {TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";

export const ExercisesTable = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const params = useParams();

    useEffect(() => {
        // console.log(params);
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

    const addExercise = async (values: ExerciseEntity) => {
        fetch(`${process.env.REACT_APP_API_URL}/add-part/plans?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(async (planPart) => {

                const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...values, partId: planPart[0].id}),
                })

                const data = await res.json();

                setExercisesList(list => [...list, data]);

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

    const deleteExercise = async (values: ExerciseEntity) => {

        if (!window.confirm(`Czy na pewno chcesz usunąć ćwiczenie: ${values.name}?`)) {
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises/${values.id}`, {
            method: 'DELETE',
        });
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Wystąpił błąd: ${error.message}`);
            return;
        } else {
            setExercisesList(
                exercisesList => exercisesList.filter(exercise => exercise.id !== values.id)
            )
        }
    };

    return (
        <>
            <Logo to="/plans" text="GYM Training Planner"/>
            <table className="exercises-table">

                <thead>
                <tr>
                    <th className="hidden"></th>
                    <th className="gradient-bgc-tr">
                        Kolejność
                    </th>
                    <th className="gradient-bgc-tr">
                        Ćwiczenie
                    </th>
                    <th className="gradient-bgc-tr">
                        Serie
                    </th>
                    <th className="gradient-bgc-tr">
                        Powtórzenia
                    </th>
                    <th className="gradient-bgc-tr">
                        Przerwa między seriami
                    </th>
                    <th className="gradient-bgc-tr">
                        Wskazówki dotyczące ćwiczenia
                    </th>
                    <th className="gradient-bgc-tr">
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
                    <ExerciseForm
                        initialValues={{
                            order: '',
                            name: '',
                            series: 0,
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

                {exercisesList.map((exercise, idx) => (
                    <tr key={`row-${idx}`}>
                        <td className="icon-delete">
                            <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                                <button onClick={() => deleteExercise(exercise)}><TbX/></button>
                            </IconContext.Provider>
                        </td>
                        <ExerciseForm
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
        </>
    )
}