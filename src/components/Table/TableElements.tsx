import React, {ReactNode} from 'react';
import {TbAlertTriangle, TbBarbell, TbDotsVertical, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {Status} from 'types';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Modal from "../Modal/Modal";
import {modalDeleteText, modalTextMoreElementsEdit, modalTextSingleElementEdit} from "../../constants/tableModalTexts";
import UseModals from "../../hooks/useModals";
import {Link} from "react-router-dom";
import {getAuthToken} from "../../helpers/auth";
import IconProvider from "../IconProvider/IconProvider";

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
        isConfirmDeleteModalOpen,
        isValidationModalOpen,
        closeValidationModal,
        closeConfirmDeleteModal,
        openConfirmDeleteModal,
        openValidationModal,
    } = UseModals();

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
                        <td>
                            <IconProvider>
                                <button onClick={() => deleteItem(item.id)}><TbX/></button>
                            </IconProvider>
                        </td>
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
                                <td>
                                    <IconProvider>
                                        <Link to={`/exercises/${item.slug}`}><TbBarbell/></Link>
                                    </IconProvider>
                                </td>
                            ) : (
                                <td className="dots" colSpan={1}>
                                    <IconProvider>
                                        <Link to={`${!token ? `/auth?mode=login` : `/plans/${item.slug}`}`}><TbDotsVertical/></Link>
                                    </IconProvider>
                                </td>
                            )
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableElements;