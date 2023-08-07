import React, {useEffect, useState} from 'react';
import {DetailEntity} from 'types';
import {PlanDetailsForm} from "./PlanDetailsForm";
import {InformationModal} from "../InformationModal/InformationModal";
import {apiUrl} from "../../config/api";
import './PlanDetailsTable.css'
import {IconContext} from "react-icons";
import {TbHeartbeat} from "react-icons/tb";
import {useParams} from "react-router-dom";
import {MoonLoader} from "react-spinners";

export const PlanDetailsTable = () => {
    const [detailsList, setDetailsList] = useState<DetailEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    const textInformation = 'Należy podać wszystkie informacje o szczegółach planu treningowego!'

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

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const editDetail = async (values: DetailEntity) => {
        setIsEdited(false);

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

    };

    const handleUpdateDetail = (updatedDetail: DetailEntity) => {
        setDetailsList((detailsList) =>
            detailsList.map((detail) =>
                detail.id === updatedDetail.id ? updatedDetail : detail
            )
        );
    };

    if (isLoading || !detailsList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie szczegółów...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

    return (
        <div className="details-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <div className="inner-container">
                <h2>{planName}</h2>
            </div>
            <table className="details-table">

                <thead>
                <tr>
                 <th>Długość cyklu</th>
                 <th>Częstotliwość</th>
                 <th>Rozkład</th>
                </tr>
                </thead>

                <tbody>

                {detailsList.map((detail) => (
                    <tr key={`${detail.id}`}>
                    <PlanDetailsForm
                        initialValues={detail}
                        onSubmit={async (values) => {
                            if (values.length && values.frequency && values.schedule) {
                                await editDetail(values);
                                await handleUpdateDetail(values);
                            } else {
                                setInformationModalIsOpen(true);
                                values.length = detail.length;
                                values.frequency = detail.frequency
                                values.schedule = detail.schedule;
                            }
                        }}
                        isEdited={isEdited}
                    />
                    </tr>
                ))}

                </tbody>
            </table>
            <button className="btn-back-exercises" onClick={() => window.history.back()}>
                Powrót
            </button>
            <InformationModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                onCancel={closeModal}
                text={textInformation}
            />
        </div>
    );
};

