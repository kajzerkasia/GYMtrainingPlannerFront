import React, {ReactNode} from 'react';
import {TbAlertTriangle, TbQuestionMark} from "react-icons/tb";
import {TableForm} from "./TableForm";
import useValidationModal from "../../hooks/modals/useValidationModal";
import Modal from "../Modal/Modal";
import {modalTextMoreElementsAdd, modalTextSingleElementAdd} from "../../constants/tableModalTexts";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import IconProvider from "../IconProvider/IconProvider";
import TableButtonContainer, {VariantOption} from "./TableButton/TableButtonContainer";
import {Status} from "../../constants/types";
import {LinkProps} from "./TableBody";

interface AddTableElementsProps {
    children: ReactNode;
    handleSubmit: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    availableFields: (keyof Record<string, any>)[];
    links?: LinkProps[];
}

const AddTableElements = ({children, handleSubmit, availableFields, links}: AddTableElementsProps) => {

    const {
        isValidationModalOpen,
        closeValidationModal,
        openValidationModal,
    } = useValidationModal();

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
                modalText={
                    availableFields.length === 1
                        ? modalTextSingleElementAdd
                        : modalTextMoreElementsAdd
                }
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <TableButtonContainer
                elementVariant={VariantOption.link}
                to="/instruction"
            >
                <IconProvider>
                    <TbQuestionMark/>
                </IconProvider>
            </TableButtonContainer>
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
            {availableFields.length === 1 && availableFields[0] === 'name' && links && (
                <TableButtonContainer
                    elementVariant={VariantOption.link}
                    to={links[0].path}
                >
                    <IconProvider>
                        {children}
                    </IconProvider>
                </TableButtonContainer>
            )}
        </tr>
    );
};

export default AddTableElements;