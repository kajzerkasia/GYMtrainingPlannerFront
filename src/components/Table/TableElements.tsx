import React, {ReactNode} from 'react';
import {TbAlertTriangle, TbBarbell, TbDotsVertical, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Modal from "../Modal/Modal";
import {modalDeleteText, modalDemoText, modalTextMoreElementsEdit, modalTextSingleElementEdit} from "../../constants/tableModalTexts";
import useValidationModal from "../../hooks/modals/useValidationModal";
import {Link} from "react-router-dom";
import {getAuthToken} from "../../helpers/auth";
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";
import useConfirmDeleteModal from "../../hooks/modals/useConfirmDeleteModal";
import {Status} from "../../constants/types";
import {useDemoModal} from "../../hooks/modals/useDemoModal";

interface TableElementsProps {
    children?: ReactNode;
    handleUpdate: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    handleDelete: () => void;
    availableFields: (keyof Record<string, any>)[];
}

const TableElements = ({handleUpdate, handleDelete, availableFields}: TableElementsProps) => {
    const dispatch = useDispatch();

    const {itemsList} = useSelector((state: RootState) => state.items);

    const {
        isValidationModalOpen,
        closeValidationModal,
        openValidationModal,
    } = useValidationModal();

    const {
        isConfirmDeleteModalOpen,
        closeConfirmDeleteModal,
        openConfirmDeleteModal
    } = useConfirmDeleteModal();

    const {
        demoModalIsOpen,
        closeDemoModal,
        openDemoModal
    } = useDemoModal();

    const handleConfirmDelete = async () => {
        handleDelete();
    };

    const deleteItem = (id: string | undefined) => {
        openConfirmDeleteModal();
        if (id) {
            dispatch(itemsActions.setConfirmDeleteItem(true));
            dispatch(itemsActions.setItemToDeleteId(id));
        }
    };

    const token = getAuthToken();

    return (
        <>
            <Modal
                open={demoModalIsOpen}
                onClose={closeDemoModal}
                onCancel={closeDemoModal}
                modalText={modalDemoText}
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <Modal
                open={isConfirmDeleteModalOpen}
                onClose={closeConfirmDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirmDeleteModal}
                modalText={modalDeleteText}
                confirmText="Tak"
                cancelText="Nie"
                icon={TbAlertTriangle}
            />
            <Modal
                open={isValidationModalOpen}
                onClose={closeValidationModal}
                onCancel={closeValidationModal}
                modalText={
                    availableFields.length === 1
                        ? modalTextSingleElementEdit
                        : modalTextMoreElementsEdit
                }
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            {itemsList.map((item: any) => (
                <tr key={`${item.id}`}>
                    {!availableFields.every(field => ['length', 'frequency', 'schedule'].includes(field as string)) && (
                        <TableData>
                            <button onClick={() => deleteItem(item.id)}>
                                <IconProvider>
                                    <TbX/>
                                </IconProvider>
                            </button>
                        </TableData>
                    )}
                    <TableForm
                        initialValues={item}
                        onSubmit={async (values, reset) => {
                            const allValues = Object.values(values);
                            const allValuesDefined = allValues.every(value => value !== undefined && value !== '');
                            if (allValuesDefined) {
                                handleUpdate(values, reset);
                            } else {
                                openValidationModal();
                                reset();
                            }
                        }}
                        actionType={Status.Save}
                        availableFields={availableFields}

                    />
                    {(availableFields.length === 1 && availableFields[0] === 'name' && (
                        'planId' in item ?
                            (
                                <TableData>
                                    <Link to={`/exercises/${item.slug}`}>
                                        <IconProvider>
                                            <TbBarbell/>
                                        </IconProvider>
                                    </Link>
                                </TableData>
                            ) : (
                                <TableData>
                                    <Link to={`${!token ? `/auth?mode=login` : `/plans/${item.slug}`}`}>
                                        <IconProvider>
                                            <TbDotsVertical/>
                                        </IconProvider>
                                    </Link>
                                </TableData>
                            )
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableElements;