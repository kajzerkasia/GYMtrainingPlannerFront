import React from 'react';
import TableHead from "../TableHead/TableHead";

const PlanDetailsTableHead = () => {
    return (
        <TableHead>
        <tr>
            <th>Długość cyklu</th>
            <th>Częstotliwość</th>
            <th>Rozkład</th>
        </tr>
        </TableHead>
    );
};

export default PlanDetailsTableHead;