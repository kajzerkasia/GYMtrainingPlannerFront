import React, {useState} from 'react';
import {Status} from 'types';
import {TbPlus, TbCheck, TbLink} from "react-icons/tb";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {validateURL} from "../../helpers/validateUrl";
import classes from './TableForm.module.css';
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";

export type TableFormProps<T> = {
    onSubmit: (values: T, reset: () => void) => void | Promise<void>;
    actionType: Status;
    children?: React.ReactNode;
    initialValues: T;
    availableFields: (keyof T)[];
};

export const TableForm = <T extends Record<string, any>>({onSubmit, actionType, initialValues, availableFields}: TableFormProps<T>) => {
    const [values, setValues] = useState(initialValues);
    const [urlError, setUrlError] = useState<string | null>(null);

    const {isEdited} = useSelector((state: RootState) => state.items);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange = (field: keyof T, value: string) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));

        if (field === 'url' && value && !validateURL(value)) {
            setUrlError('Podaj poprawny adres URL');
        } else {
            setUrlError(null);
        }
    };

    const renderInput = (field: keyof T) => (
        <td
            key={field as string}
            className={`${classes.td}
            ${field === 'order' ? `${classes.narrower}` : ''} 
            ${field === 'series' ? `${classes.narrower}` : ''}
              ${field === 'repetitions' ? `${classes.narrower}` : ''}
                 ${field === 'pause' ? `${classes.narrower}` : ''}
            `}
        >
            {field === 'url' ? (
                <>
                    <input
                        placeholder="Link do filmu instruktażowego"
                        className={isEdited ? `${classes.edited_input}` : `${classes.input}`}
                        type="url"
                        name={field as string}
                        required
                        value={values[field] || ''}
                        onChange={(event) => handleChange(field, event.target.value)}
                    />
                    <div>
                        <label htmlFor="url"></label>
                        <a
                            href={values.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {actionType === Status.Add || !values.url ? '' :
                                <IconProvider>
                                    <TbLink/>
                                </IconProvider>
                            }
                        </a>
                    </div>
                    {urlError && <div className={classes.error_message}>{urlError}</div>}
                </>
            ) : (
                <input
                    placeholder="..."
                    className={isEdited ? `${classes.edited_input}` : `${classes.input}`}
                    type="text"
                    name={field as string}
                    required
                    value={values[field] || ''}
                    onChange={(event) => handleChange(field, event.target.value)}
                />
            )}
        </td>
    );

    const fieldsToRender = availableFields || Object.keys(initialValues);

    const inputElements = fieldsToRender.map((field) => renderInput(field as keyof T));

    return (
        <>
            {inputElements}
            <TableData>
                <IconProvider>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconProvider>
            </TableData>
        </>
    );
};