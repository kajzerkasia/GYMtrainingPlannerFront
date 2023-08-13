import React, {useEffect, useState} from 'react';
import {DetailEntity} from 'types';
import {PlanDetailsForm} from "./PlanDetailsForm";
import {apiUrl} from "../../config/api";
import './PlanDetailsTable.css'
import {IconContext} from "react-icons";
import {TbHeartbeat} from "react-icons/tb";
import {useParams} from "react-router-dom";
import {MoonLoader} from "react-spinners";
import {isDemoEnabled} from "../../helpers/env";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {textInformation} from "../../constants/planDetailsTableTexts";
import {useModal} from "../../hooks/useModal";
import {usePlanDetailsTableLogic} from "../../hooks/usePlanDetailsTableLogic";

export const PlanDetailsTable = () => {

    const {
        detailsList,
        isEdited,
        isLoading,
        planName,
        setDetailsList,
        setIsEdited,
        setIsLoading,
        setPlanName,
    } = usePlanDetailsTableLogic();

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeModal,
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
            <DemoSign/>
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
                        onSubmit={async (values, reset) => {
                                await editDetail(values, reset);
                                await handleUpdateDetail(values);
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
                text={textInformation}
            />
            {demoModalIsOpen && (
                <DemoModal
                    isOpen={demoModalIsOpen}
                    onRequestClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    text={demoText}
                />
            )}
        </div>
    );
};

