import React, {useState} from 'react';
import {PlanEntity, Status} from 'types';
import {TbPlus, TbCheck, TbCalendarPlus} from "react-icons/tb";
import {IconContext} from "react-icons";
import './PlansList.css';
import {CalendarModal} from "../CalendarModal/CalendarModal";

export type PlansListFormProps = {
    initialValues: PlanEntity;
    onSubmit: (values: PlanEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    isEdited?: boolean;
};

export const PlansListForm = ({initialValues, onSubmit, actionType, isEdited}: PlansListFormProps) => {
    const [values, setValues] = useState<PlanEntity>(() => initialValues);
    const [calendarModalIsOpen, setCalendarModalIsOpen] = useState<boolean>(false);


    const text = 'Kalendarz';

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof PlanEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    const openCalendarModal = () => {
        setCalendarModalIsOpen(true);
    }

    const closeCalendarModal = () => {
        setCalendarModalIsOpen(false);
    }

    return (
        <>
            <td className="input-plan-add" colSpan={2}>
                <input
                    placeholder="Podaj nazwę planu, który chcesz dodać"
                    className={isEdited ? 'edited-input' : 'input-plan'}
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td colSpan={1}>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
            {actionType === Status.Add &&
                <td>
                    <IconContext.Provider value={{className: 'react-icons'}}>
                        <button onClick={() => openCalendarModal()}><TbCalendarPlus/></button>
                    </IconContext.Provider>
                </td>}
            <CalendarModal
                isOpen={calendarModalIsOpen}
                onRequestClose={closeCalendarModal}
                onConfirm={closeCalendarModal}
                onCancel={closeCalendarModal}
                text={text}
            />
        </>
    );
};