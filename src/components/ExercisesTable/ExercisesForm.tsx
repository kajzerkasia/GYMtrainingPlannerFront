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
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="order"
                    value={values.order}
                    onChange={(event) => handleChange('order', event.target.value)}
                />
            </td>
            <td className="exercise-name">
                <input
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td className="exercise-series">
                <input
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="series"
                    value={values.series}
                    onChange={(event) => handleChange('series', event.target.value)}
                />
            </td>
            <td className="exercise-repetitions">
                <input
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="repetitions"
                    value={values.repetitions}
                    onChange={(event) => handleChange('repetitions', event.target.value)}
                />
            </td>
            <td className="exercise-pause">
                <input
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="pause"
                    value={values.pause}
                    onChange={(event) => handleChange('pause', event.target.value)}
                />
            </td>
            <td className="exercise-tips">
                <textarea
                    className={isEdited ? 'edited-exercise-textarea' : 'exercise-textarea'}
                    name="tips"
                    value={values.tips}
                    onChange={(event) => handleChange('tips', event.target.value)}
                />
            </td>
            <td className="exercise-url">
                <input
                    className={isEdited ? 'edited-input-exercise-url' : 'input-exercise input-url'}
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
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};

