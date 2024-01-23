import {useState} from "react";
import {PlanEntity} from 'types';
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {UseModal} from "./useModal";
import {getAuthToken} from "../helpers/auth";

export const usePlansListLogic = () => {

    const [plansList, setPlansList] = useState<PlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePlan, setConfirmDeletePlan] = useState<boolean>(false);
    const [planToDeleteId, setPlanToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        setDemoModalIsOpen,
        closeDemoModal,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
    } = UseModal();

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
        const token = getAuthToken();

        if (!token) {
            return window.location.href = '/auth?mode=login';
        }

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
        return null;
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
        plansList,
        closeModal,
        closeDemoModal,
        setPlansList,
        setIsEdited,
        setConfirmDeletePlan,
        setPlanToDeleteId,
        setIsLoading,
        handleDeletePlan,
        handleConfirmDelete,
        handleCancelDelete,
    }
};
