import React, {useEffect, useState} from 'react';
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {PartOfPlanEntity, Status} from 'types';
import {TbBarbell, TbQuestionMark, TbX, TbStairsUp, TbHeartbeat, TbDotsVertical} from "react-icons/tb";
import {IconContext} from "react-icons";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {Link, useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import './PartsOfPlanTable.css';
import {GoBack} from "../GoBack/GoBack";
import {MoonLoader} from "react-spinners";

export const PartsOfPlanTable = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);
    const [trainingPlanName, setTrainingPlanName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const text = 'Czy na pewno chcesz usunąć tę część planu? Spowoduje to także usunięcie wszystkich ćwiczeń przypisanych do tej części planu';

    const textInformation = 'Należy podać nazwę części planu!'

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then((plan) => {

                if (!plan || plan.length === 0) {
                    console.log('Brak planu.')
                } else {
                    setTrainingPlanName(plan[0].name);
                    return fetch(`${apiUrl}/api/add-part/plans?planId=${plan[0].id}`, {
                        method: 'GET',

                    }).then(res => res.json())
                        .then((planParts) => {
                            if (!planParts) {
                                return Promise.reject('Brak części planów.')
                            } else {
                                setPartsOfPlanList(planParts);
                                setIsLoading(false);
                            }
                        })
                        .catch((error) => {
                            console.error("An error occurred when fetching parts of plan data:", error);
                            setIsLoading(false);
                        });
                }
            })

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };

    }, [params.slug])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const addPartOfPlan = async (values: PartOfPlanEntity) => {
        fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(async (plan) => {
                if (!plan || plan.length === 0) {
                    console.log('Brak planu.')
                } else {

                    const res = await fetch(`${apiUrl}/api/add-part/plans`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({...values, planId: plan[0].id}),
                    })

                    const data = await res.json();

                    setPartsOfPlanList(list => [...list, data]);

                }
            })
    };

    const editPartOfPlan = async (values: PartOfPlanEntity) => {
        setIsEdited(false);

        const res = await fetch(`${apiUrl}/api/add-part/plans/${values.id}`, {
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
            `${apiUrl}/api/add-part/plans/${partToDeleteId}`,
            {method: "DELETE"}
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

    if (isLoading || !partsOfPlanList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Loading parts of plan data...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

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
                            <h1 className="h1-plan">{trainingPlanName}</h1>
                        </td>
                        <td className="dots" colSpan={1}>
                            <IconContext.Provider value={{className: 'react-icons-dots'}}>
                                <Link to="/details"><TbDotsVertical/></Link>
                            </IconContext.Provider>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="question-td">
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <Link to="/instruction"><TbQuestionMark/></Link>
                            </IconContext.Provider>
                        </td>
                        <PartsOfPlanForm
                            initialValues={{
                                name: '',
                            }}
                            onSubmit={async (values, reset) => {
                                if (values.name) {
                                    await addPartOfPlan(values);
                                    reset();
                                } else {
                                    setInformationModalIsOpen(true);
                                }
                            }}
                            actionType={Status.Add}
                        />
                        <td className="td-progression-rules">
                            <IconContext.Provider value={{className: 'react-icons-progression'}}>
                                <Link to="/rules"><TbStairsUp/></Link>
                            </IconContext.Provider>
                        </td>
                    </tr>

                    {partsOfPlanList.map((part) => (
                        <tr key={`${part.id}`}>
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => handleDeletePart(part.id)}><TbX/></button>
                                </IconContext.Provider>
                            </td>
                            <PartsOfPlanForm
                                initialValues={part}
                                onSubmit={async (values) => {
                                    if (values.name) {
                                        await editPartOfPlan(values);
                                        await handleUpdatePartOfPlan(values);
                                    } else {
                                        setInformationModalIsOpen(true);
                                        values.name = part.name;
                                    }
                                }}
                                actionType={Status.Save}
                                isEdited={isEdited}
                            />
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <Link to={`/exercises/${part.slug}`}><TbBarbell/></Link>
                                </IconContext.Provider>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                <GoBack to={`/list`} text="Powrót do wszystkich planów"></GoBack>
            </div>
            <ConfirmationModal
                isOpen={confirmDeletePart}
                onRequestClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={text}
            />
            <InformationModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                onCancel={closeModal}
                text={textInformation}
            />
        </div>
    )
}
