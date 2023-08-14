import React from 'react';
import {PlanDetailsForm} from "./PlanDetailsForm";
import './PlanDetailsTable.css'
import {IconContext} from "react-icons";
import {TbHeartbeat} from "react-icons/tb";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import {demoText} from "../../constants/demoText";
import {InformationModal} from "../InformationModal/InformationModal";
import {DemoModal} from "../DemoModal/DemoModal";
import {textInformation} from "../../constants/planDetailsTableTexts";
import {usePlanDetailsTableLogic} from "../../hooks/usePlanDetailsTableLogic";

export const PlanDetailsTable = () => {

    const {
        detailsList,
        isEdited,
        isLoading,
        planName,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
        editDetail,
        handleUpdateDetail,
    } = usePlanDetailsTableLogic();

    if (isLoading || !detailsList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie szczegółów...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
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
            <DemoModal
                isOpen={demoModalIsOpen}
                onRequestClose={closeDemoModal}
                onConfirm={closeDemoModal}
                text={demoText}
            />
        </div>
    );
};

