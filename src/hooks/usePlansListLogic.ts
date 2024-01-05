import {useState} from "react";
import {PlanEntity} from 'types';
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {useModal} from "./useModal";

export const usePlansListLogic = () => {

    const [plansList, setPlansList] = useState<PlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePlan, setConfirmDeletePlan] = useState<boolean>(false);
    const [planToDeleteId, setPlanToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeDemoModal,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
    } = useModal();

    const editPlan = async (values: PlanEntity, reset: () => void) => {

        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.name) {

            const res = await fetch(`${apiUrl}/api/add-plan/list/${values.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                throw new Error('Wystąpił błąd podczas próby zaktualizowania nazwy planu.');
            }

            setIsEdited(true);

            return await res.json();

        } else {
            setInformationModalIsOpen(true);
            reset();
        }
    };

    const handleUpdatePlan = (updatedPlan: PlanEntity) => {
        setPlansList((plansList) =>
            plansList.map((plan) =>
                plan.id === updatedPlan.id ? updatedPlan : plan
            )
        );
    };

    const handleDeletePlan = async (planId: any) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            setPlanToDeleteId(planId);
        } else {
            setConfirmDeletePlan(true);
            setPlanToDeleteId(planId);
        }
    };

    const handleConfirmDelete = async () => {
        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            const res = await fetch(
                `${apiUrl}/api/add-plan/list/${planToDeleteId}`,
                {method: "DELETE"}
            );
            if ([400, 500].includes(res.status)) {
                const error = await res.json();
                alert(`Wystąpił błąd: ${error.message}`);
                return;
            }
            setPlansList((plansList) =>
                plansList.filter((plan) => plan.id !== planToDeleteId)
            );
            setConfirmDeletePlan(false);
            setPlanToDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeletePlan(false);
        setPlanToDeleteId(null);
    };

    return {
        isEdited,
        confirmDeletePlan,
        planToDeleteId,
        isLoading,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
        setPlansList,
        setIsEdited,
        setConfirmDeletePlan,
        setPlanToDeleteId,
        setIsLoading,
        // addPlan,
        editPlan,
        handleUpdatePlan,
        handleDeletePlan,
        handleConfirmDelete,
        handleCancelDelete,
    }
};
