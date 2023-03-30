import React, {useState} from 'react';
import {PartOfPlanEntity, Status} from 'types';
import {Logo} from "../Logo/Logo";

import { TbBarbell, TbPlus, TbCheck} from "react-icons/tb";
import { IconContext } from "react-icons";

export type PartsOfPlanFormProps = {
    initialValues: PartOfPlanEntity;
    onSubmit: (values: PartOfPlanEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
};

export const PartsOfPlanForm = ({ initialValues, onSubmit, actionType }: PartsOfPlanFormProps) => {
    const [values, setValues] = useState<PartOfPlanEntity>(() => initialValues);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof PartOfPlanEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    return (
        <>
            <td>
                <input className="input-part"
                    type="text"
                    name="name"
                    required
                    maxLength={99}
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
                <IconContext.Provider value={{ className: 'react-icons' }}>
                    <Logo to="/exercises" text={<TbBarbell/>}/>
                </IconContext.Provider>
            </td>
            <td>
                <IconContext.Provider value={{ className: 'react-icons' }}>
                <button type='button' onClick={() => onSubmit(values, reset)}>{ actionType === Status.Add ? <TbPlus/> : <TbCheck/> }</button>
                </IconContext.Provider>
            </td>
        </>
    );
};