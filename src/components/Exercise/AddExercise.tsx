import {TableHeader} from "../Table/TableHeader";
import {TableBodyInput} from "../Table/TableBodyInput";
import './AddExercise.css';
import {Logo} from "../Logo/Logo";
import {SyntheticEvent, useState} from "react";

export const AddExercise = () => {
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        exercise: '',
        series: 0,
        repetitions: '',
        tempo: 0,
        break: '',
        url: '',
    })

    const savePartOfPlan = async (e: SyntheticEvent) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/add-exercises`, {
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
    };

    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"></Logo>
            <form action="" onSubmit={savePartOfPlan}>
                <table>
                    <TableHeader/>
                    <TableBodyInput/>
                </table>
                <Logo to="/plans" text="GOTOWE"/>
            </form>
        </>
    )
}