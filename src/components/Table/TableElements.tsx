import React, {ReactNode} from 'react';
import {IconContext} from "react-icons";
import {TbAlertTriangle, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {Status} from 'types';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Modal from "../Modal/Modal";
import {text, textInformation} from "../../constants/partsOfPlanTableTexts";
import UseModals from "../../hooks/useModals";
import {PartOfPlanEntity} from 'types';

interface TableElementsProps {
    children: ReactNode;
    handleUpdate: (values: PartOfPlanEntity, reset: () => void) => void | Promise<void>;
    handleDelete: () => void;
}

const TableElements = ({children, handleUpdate, handleDelete}: TableElementsProps) => {
    const dispatch = useDispatch();

    const {isEdited, itemsList} = useSelector((state: RootState) => state.items);

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
            {itemsList.map((part: any) => (
                <tr key={`${part.id}`}>
                    <td>
                        <IconContext.Provider value={{className: 'react-icons'}}>
                            <button onClick={() => deleteItem(part.id)}><TbX/></button>
                        </IconContext.Provider>
                    </td>
                    <TableForm
                        initialValues={part}
                        onSubmit={async (values, reset) => {
                            if (values.name === '') {
                                openValidationModal();
                                reset();
                            } else {
                                handleUpdate(values, reset);
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