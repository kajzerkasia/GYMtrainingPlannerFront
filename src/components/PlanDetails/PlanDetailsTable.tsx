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

// @TODO: Zrobić komponent, może dodać możliwość zmiany nazwy planu lub dodać th właściciel planu czy coś takiego, ogarnąć sytuację w której chcę usunąć część planu, w której są ćwiczenia, może jakieś większe ostrzeżenie wtedy dodać i ogólnie żeby nie wywalało wtedy błedu w bazie danych, ogarnąć długości pól w bazie danych i na BE - zobaczę przy dodawaniu planu Piotrka ile znaków schodzi na dane pola.
