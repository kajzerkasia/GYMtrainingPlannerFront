import React from 'react';
import {IconContext} from "react-icons";
import {TbBarbell, TbDotsVertical, TbX} from "react-icons/tb";
import {TableForm} from "./TableForm";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {itemsActions} from "../../store/features/items/items-slice";
import UseModals from "../../hooks/useModals";
import {Status} from 'types';

interface ItemsListProps {
    handleUpdate: (values: Record<string, string>, reset: () => void) => void | Promise<void>;
    availableFields: (keyof Record<string, any>)[];
}

const ItemsList = ({availableFields, handleUpdate}: ItemsListProps) => {

    const {itemsList} = useSelector((state: RootState) => state.items);

    const dispatch = useDispatch();

    const {
        openConfirmDeleteModal,
        openValidationModal,
    } = UseModals();

    const deleteItem = (id: string | undefined) => {
        openConfirmDeleteModal();
        if (id) {
            dispatch(itemsActions.setConfirmDeleteItem(true));
            dispatch(itemsActions.setItemToDeleteId(id));
        }
    };

    return (
        <>
        {itemsList.map((item: any) => (
                <tr key={`${item.id}`}>
                    {!availableFields.every(field => ['length', 'frequency', 'schedule'].includes(field as string)) && (
                        <td>
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <button onClick={() => deleteItem(item.id)}><TbX/></button>
                            </IconContext.Provider>
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
                                    <IconContext.Provider value={{className: 'react-icons'}}>
                                        <Link to={`/exercises/${item.slug}`}><TbBarbell/></Link>
                                    </IconContext.Provider>
                                </td>
                            ) : (
                                <td className="dots" colSpan={1}>
                                    <IconContext.Provider value={{className: 'react-icons'}}>
                                        <Link to={`/plans/${item.slug}`}><TbDotsVertical/></Link>
                                    </IconContext.Provider>
                                </td>
                            )
                    ))}
                </tr>
            ))}
        </>
    );
};

export default ItemsList;