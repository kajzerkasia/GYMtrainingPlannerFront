import React from 'react';

const ExercisesTableHead = () => {
    return (
        <thead>
        <tr>
            <td className="hidden"></td>
            <th className="tr-add">
                Kolejność
            </th>
            <th className="tr-add">
                Ćwiczenie
            </th>
            <th className="tr-add">
                Serie
            </th>
            <th className="tr-add">
                Powtórzenia
            </th>
            <th className="tr-add">
                Przerwa między seriami
            </th>
            <th className="tr-add">
                Wskazówki dotyczące ćwiczenia
            </th>
            <th className="tr-add">
                Poprawne wykonanie ćwiczenia (prawidłowy link)
            </th>
        </tr>
        </thead>
    );
};

export default ExercisesTableHead;