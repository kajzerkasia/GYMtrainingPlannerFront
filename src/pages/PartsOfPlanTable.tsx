import React from 'react';
import './PartsOfPlanTable.css';
import {GoBack} from "../components/GoBack/GoBack";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../components/DemoSign/DemoSign";
import usePartsOfPlanFunctions from "../hooks/usePartsOfPlanFunctions";
import PartsOfPlanElements from "../components/PartsOfPlanTable/PartsOfPlanElements";
import Modals from "../components/Modal/Modals";
import AddPartsOfPlanElements from "../components/PartsOfPlanTable/AddPartsOfPlanElements";
import PartsOfPlanTableHeader from "../components/PartsOfPlanTable/PartsOfPlanTableHeader";

export const PartsOfPlanTable = () => {

    const {
        isLoading,
        isEdited,
        itemsList,
        confirmDeleteItem,
        params,
        handleEditPartOfPlan,
        addPartOfPlan,
        deletePart,
        handleConfirmDelete,
        handleCancelDelete,
    } = usePartsOfPlanFunctions();

    if (isLoading || !itemsList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie częsci planu..</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </div>
        );
    }

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <thead>
                    <PartsOfPlanTableHeader
                        params={params}
                        itemsList={itemsList}
                    />
                    </thead>
                    <tbody>
                    <AddPartsOfPlanElements
                        addPartOfPlan={addPartOfPlan}
                        params={params}
                    />
                    <PartsOfPlanElements
                        itemsList={itemsList}
                        isEdited={isEdited}
                        handleEditPartOfPlan={handleEditPartOfPlan}
                        deletePart={deletePart}
                    />
                    </tbody>
                </table>
                <GoBack to={`/list`} text="Powrót do wszystkich planów"></GoBack>
            </div>
            <Modals
                confirmDeleteItem={confirmDeleteItem}
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
            />
        </div>
    )
}
