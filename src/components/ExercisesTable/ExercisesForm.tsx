import React, {useState} from 'react';
import {ExerciseEntity, Status} from 'types';
import {TbCheck, TbPlus, TbLink} from "react-icons/tb";
import {IconContext} from "react-icons";

import './ExercisesTable.css';

export type ExerciseFormProps = {
    initialValues: ExerciseEntity;
    onSubmit: (values: ExerciseEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    isEdited?: boolean;
};

export const ExercisesForm = ({initialValues, onSubmit, actionType, isEdited}: ExerciseFormProps) => {
    const [values, setValues] = useState<ExerciseEntity>(() => initialValues);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof ExerciseEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    return (
        <>
            <td className="exercise-order">
                <input
                    className={isEdited ? 'edited-input-exercise' : ''}
                    type="text"
                    name="order"
                    required
                    value={values.order}
                    onChange={(event) => handleChange('order', event.target.value)}
                />
            </td>
            <td className="exercise-name">
                <input
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td className="exercise-series">
                <input
                    type="number"
                    min={1}
                    name="series"
                    value={values.series}
                    onChange={(event) => handleChange('series', event.target.value)}
                />
            </td>
            <td className="exercise-repetitions">
                <input
                    type="text"
                    name="repetitions"
                    value={values.repetitions}
                    onChange={(event) => handleChange('repetitions', event.target.value)}
                />
            </td>
            <td className="exercise-pause">
                <input
                    type="text"
                    name="pause"
                    value={values.pause}
                    onChange={(event) => handleChange('pause', event.target.value)}
                />
            </td>
            <td className="exercise-tips">
                <textarea className="exercise-textarea"
                    // type="text"
                          name="tips"
                          value={values.tips}
                          onChange={(event) => handleChange('tips', event.target.value)}
                />
            </td>
            <td className="exercise-url">
                <input
                    className="input-url"
                    type="url"
                    name="url"
                    value={values.url}
                    onChange={(event) => handleChange('url', event.target.value)}
                />
                <div className="exercise-link">
                    <label htmlFor="url"></label>
                    <a
                        href={values.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {actionType === Status.Add || !values.url ? '' :
                            <IconContext.Provider value={{className: 'react-icons-link'}}>
                                <TbLink/>
                            </IconContext.Provider>
                        }
                    </a>
                </div>
            </td>
            <td className="icon-add-edit">
                <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus style={{color: "#310942"}}/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};

// TODO: change all links to shorter and clickable - it's easy I think, fix inputs - should be able to write more text in it.
// TODO: WAŻNE!! Ogarnąć żeby dało się usuwać też części planu, które mają ćwiczenia! - na backendzie w record