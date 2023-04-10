import React, {useEffect, useState} from 'react';
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {PartOfPlanEntity, Status} from 'types';
import {TbBarbell, TbQuestionMark, TbX, TbStairsUp, TbHeartbeat, TbDotsVertical} from "react-icons/tb";
import {IconContext} from "react-icons";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";
import './PartsOfPlanTable.css';

export const PartsOfPlanTable = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);

    const text = 'Czy na pewno chcesz usunąć tę część planu? Spowoduje to także usunięcie wszystkich ćwiczeń przypisanych do tej części planu';

    const textInformation = 'Należy podać nazwę części planu!'

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`${apiUrl}/add-part/plans`, {
            method: 'GET',
            signal: abortController.signal
        }).then(res => res.json())
            .then((parts) => {
                setPartsOfPlanList(parts)
            })

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };
    }, [])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const addPartOfPlan = async (values: PartOfPlanEntity) => {

        const res = await fetch(`${apiUrl}/api/add-part/plans`, {
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
                                <Link to="/details"><TbDotsVertical/></Link>
                            </IconContext.Provider>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>
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
                            <IconContext.Provider value={{className: 'react-icons'}}>
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
