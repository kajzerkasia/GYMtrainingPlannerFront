import React, {useState} from 'react';
import {TbPlus, TbCheck} from "react-icons/tb";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {validateURL} from "../../helpers/validateUrl";
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";
import {FormField} from "./FormField/FormField";
import {Status} from "../../constants/types";

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
        <FormField
            key={field as string}
            field={field}
            values={values}
            isEdited={isEdited}
            handleChange={handleChange}
            urlError={urlError}
            actionType={actionType}
        />
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