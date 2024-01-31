import React, {ReactNode} from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbAlertTriangle, TbQuestionMark} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {Status} from 'types';
import UseModals from "../../hooks/useModals";
import Modal from "../Modal/Modal";
import {textInformation} from "../../constants/partsOfPlanTableTexts";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface AddTableElementsProps {
    children: ReactNode;
    handleSubmit: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    availableFields: (keyof Record<string, any>)[];
}

const AddTableElements = ({children, handleSubmit, availableFields}: AddTableElementsProps) => {

    const {
        isValidationModalOpen,
        closeValidationModal,
        openValidationModal,
    } = UseModals();

    interface ItemsState {
        itemsList: { [key: string]: string }[];
    }

    const {itemsList} = useSelector((state: RootState) => state.items) as unknown as ItemsState;

    const initialValues = itemsList.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
            acc[key] = '';
        });
        return acc;
    }, {} as { [key: string]: string });

    return (
        <tr>
            <Modal
                open={isValidationModalOpen}
                onClose={closeValidationModal}
                onCancel={closeValidationModal}
                modalText={textInformation}
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <td className="question-td">
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <Link to="/instruction"><TbQuestionMark/></Link>
                </IconContext.Provider>
            </td>
            <TableForm
                initialValues={initialValues}
                onSubmit={async (values, reset) => {
                    const allValuesDefined = availableFields.every(field => values[field] !== '' && values[field] !== undefined);
                    if (allValuesDefined) {
                        handleSubmit(values, reset);
                    } else {
                        openValidationModal();
                    }
                }}
                actionType={Status.Add}
                availableFields={availableFields}
            />
            <td className="td-progression-rules">
                <IconContext.Provider value={{className: 'react-icons-progression'}}>
                    {children}
                </IconContext.Provider>
            </td>
        </tr>
    );
};

export default AddTableElements;