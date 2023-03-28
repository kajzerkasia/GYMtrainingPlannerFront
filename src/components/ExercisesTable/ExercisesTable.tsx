import React, {useEffect, useState} from "react";
import {ExerciseEntity, Status} from 'types';
import {Logo} from "../Logo/Logo";
import {ExerciseForm} from "./ExerciseForm";
import './ExercisesTable.css';
import {useParams} from "react-router-dom";
import {TbBarbell, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";

export const ExercisesTable = () => {


    // TODO: change /exercises to /exercises/:slug

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const params = useParams();

    useEffect(() => {
        // const abortController = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises`, {
            method: 'GET',
            // signal: abortController.signal
        }).then(res => res.json())
            .then((exercises) => {
                setExercisesList(exercises)
            })
        //
        // // first we need to check if part of plan's slug exists in DB - and get its ID
        // fetch(`${process.env.REACT_APP_API_URL}/parts_of_plan?slug=${params.slug}`, {
        //     method: 'GET',
        //     // signal: abortController.signal
        // }).then(res => res.json())
        //     .then((planPart) => {
        //         if (!planPart) {
        //             // todo: what happens when parts is NULL/undefined
        //             return Promise.reject('no plan part')
        //         } else {
        //             return fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises?planOfPartId=${planPart.id}`, {
        //                 method: 'GET',
        //                 // signal: abortController.signal
        //             }).then(res => res.json())
        //                 .then((exercises) => {
        //                     setExercisesList(exercises)
        //                 })
        //         }
        //     })

        // return () => {
        //     abortController.abort();
        // };
    }, [])

    const addExercise = async (values: ExerciseEntity) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        const data = await res.json();
        setExercisesList(list => [...list, data]);
    };

    const editExercise = async (values: ExerciseEntity) => {

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
            const data = await res.json();
            setExercisesList(
                exercisesList => exercisesList.filter(exercise => exercise.id !== data.id)
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
                    <th>
                        Kolejność
                    </th>
                    <th>
                        Ćwiczenie
                    </th>
                    <th>
                        Serie
                    </th>
                    <th>
                        Powtórzenia
                    </th>
                    <th>
                        Przerwa między seriami
                    </th>
                    <th>
                        Wskazówki dotyczące ćwiczenia
                    </th>
                    <th>
                        Poprawne wykonanie ćwiczenia (link)
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
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
                        <td>
                            <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
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
                        />
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}