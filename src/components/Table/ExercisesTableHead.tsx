import React from 'react';
import classes from './ExercisesTableHead.module.css';

const ExercisesTableHead = () => {
    return (
        <thead>
        <tr>
            <td className={classes.hidden}></td>
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