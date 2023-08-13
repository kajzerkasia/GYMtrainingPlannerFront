import {useState} from "react";
import {PartOfPlanEntity} from 'types';

export const usePartsOfPlanTableLogic = () => {

    const [partsOfPlanList, setPartsOfPlanList] = useState<PartOfPlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePart, setConfirmDeletePart] = useState<boolean>(false);
    const [partToDeleteId, setPartToDeleteId] = useState(null);
    const [trainingPlanName, setTrainingPlanName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    return {
        partsOfPlanList,
        isEdited,
        confirmDeletePart,
        partToDeleteId,
        trainingPlanName,
        isLoading,
        setPartsOfPlanList,
        setIsEdited,
        setConfirmDeletePart,
        setPartToDeleteId,
        setTrainingPlanName,
        setIsLoading,
    };
};