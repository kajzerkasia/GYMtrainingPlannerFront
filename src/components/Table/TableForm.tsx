import React from 'react';
import {PartOfPlanEntity, Status} from 'types';
import {TbPlus, TbCheck} from "react-icons/tb";
import {IconContext} from "react-icons";
import '../../pages/Table.css';
import {useDispatch} from "react-redux";
import {itemsActions} from "../../store/features/items/items-slice";

export type TableFormProps = {
    initialValues: any;
    onSubmit: (values: PartOfPlanEntity, reset: () => void) => void | Promise<void>;
    actionType: Status;
    children?: any;
    values?: any;
};

export const TableForm = ({initialValues, onSubmit, actionType, children, values}: TableFormProps) => {
    const dispatch = useDispatch();


    const reset = () => {
        dispatch(itemsActions.setItemsList(initialValues));
    }

    return (
        <>
            {children}
            <td>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <button type='button' onClick={() => onSubmit(values, reset)}>{actionType === Status.Add ? <TbPlus/> : <TbCheck/>}</button>
                </IconContext.Provider>
            </td>
        </>
    );
};