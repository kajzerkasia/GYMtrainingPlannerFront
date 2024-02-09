import React from 'react';

const ExercisesTableHead = () => {
    return (
        <thead>
        <tr>
            <td style={{border: 'none'}}></td>
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
        </thead>
    );
};

export default ExercisesTableHead;