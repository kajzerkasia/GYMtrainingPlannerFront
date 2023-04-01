import React, {useEffect, useState} from 'react';
import {VscAdd} from "react-icons/vsc";
import {Logo} from "../Logo/Logo";
import {Calendar} from "../Calendar/Calendar";
import {PartOfPlanEntity, Status} from 'types';
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import './PartsOfPlanTable.css';

import {TbBarbell, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";

export const PartsOfPlanTable = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-part/plans`, {
            method: 'GET'
        }).then(res => res.json())
            .then((parts) => {
                setPartsOfPlanList(parts)
            })

    }, [])

    const addPartOfPlan = async (values: PartOfPlanEntity) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-part/plans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        const data = await res.json();
        setPartsOfPlanList(list => [...list, data]);
    };

    const editPartOfPlan = async (values: PartOfPlanEntity) => {

        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-part/plans/${values.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            throw new Error('Wystąpił błąd podczas próby zaktualizowania części planu.');
        }

        return await res.json();

    };

    const handleUpdatePartOfPlan = (updatedPart: PartOfPlanEntity) => {
        setPartsOfPlanList((partsOfPlanList) =>
            partsOfPlanList.map((part) =>
                part.id === updatedPart.id ? updatedPart : part
            )
        );
    };

    const deletePartOfPlan = async (values: PartOfPlanEntity) => {

        if (!window.confirm(`Czy na pewno chcesz usunąć część planu: ${values.name}? Spowoduje to usunięcie zarówno tej części planu, jak i ćwiczeń przypisanych do niej.`)) {
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-part/plans/${values.id}`, {
            method: 'DELETE',
        });
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Wystąpił błąd: ${error.message}`);
            return;
        } else {
            const data = await res.json();
            setPartsOfPlanList(
                partsOfPlanList => partsOfPlanList.filter(part => part.id !== data.id)
            )
        }
    };

    return (
        <div className="wrapper">
            <h1 className="main-h1">GYM Training Planner</h1>

            <div className="main-plan">
                <table className="main-table">

                    <thead>
                    <tr>
                        <td colSpan={3} className="gradient-bgc-tr">
                            <h1>Plan treningowy</h1>
                        </td>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <Logo to="/instruction" text={<TbQuestionMark/>}/>
                            </IconContext.Provider>
                        </td>
                        <PartsOfPlanForm
                            initialValues={{
                                name: '',
                            }}
                            onSubmit={async (values, reset) => {
                                await addPartOfPlan(values);
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                    </tr>


                    <tr>
                        <td className="td-progression-rules" colSpan={3}>
                            <Logo to="/rules" text="Zasady progresji"/>
                        </td>
                    </tr>


                    {partsOfPlanList.map((part, idx) => (
                        <tr key={`row-${idx}`}>
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => deletePartOfPlan(part)}><TbX/></button>
                                </IconContext.Provider>
                            </td>
                            <PartsOfPlanForm
                                initialValues={part}
                                onSubmit={async (values) => {
                                    await editPartOfPlan(values);
                                    await handleUpdatePartOfPlan(values);
                                }}
                                actionType={Status.Save}
                            />
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <Logo to="/exercises/day-b" text={<TbBarbell/>}/>
                                </IconContext.Provider>
                            </td>
                        </tr>

                    ))}
                    </tbody>

                </table>
                {/*<Calendar/>*/}
            </div>
        </div>
    )

}

