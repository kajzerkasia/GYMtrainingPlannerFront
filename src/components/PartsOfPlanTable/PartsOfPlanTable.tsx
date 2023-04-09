import React, {SetStateAction, useEffect, useState} from 'react';
import {Logo} from "../Logo/Logo";
import {PartsOfPlanForm} from "./PartsOfPlanForm";

import {PartOfPlanEntity, Status} from 'types';

import './PartsOfPlanTable.css';

import {TbBarbell, TbQuestionMark, TbX, TbStairsUp, TbHeartbeat, TbDotsVertical} from "react-icons/tb";
import {IconContext} from "react-icons";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal";

export const PartsOfPlanTable = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);

    const text = 'Czy na pewno chcesz usunąć tę część planu? Spowoduje to także usunięcie wszystkich ćwiczeń przypisanych do tej części planu';

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

    const handleDeletePart = async (partId: any) => {
        setConfirmDeletePart(true);
        setPartToDeleteId(partId);
    };

    const handleConfirmDelete = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/add-part/plans/${partToDeleteId}`,
            { method: "DELETE" }
        )
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Wystąpił błąd: ${error.message}`);
            return;
        }
        setPartsOfPlanList((partsOfPlanList) =>
            partsOfPlanList.filter((part) => part.id !== partToDeleteId)
        );
        setConfirmDeletePart(false);
    };

    const handleCancelDelete = () => {
        setConfirmDeletePart(false);
        setPartToDeleteId(null);
    };

    return (
        <div className="parts-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>

            <div className="main-plan">
                <table className="main-table">

                    <thead>
                    <tr className="tr-add">
                        <td colSpan={3} className="training-plan">
                            <h1>Plan treningowy</h1>
                        </td>
                        <td className="dots" colSpan={1}>
                            <IconContext.Provider value={{className: 'react-icons-dots'}}>
                                <Logo to="/details" text={<TbDotsVertical/>}/>
                            </IconContext.Provider>
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
                                if (values.name) {
                                    await addPartOfPlan(values);
                                }
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                        <td className="td-progression-rules">
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <Logo to="/rules" text=<TbStairsUp/>/>
                            </IconContext.Provider>
                        </td>
                    </tr>

                    {partsOfPlanList.map((part, idx) => (
                        <tr key={`row-${idx}`}>
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => handleDeletePart(part.id)}><TbX/></button>
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
            <ConfirmationModal
                isOpen={confirmDeletePart}
                onRequestClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={text}
            />
        </div>
    )

}


