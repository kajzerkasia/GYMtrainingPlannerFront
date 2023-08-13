import {useEffect, useState} from "react";
import {DetailEntity} from 'types';
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {useParams} from "react-router-dom";
import {useModal} from "./useModal";

export const usePlanDetailsTableLogic = () => {

    const [detailsList, setDetailsList] = useState<DetailEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    const params = useParams();

    const {
        setInformationModalIsOpen,
        setDemoModalIsOpen,
    } = useModal();

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
                    setPlanName(plan[0].name);
                    return fetch(`${apiUrl}/api/add-detail/details?planId=${plan[0].id}`, {
                        method: 'GET',

                    }).then(res => res.json())
                        .then((details) => {
                            if (!details) {
                                return Promise.reject('Brak szczegółów planu.')
                            } else {
                                setDetailsList(details);
                                setIsLoading(false);
                            }
                        })
                        .catch((error) => {
                            console.error("Wystąpił błąd podczas próby pobrania danych o szczegółach treningu.", error);
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

    const editDetail = async (values: DetailEntity, reset: () => void) => {
        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.length && values.frequency && values.schedule) {

            const res = await fetch(`${apiUrl}/api/add-detail/details/${values.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) {
                throw new Error('Wystąpił błąd podczas próby zaktualizowania informacji.');
            }

            setIsEdited(true);

            return await res.json();

        } else {
            setInformationModalIsOpen(true);
            reset();
        }

    };

    const handleUpdateDetail = (updatedDetail: DetailEntity) => {
        setDetailsList((detailsList) =>
            detailsList.map((detail) =>
                detail.id === updatedDetail.id ? updatedDetail : detail
            )
        );
    };

    return {
        detailsList,
        isEdited,
        isLoading,
        planName,
        setDetailsList,
        setIsEdited,
        setIsLoading,
        setPlanName,
        editDetail,
        handleUpdateDetail,
    }
};