import React, {ReactNode} from 'react';
import {IconContext} from "react-icons";
import {TbAlertTriangle, TbBarbell, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {Status} from 'types';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Modal from "../Modal/Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import UseModals from "../../hooks/useModals";
import {Link} from "react-router-dom";

interface TableElementsProps {
    children?: ReactNode;
    handleUpdate: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    handleDelete: () => void;
    firstLinkPath?: string;
    availableFields: (keyof Record<string, any>)[];
}

const TableElements = ({handleUpdate, handleDelete, firstLinkPath, availableFields}: TableElementsProps) => {
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
            {itemsList.map((item: any) => (
                <tr key={`${item.id}`}>
                    <td>
                        <IconContext.Provider value={{className: 'react-icons'}}>
                            <button onClick={() => deleteItem(item.id)}><TbX/></button>
                        </IconContext.Provider>
                    </td>
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
                    <td>
                        <IconContext.Provider value={{className: 'react-icons'}}>
                            <Link to={`/${firstLinkPath}/${item.slug}`}><TbBarbell/></Link>
                        </IconContext.Provider>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableElements;