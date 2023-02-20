import './TableFormInputs.css';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {TableFormInputs} from "./TableFormInputs";
import {TableBody} from "./TableBody";

export const AddExercisesTable = () => {
    const[tableData, setTableData] = useState([]);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
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

        const dataObj: any = (data: any) => [...data, form];
        setTableData(dataObj);

    };

    const updateForm = (key: string, value: any) => {
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
                tableData={tableData}
            />
        </>
    )
}