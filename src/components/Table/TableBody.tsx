import { ArrayOfParts } from 'types';
import {useEffect, useState} from "react";
import {PartOfPlanEntity} from 'types';

export const TableBody = () => {
    const[partsList, setPartsList] = useState<PartOfPlanEntity[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-exercise`, {
            method: 'GET'
        }).then(res => res.json())
            .then((parts) => {
                setPartsList(parts)
            })
    }, [])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/exercises`, {
            method: 'GET'
        }).then(res => res.json())
            .then((parts) => {
                setPartsList(parts)
            })
    }, []);

    return (
        <>
            {partsList.map((part: any, index: number) => {
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