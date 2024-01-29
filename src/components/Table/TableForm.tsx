import React, {useState} from 'react';
import {Status} from 'types';
import {TbPlus, TbCheck} from "react-icons/tb";
import {IconContext} from "react-icons";
import '../../pages/Table.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export type TableFormProps<T> = {
    onSubmit: (values: T, reset: () => void) => void | Promise<void>;
    actionType: Status;
    children?: React.ReactNode;
    initialValues: T;
    availableFields: (keyof T)[];
};

export const TableForm = <T extends Record<string, any>>({ onSubmit, actionType, initialValues, availableFields }: TableFormProps<T>) => {
    const [values, setValues] = useState(initialValues);

    const {isEdited} = useSelector((state: RootState) => state.items);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange = (field: keyof T, value: string) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    const renderInput = (field: keyof T) => (
        <td key={field as string} className="input-part-add">
            <input
                placeholder={`Podaj ${field as string}`}
                className={isEdited ? 'edited-input' : 'input-part'}
                type="text"
                name={field as string}
                required
                value={values[field]}
                onChange={(event) => handleChange(field, event.target.value)}
            />
        </td>
    );

    const fieldsToRender = availableFields || Object.keys(initialValues);

    const inputElements = fieldsToRender.map((field) => renderInput(field as keyof T));

    return (
        <>
            {inputElements}
            <td>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};