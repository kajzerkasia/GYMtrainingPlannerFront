import React, {useState} from 'react';
import {RuleEntity, Status} from 'types';
import {IconContext} from "react-icons";
import {TbCheck, TbPlus} from "react-icons/tb";

import './RulesTable.css';

export type RuleFormProps = {
    initialValues: RuleEntity;
    onSubmit: (values: RuleEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    isEdited?: boolean;
};

export const RulesForm = ({initialValues, onSubmit, actionType, isEdited}: RuleFormProps) => {
    const [values, setValues] = useState<RuleEntity>(() => initialValues);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof RuleEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    return (
        <>
            <td>
                <textarea
                    placeholder="Podaj zasadę progresji w bieżącym planie treningowym"
                    className={isEdited ? 'textarea-rule-edited' : 'textarea-rule'}
                    name="rule"
                    required
                    value={values.rule}
                    onChange={(event) => handleChange('rule', event.target.value)}
                />
            </td>
            <td className="td-rule">
                <IconContext.Provider value={{className: 'react-icons-smaller'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};
