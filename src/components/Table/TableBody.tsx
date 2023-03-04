import { ArrayOfParts } from 'types';
import {useEffect} from "react";

export const TableBody = ({ partsList }: ArrayOfParts) => {

    return (
        <>
            {partsList.map((part, index: number) => {
                return (
                    <tr key={index}>
                        <td>{part.order}</td>
                        <td>{part.exercise}</td>
                        <td>{part.series}</td>
                        <td>{part.repetitions}</td>
                        <td>{part.break}</td>
                        <td>{part.tips}</td>
                        <td>{part.url}</td>
                    </tr>
                )
            })}
        </>
    )
};