import {useState} from "react";
import {PlanEntity} from 'types';

export const usePlansListLogic = () => {

    const [plansList, setPlansList] = useState<PlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePlan, setConfirmDeletePlan] = useState<boolean>(false);
    const [planToDeleteId, setPlanToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    return {
        plansList,
        isEdited,
        confirmDeletePlan,
        planToDeleteId,
        isLoading,
        setPlansList,
        setIsEdited,
        setConfirmDeletePlan,
        setPlanToDeleteId,
        setIsLoading,
    }
};
