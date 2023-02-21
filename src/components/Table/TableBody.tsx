import { ArrayOfParts } from 'types';

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
                        <td>{part.tempo}</td>
                        <td>{part.break}</td>
                        <td>{part.url}</td>
                    </tr>
                )
            })}
        </>
    )
};