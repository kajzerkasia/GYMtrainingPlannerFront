import React, {ReactNode} from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbAlertTriangle, TbQuestionMark} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {Status} from 'types';
import UseModals from "../../hooks/useModals";
import Modal from "../Modal/Modal";
import {textInformation} from "../../constants/partsOfPlanTableTexts";
import {PartOfPlanEntity} from 'types';

interface AddTableElementsProps {
    children: ReactNode;
    handleSubmit: (values: PartOfPlanEntity, reset: () => void) => void | Promise<void>;
}

const AddTableElements = ({children, handleSubmit}: AddTableElementsProps) => {

    const {
        isValidationModalOpen,
        closeValidationModal,
        openValidationModal,
    } = UseModals();

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
                initialValues={{
                    name: '',
                }}
                onSubmit={async (values, reset) => {
                    if (!values.name) {
                        openValidationModal();
                    } else {
                        handleSubmit(values, reset);
                    }
                }}
                actionType={Status.Add}
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