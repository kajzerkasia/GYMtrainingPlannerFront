import { ArrayOfParts } from 'types';
import React, {useEffect, useState} from "react";
import {PartOfPlanEntity} from 'types';
import {VscAdd} from "react-icons/vsc";

export const TableBody = ({partsList, updateTable, editTable}: ArrayOfParts | any) => {
    const inputRef = React.useRef()

    return (
        <>
            {partsList.map((part: any) => {
                return (
                    <tr key={part.id}>
                        <td>
                            <input
                                type="text"
                                name="order"
                                required
                                maxLength={49}
                                // value={part.order}
                                defaultValue={part.order}
                                ref={inputRef.current}
                                onChange={e => updateTable('order', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="exercise"
                                required
                                maxLength={99}
                                value={part.exercise}
                                onChange={e => updateTable('exercise', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={1}
                                name="series"
                                maxLength={3}
                                value={part.series}
                                onChange={e => updateTable('series', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="repetitions"
                                maxLength={49}
                                value={part.repetitions}
                                onChange={e => updateTable('repetitions', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="break"
                                maxLength={49}
                                value={part.break}
                                onChange={e => updateTable('break', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="tips"
                                maxLength={49}
                                value={part.tips}
                                onChange={e => updateTable('tips', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="url"
                                name="url"
                                maxLength={99}
                                value={part.url}
                                onChange={e => updateTable('url', e.target.value)}
                            />
                        </td>
                    </tr>
                )
            })}
        </>
    )
};