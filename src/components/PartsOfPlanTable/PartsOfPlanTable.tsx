import React, {useEffect, useState} from 'react';
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {PartOfPlanEntity, Status} from 'types';
import {TbBarbell, TbQuestionMark, TbX, TbStairsUp, TbHeartbeat, TbDotsVertical} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link, useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import './PartsOfPlanTable.css';
import {GoBack} from "../GoBack/GoBack";
import {MoonLoader} from "react-spinners";
import {isDemoEnabled} from "../../helpers/env";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {ConfirmDeleteModal} from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import {useModal} from "../../hooks/useModal";

export const PartsOfPlanTable = () => {

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeModal,
        closeDemoModal,
    } = useModal();

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);
    const [trainingPlanName, setTrainingPlanName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

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
                            console.error("Wystąpił błąd podczas próby pobrania danych o częściach planu:", error);
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

    const addPartOfPlan = async (values: PartOfPlanEntity) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
        } else if (values.name) {
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
        } else {
            setInformationModalIsOpen(true);
        }
    };

    const editPartOfPlan = async (values: PartOfPlanEntity, reset: () => void) => {
        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.name) {

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

        } else {
            setInformationModalIsOpen(true);
            reset();
        }
    };

    const handleUpdatePartOfPlan = (updatedPart: PartOfPlanEntity) => {
        setPartsOfPlanList((partsOfPlanList) =>
            partsOfPlanList.map((part) =>
                part.id === updatedPart.id ? updatedPart : part
            )
        );
    };

    const handleDeletePart = async (partId: any) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            setPartToDeleteId(partId);
        } else {
            setConfirmDeletePart(true);
            setPartToDeleteId(partId);
        }
    };

    const handleConfirmDelete = async () => {
        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
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
            setPartToDeleteId(null);
        };
    };

    const handleCancelDelete = () => {
        setConfirmDeletePart(false);
        setPartToDeleteId(null);
    };

    if (isLoading || !partsOfPlanList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie częsci planu..</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </div>
        );
    }

    return (
        <div className="parts-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">

                    <thead>
                    <tr className="tr-add">
                        <td colSpan={3} className="training-plan">
                            <h1 className="h1-plan">{trainingPlanName}</h1>
                        </td>
                        <td className="dots" colSpan={1}>
                            <IconContext.Provider value={{className: 'react-icons-dots'}}>
                                <Link to={`/details/${params.slug}`}><TbDotsVertical/></Link>
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
                                await addPartOfPlan(values);
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                        <td className="td-progression-rules">
                            <IconContext.Provider value={{className: 'react-icons-progression'}}>
                                <Link to={`/rules/${params.slug}`}><TbStairsUp/></Link>
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
                                onSubmit={async (values, reset) => {
                                    await editPartOfPlan(values, reset);
                                    await handleUpdatePartOfPlan(values);
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
            <ConfirmDeleteModal
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
                text={textInformation}
            />
            {demoModalIsOpen && (
                <DemoModal
                    isOpen={demoModalIsOpen}
                    onRequestClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    text={demoText}
                />
            )}
        </div>
    )
}
