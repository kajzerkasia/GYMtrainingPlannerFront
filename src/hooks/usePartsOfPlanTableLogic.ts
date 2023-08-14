import {useEffect, useState} from "react";
import {PartOfPlanEntity} from 'types';
import {useParams} from "react-router-dom";
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {useModal} from "./useModal";

export const usePartsOfPlanTableLogic = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);
    const [trainingPlanName, setTrainingPlanName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeDemoModal,
    } = useModal();

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

    return {
        partsOfPlanList,
        isEdited,
        confirmDeletePart,
        partToDeleteId,
        trainingPlanName,
        isLoading,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
        setPartsOfPlanList,
        setIsEdited,
        setConfirmDeletePart,
        setPartToDeleteId,
        setTrainingPlanName,
        setIsLoading,
        addPartOfPlan,
        editPartOfPlan,
        handleUpdatePartOfPlan,
        handleDeletePart,
        handleConfirmDelete,
        handleCancelDelete,
    };
};