import React, {useState} from 'react';
import {ExerciseEntity} from 'types';

export type ExerciseFormProps = {
    initialValues: ExerciseEntity;
    onSubmit: (values: ExerciseEntity, reset: () => void) => void | Promise<void>;
};

export const ExerciseForm = ({ initialValues, onSubmit }: ExerciseFormProps) => {
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
            <td>
                <input
                    type="text"
                    name="order"
                    // required
                    maxLength={49}
                    value={values.order}
                    onChange={(event) => handleChange('order', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="name"
                    // required
                    maxLength={99}
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    min={1}
                    name="series"
                    maxLength={3}
                    value={values.series}
                    onChange={(event) => handleChange('series', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="repetitions"
                    maxLength={49}
                    value={values.repetitions}
                    onChange={(event) => handleChange('repetitions', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="pause"
                    maxLength={49}
                    value={values.pause}
                    onChange={(event) => handleChange('pause', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="tips"
                    maxLength={49}
                    value={values.tips}
                    onChange={(event) => handleChange('tips', event.target.value)}
                />
            </td>
            <td>
                <input
                    type="url"
                    name="url"
                    maxLength={99}
                    value={values.url}
                    onChange={(event) => handleChange('url', event.target.value)}
                />
            </td>
            <td>
                <button type='button' onClick={() => onSubmit(values, reset)}>action</button>
            </td>
        </>
    );
};