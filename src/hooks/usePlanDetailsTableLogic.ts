import {useState} from "react";
import {DetailEntity} from 'types';

export const usePlanDetailsTableLogic = () => {

    const [detailsList, setDetailsList] = useState<DetailEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    return {
        detailsList,
        isEdited,
        isLoading,
        planName,
        setDetailsList,
        setIsEdited,
        setIsLoading,
        setPlanName,
    }
};