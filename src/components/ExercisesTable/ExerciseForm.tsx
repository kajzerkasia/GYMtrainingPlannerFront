import React, {useState} from 'react';
import {ExerciseEntity, Status} from 'types';
import {TbCheck, TbPlus} from "react-icons/tb";
import {IconContext} from "react-icons";

import './ExercisesTable.css';

export type ExerciseFormProps = {
    initialValues: ExerciseEntity;
    onSubmit: (values: ExerciseEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    isEdited?: boolean;
};

export const ExerciseForm = ({ initialValues, onSubmit, actionType, isEdited }: ExerciseFormProps) => {
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
                    maxLength={49}
                    value={values.order}
                    onChange={(event) => handleChange('order', event.target.value)}
                />
            </td>
            <td className="exercise-name">
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={99}
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td className="exercise-series">
                <input
                    type="number"
                    min={1}
                    name="series"
                    maxLength={3}
                    value={values.series}
                    onChange={(event) => handleChange('series', event.target.value)}
                />
            </td>
            <td className="exercise-repetitions">
                <input
                    type="text"
                    name="repetitions"
                    maxLength={49}
                    value={values.repetitions}
                    onChange={(event) => handleChange('repetitions', event.target.value)}
                />
            </td>
            <td className="exercise-pause">
                <input
                    type="text"
                    name="pause"
                    maxLength={49}
                    value={values.pause}
                    onChange={(event) => handleChange('pause', event.target.value)}
                />
            </td>
            <td className="exercise-tips">
                <input
                    type="text"
                    name="tips"
                    maxLength={49}
                    value={values.tips}
                    onChange={(event) => handleChange('tips', event.target.value)}
                />
            </td>
            <td className="exercise-url">
                <input
                    type="url"
                    name="url"
                    maxLength={99}
                    value={values.url.replace(/^https?:\/\/(www\.)?/i, '')}
                    onChange={(event) => handleChange('url', event.target.value)}
                />
            </td>
            <td className="icon-add-edit">
                <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{ actionType === Status.Add ? <TbPlus/> : <TbCheck/> }</button>
                </IconContext.Provider>
            </td>
        </>
    );
};