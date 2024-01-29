import React, {useState} from 'react';
import {PartOfPlanEntity, Status, ExerciseEntity, PlanEntity} from 'types';
import {TbPlus, TbCheck} from "react-icons/tb";
import {IconContext} from "react-icons";
import '../../pages/Table.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export type TableFormProps = {
    onSubmit: (values: PartOfPlanEntity | ExerciseEntity | PlanEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    children?: any;
    values?: any;
    initialValues: any;
};

export const TableForm = ({onSubmit, actionType, initialValues}: TableFormProps) => {

    const [values, setValues] = useState<PartOfPlanEntity>(() => initialValues);

    const {isEdited} = useSelector((state: RootState) => state.items);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof PartOfPlanEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    // @TODO: render dynamic list of inputs depend on which table/entity

    return (
        <>
            <td className="input-part-add">
                <input
                    placeholder="Podaj nazwę części planu, którą chcesz dodać"
                    className={isEdited ? 'edited-input' : 'input-part'}
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};