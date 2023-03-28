import React, {useState} from 'react';
import {RuleEntity, Status} from 'types';
import './RulesTable.css';
import {IconContext} from "react-icons";
import {TbCheck, TbPlus} from "react-icons/tb";

export type RuleFormProps = {
    initialValues: RuleEntity;
    onSubmit: (values: RuleEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
};

export const RulesForm = ({ initialValues, onSubmit, actionType }: RuleFormProps) => {
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
                <input className="input-rule"
                    type="text"
                    name="rule"
                    // required
                    maxLength={49}
                    value={values.rule}
                    onChange={(event) => handleChange('rule', event.target.value)}
                />
            </td>
            <td>
                <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{ actionType === Status.Add ? <TbPlus/> : <TbCheck/> }</button>
                </IconContext.Provider>
            </td>
        </>
    );
};
