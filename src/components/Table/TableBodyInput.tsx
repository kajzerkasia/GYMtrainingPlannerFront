import './TableBodyInput.css';
import React, {SyntheticEvent, useState} from "react";
import {TableForm} from "./TableForm";
import {Table} from "./Table";

export const TableBodyInput = () => {
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
            <TableForm
                savePartOfPlan={savePartOfPlan}
                form={form}
                updateForm={updateForm}
            />
            <Table tableData={tableData}/>
        </>
    )
}