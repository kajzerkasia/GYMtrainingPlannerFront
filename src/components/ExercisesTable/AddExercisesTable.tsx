import React, {useEffect, useState} from "react";
import {ExerciseEntity} from 'types';
import {Logo} from "../Logo/Logo";
import {ExerciseForm} from "./ExerciseForm";
import './AddExercisesTable.css';

export const AddExercisesTable = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-exercise/exercises`, {
            method: 'GET'
        }).then(res => res.json())
            .then((exercises) => {
                setExercisesList(exercises)
            })
    }, [])

    const saveExercise = async (values: ExerciseEntity) => {
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

    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"/>
            <table>
                <thead>
                <tr>
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
                            await saveExercise(values);
                            reset();
                        }}
                    />
                </tr>

                {exercisesList.map((exercise, idx) => (
                    <tr key={`row-${idx}`}>
                        <ExerciseForm
                            initialValues={exercise}
                            onSubmit={async (values) => {
                                await editExercise(values);
                                await handleUpdateExercise(values);
                            }}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}