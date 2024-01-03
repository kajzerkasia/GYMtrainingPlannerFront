import React from 'react';
import './PartsOfPlanTable.css';
import {GoBack} from "../GoBack/GoBack";
import {MoonLoader} from "react-spinners";
import {DemoSign} from "../DemoSign/DemoSign";
import usePartsOfPlanFunctions from "../../hooks/usePartsOfPlanFunctions";
import PartsOfPlanElements from "./PartsOfPlanElements";
import Modals from "../Modal/Modals";
import AddPartsOfPlanElements from "./AddPartsOfPlanElements";
import PartsOfPlanTableHeader from "./PartsOfPlanTableHeader";

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
                    <PartsOfPlanTableHeader params={params}/>
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
