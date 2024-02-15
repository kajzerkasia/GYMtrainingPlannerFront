import React from 'react';
import TableHead from "./TableHead/TableHead";

const ExercisesTableHead = () => {
    return (
        <TableHead>
        <tr>
            <td style={{border: 'none', visibility: 'hidden'}}></td>
            <th>
                Kolejność
            </th>
            <th>
                Ćwiczenie
            </th>
            <th>
                Serie
            </th>
            <th>
                Powtórzenia
            </th>
            <th>
                Przerwa między seriami
            </th>
            <th>
                Wskazówki dotyczące ćwiczenia
            </th>
            <th>
                Poprawne wykonanie ćwiczenia
            </th>
        </tr>
        </TableHead>
    );
};

export default ExercisesTableHead;