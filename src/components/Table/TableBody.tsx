import React from "react";
import { ArrayOfParts } from 'types';

export const TableBody = ({exercisesList, updateTable, editTable}: ArrayOfParts | any) => {
    const inputRef = React.useRef()

    return (
        <>
            {exercisesList.map((exercise: any) => {
                return (
                    <tr key={exercise.id}>
                        <td>
                            <input
                                type="text"
                                name="order"
                                required
                                maxLength={49}
                                // value={part.order}
                                defaultValue={exercise.order}
                                ref={inputRef.current}
                                // onChange={e => updateTable('order', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="exercise"
                                required
                                maxLength={99}
                                value={exercise.exercise}
                                // onChange={e => updateTable('exercise', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                name="series"
                                maxLength={3}
                                value={exercise.series}
                                // onChange={e => updateTable('series', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="repetitions"
                                maxLength={49}
                                value={exercise.repetitions}
                                // onChange={e => updateTable('repetitions', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="break"
                                maxLength={49}
                                value={exercise.break}
                                // onChange={e => updateTable('break', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="tips"
                                maxLength={49}
                                value={exercise.tips}
                                // onChange={e => updateTable('tips', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="url"
                                name="url"
                                maxLength={99}
                                value={exercise.url}
                                // onChange={e => updateTable('url', e.target.value)}
                            />
                        </td>
                    </tr>
                )
            })}
        </>
    )
};