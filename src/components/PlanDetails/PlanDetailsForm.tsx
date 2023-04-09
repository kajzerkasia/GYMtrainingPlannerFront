import React, {useState} from 'react';
import {DetailEntity} from 'types';
import {IconContext} from "react-icons";
import {TbCheck} from "react-icons/tb";
import './PlanDetailsTable.css'

export type DetailFormProps = {
    initialValues: DetailEntity;
    onSubmit: (values: DetailEntity) => void | Promise<void>;
    isEdited?: boolean;
};

export const PlanDetailsForm = ({ initialValues, onSubmit, isEdited}: DetailFormProps) => {
    const [values, setValues] = useState<DetailEntity>(() => initialValues);

    const handleChange: (field: keyof DetailEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    return (
        <>
            <td className="details-length">
                <input
                    placeholder="Długość cyklu treningowego"
                    className={isEdited ? 'edited-input-details' : 'input-detail'}
                    type="text"
                    name="length"
                    value={values.length}
                    onChange={(event) => handleChange('length', event.target.value)}
                />
            </td>
            <td className="details-frequency">
                <input
                    placeholder="Częstotliwość treningów"
                    className={isEdited ? 'edited-input-details' : 'input-detail'}
                    type="text"
                    name="frequency"
                    value={values.frequency}
                    onChange={(event) => handleChange('frequency', event.target.value)}
                />
            </td>
            <td className="details-schedule">
                <input
                    placeholder="Rozkład treningów"
                    className={isEdited ? 'edited-input-details' : 'input-detail'}
                    type="text"
                    name="schedule"
                    value={values.schedule}
                    onChange={(event) => handleChange('schedule', event.target.value)}
                />
            </td>

            <td className="td-detail">
                <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                    <button type='button' onClick={() => onSubmit(values)}><TbCheck/></button>
                </IconContext.Provider>
            </td>
        </>
    );
};
