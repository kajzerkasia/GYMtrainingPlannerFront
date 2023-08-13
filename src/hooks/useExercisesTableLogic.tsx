import {useState} from "react";
import {ExerciseEntity, PlanEntity} from 'types';

export const useExercisesTableLogic = () => {

    const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteExercise, setConfirmDeleteExercise] = useState<boolean>(false);
    const [exerciseToDeleteId, setExerciseToDeleteId] = useState(null);
    const [partName, setPartName] = useState("");
    const [planInfo, setPlanInfo] = useState<PlanEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    return {
        exercisesList,
        isEdited,
        confirmDeleteExercise,
        exerciseToDeleteId,
        partName,
        planInfo,
        isLoading,
        setExercisesList,
        setIsEdited,
        setConfirmDeleteExercise,
        setExerciseToDeleteId,
        setPartName,
        setPlanInfo,
        setIsLoading,
    }
};

