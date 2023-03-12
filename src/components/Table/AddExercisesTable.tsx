import './TableFormInputs.css';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {TableFormInputs} from "./TableFormInputs";
import {ExerciseEntity} from 'types';

export const AddExercisesTable = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const [id, setId] = useState('');
    const [form, setForm] = useState<ExerciseEntity>({
        order: '',
        exercise: '',
        series: 1,
        repetitions: '',
        break: '',
        tips: '',
        url: '',
    })

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-exercise`, {
            method: 'GET'
        }).then(res => res.json())
            .then((exercises) => {
                setExercisesList(exercises)
            })

    }, [])

    const saveExercise = async (e: SyntheticEvent) => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-exercise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...form,
            }),
        });

        const data = await res.json();
        setId(data.id);

        const dataObj = (data: ExerciseEntity[]) => [...data, form];
        setExercisesList(dataObj);

        setForm({
            order: '',
            exercise: '',
            series: 1,
            repetitions: '',
            break: '',
            tips: '',
            url: '',
        });

    };

    const updateForm = (key: string, value: ExerciseEntity) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const updateTable = (key: string, value: ExerciseEntity) => {
        setExercisesList((data: ExerciseEntity[]) => [...data])
    };

    const editTable = () => {
        fetch(`${process.env.REACT_APP_API_URL}/add-exercise/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...exercisesList
            })
        }).then(res => res.json())
            .then((exercises) => {
                setExercisesList(exercises)
            });
    }

    return (
        <>
            <TableFormInputs
                saveExercise={saveExercise}
                form={form}
                updateForm={updateForm}
                exercisesList={exercisesList}
                updateTable={updateTable}
                editTable={editTable}
            />
        </>
    )
}