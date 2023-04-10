import React, {useEffect, useState} from 'react';
import {DetailEntity} from 'types';
import {PlanDetailsForm} from "./PlanDetailsForm";
import './PlanDetailsTable.css'
import {Logo} from "../Logo/Logo";
import {InformationModal} from "../InformationModal/InformationModal";

export const PlanDetailsTable = () => {
    const [detailsList, setDetailsList] = useState<DetailEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);

    const textInformation = 'Podaj informacje o szczegółach planu treningowego!'

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`${process.env.REACT_APP_API_URL}/add-detail/details`, {
            method: 'GET'
        }).then(res => res.json())
            .then((details) => {
                setDetailsList(details)
            })

        return () => {
            try {
                abortController.abort()
            } catch {}
        };
    }, [])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const editDetail = async (values: DetailEntity) => {
        setIsEdited(false);

        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-detail/details/${values.id}`, {
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

    return (
        <div className="details-wrapper">
            <Logo to="/plans" text="Gym Training Planner"/>
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
                            }
                        }}
                        isEdited={isEdited}
                    />
                    </tr>
                ))}

                </tbody>
            </table>
            <Logo to="/plans" text="Powrót do strony głównej"></Logo>
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


