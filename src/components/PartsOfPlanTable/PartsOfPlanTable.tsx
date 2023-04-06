import React, {useEffect, useState} from 'react';
import {Logo} from "../Logo/Logo";
import {PartsOfPlanForm} from "./PartsOfPlanForm";

import {PartOfPlanEntity, Status} from 'types';

import './PartsOfPlanTable.css';

// TbClipboardText, TbList, TbStairsUp, TbBrandSupabase
import {TbBarbell, TbQuestionMark, TbX, TbStairsUp, TbHeartbeat} from "react-icons/tb";
import {IconContext} from "react-icons";

export const PartsOfPlanTable = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);

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
        setIsEdited(false);

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

        setIsEdited(true);

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
            setPartsOfPlanList(
                partsOfPlanList => partsOfPlanList.filter(part => part.id !== values.id)
            )
        }
    };

    return (
        <div className="wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> GYM Training Planner</h1>
            </IconContext.Provider>

            <div className="main-plan">
                <table className="main-table">

                    <thead>
                    <tr>
                        <td colSpan={4} className="gradient-bgc-tr">
                            <h1>Plan treningowy</h1>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="tr-add">
                        <td className="td-highlight">
                            <IconContext.Provider value={{className: 'react-icons dark'}}>
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
                        <td className="td-progression-rules">
                            <IconContext.Provider value={{className: 'react-icons dark'}}>
                                <Logo to="/rules" text=<TbStairsUp/>/>
                            </IconContext.Provider>
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
                                isEdited={isEdited}
                            />
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <Logo to={`/exercises/${part.slug}`} text={<TbBarbell/>}/>
                                </IconContext.Provider>
                            </td>
                        </tr>

                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    )

}

// zrobić animację podświetlenia nazwy części planu na inny kolor po zmianie nazwy.

