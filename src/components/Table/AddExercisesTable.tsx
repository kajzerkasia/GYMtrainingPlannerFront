import './TableFormInputs.css';
import React, {SyntheticEvent, useState} from "react";
import {TableFormInputs} from "./TableFormInputs";
import {PartOfPlanEntity} from 'types';

export const AddExercisesTable = () => {
    const[partsList, setPartsList] = useState<PartOfPlanEntity[]>([]);
    const [id, setId] = useState('');
    const [form, setForm] = useState<PartOfPlanEntity>({
        order: '',
        exercise: '',
        series: 0,
        repetitions: '',
        tempo: 0,
        break: '',
        url: '',
    })

    const handleReset = (e: SyntheticEvent) => {
        setForm({
            order: '',
            exercise: '',
            series: 0,
            repetitions: '',
            tempo: 0,
            break: '',
            url: '',
        });
    }

    const savePartOfPlan = async (e: SyntheticEvent) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/add-exercise`, {
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

        const dataObj = (data: PartOfPlanEntity[]) => [...data, form];
        setPartsList(dataObj);

    };

    const updateForm = (key: string, value: PartOfPlanEntity) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    return (
        <>
            <TableFormInputs
                savePartOfPlan={savePartOfPlan}
                form={form}
                updateForm={updateForm}
                // handleReset={handleReset}
                partsList={partsList}
            />
        </>
    )
}