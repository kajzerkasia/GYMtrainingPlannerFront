import React from 'react';
import {IconContext} from "react-icons";
import {TbAlertTriangle, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {Status} from 'types';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {editPartOfPlan} from "../../store/actions/parts-of-plan/updating/updating-action";
import {UseModal} from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import UseModals from "../../hooks/useModals";
import {deletePartOfPlan} from "../../store/actions/parts-of-plan/deleting/deleting-action";

const TableElements = ({children}: any) => {
    const dispatch = useDispatch();

    const {isEdited, itemsList} = useSelector((state: RootState) => state.items);

    const {setDemoModalIsOpen, setInformationModalIsOpen, closeDemoModal} = UseModal();


    const {
        isConfirmDeleteModalOpen,
        isValidationModalOpen,
        closeValidationModal,
        closeConfirmDeleteModal,
        openConfirmDeleteModal,
        openValidationModal,
    } = UseModals();

    const handleConfirmDelete = async () => {
        dispatch(deletePartOfPlan(closeDemoModal) as any);
    };

    const deletePart = (partId: string | undefined) => {
        openConfirmDeleteModal();
        if (partId) {
            dispatch(itemsActions.setConfirmDeleteItem(true));
            dispatch(itemsActions.setItemToDeleteId(partId));
        }
    };

    return (
        <>
            <Modal
                open={isConfirmDeleteModalOpen}
                onClose={closeConfirmDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirmDeleteModal}
                modalText={text}
                confirmText="Tak"
                cancelText="Nie"
                icon={TbAlertTriangle}
            />
            <Modal
                open={isValidationModalOpen}
                onClose={closeValidationModal}
                onCancel={closeValidationModal}
                modalText={textInformation}
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            {itemsList.map((part: any) => (
                <tr key={`${part.id}`}>
                    <td>
                        <IconContext.Provider value={{className: 'react-icons'}}>
                            <button onClick={() => deletePart(part.id)}><TbX/></button>
                        </IconContext.Provider>
                    </td>
                    <TableForm
                        initialValues={part}
                        onSubmit={async (values, reset) => {
                            if (values.name === '') {
                                openValidationModal();
                                reset();
                            } else {
                                dispatch(editPartOfPlan(values, reset, setDemoModalIsOpen, setInformationModalIsOpen) as any);
                                dispatch(itemsActions.updateItem(values));
                            }
                        }}
                        actionType={Status.Save}
                        isEdited={isEdited}
                    />
                    <td>
                        <IconContext.Provider value={{className: 'react-icons'}}>
                            {children}
                        </IconContext.Provider>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableElements;