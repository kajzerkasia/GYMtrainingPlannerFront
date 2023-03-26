import React, {useState} from 'react';
import {RuleEntity, Status} from 'types';

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
                <input
                    type="text"
                    name="rule"
                    // required
                    maxLength={49}
                    value={values.rule}
                    onChange={(event) => handleChange('rule', event.target.value)}
                />
            </td>
            <td>
                <button type='button' onClick={() => onSubmit(values, reset)}>{actionType}</button>
            </td>
        </>
    );
};
