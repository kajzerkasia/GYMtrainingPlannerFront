import React from 'react';

import {PlanDetailsForm} from "./PlanDetailsForm";
import './PlanDetailsTable.css'

export const PlanDetailsTable = () => {
    return (
        <div>
            <table className="main-table">

                <thead>
                <tr>
                    <td colSpan={1}>
                        <h1>Długość cyklu:</h1>
                    </td>
                </tr>
                <tr>
                    <td colSpan={1}>
                        <h1>Częstotliwość:</h1>
                    </td>
                </tr>
                <tr>
                    <td colSpan={1}>
                        <h1>Rozkład:</h1>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr className="tr-add">
                    <PlanDetailsForm/>

                    <td className="td-plan-details">

                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};
