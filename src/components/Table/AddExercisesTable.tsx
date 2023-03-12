import './TableFormInputs.css';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {TableFormInputs} from "./TableFormInputs";
import {PartOfPlanEntity} from 'types';


export const AddExercisesTable = () => {

    const [partsList, setPartsList] = useState<PartOfPlanEntity[]>([]);
    const [id, setId] = useState('');
    const [form, setForm] = useState<PartOfPlanEntity>({
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
            .then((parts) => {
                setPartsList(parts)
            })


    }, [])

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

    const updateForm = (key: string, value: PartOfPlanEntity) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const updateTable = (key: string, value: PartOfPlanEntity) => {
        setPartsList((data: PartOfPlanEntity[]) => [...data])
    };

    const editTable = () => {
        fetch(`${process.env.REACT_APP_API_URL}/add-exercise/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...partsList
            })
        }).then(res => res.json())
            .then((parts) => {
                setPartsList(parts)
            });
    }

    return (
        <>
            <TableFormInputs
                savePartOfPlan={savePartOfPlan}
                form={form}
                updateForm={updateForm}
                partsList={partsList}
                updateTable={updateTable}
                editTable={editTable}
            />
        </>
    )
}