import React from 'react';
import {IconContext} from "react-icons";
import {TbBarbell, TbX} from "react-icons/tb";
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {itemsActions} from "../../store/features/items/items-slice";
import {Link} from "react-router-dom";
import {Status} from 'types';
import {useDispatch} from "react-redux";
import {PartOfPlanEntity} from 'types';

interface PartsOfPlanElementsProps {
    itemsList: PartOfPlanEntity[];
    isEdited: boolean;
    handleEditPartOfPlan: (values: PartOfPlanEntity, reset: () => void) => void;
    deletePart: (partId: string | undefined) => void;
}
const PartsOfPlanElements = ({ itemsList, isEdited, handleEditPartOfPlan, deletePart }: PartsOfPlanElementsProps) => {
    const dispatch = useDispatch();

    return (
        <>
            {itemsList.map((part: any) => (
                <tr key={`${part.id}`}>
                    <td>
                        <IconContext.Provider value={{ className: 'react-icons' }}>
                            <button onClick={() => deletePart(part.id)}><TbX /></button>
                        </IconContext.Provider>
                    </td>
                    <PartsOfPlanForm
                        initialValues={part}
                        onSubmit={async (values, reset) => {
                            handleEditPartOfPlan(values, reset);
                            dispatch(itemsActions.updatePartOfPlan(values));
                        }}
                        actionType={Status.Save}
                        isEdited={isEdited}
                    />
                    <td>
                        <IconContext.Provider value={{ className: 'react-icons' }}>
                            <Link to={`/exercises/${part.slug}`}><TbBarbell /></Link>
                        </IconContext.Provider>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default PartsOfPlanElements;