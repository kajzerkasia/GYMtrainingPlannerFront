import React from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbDotsVertical} from "react-icons/tb";
import {PlanEntity} from 'types';

interface PartsOfPlanTableHeaderProps {
    params: Record<string, string | undefined>;
    itemsList: PlanEntity[];
}
const PartsOfPlanTableHeader = ({params, itemsList}: PartsOfPlanTableHeaderProps) => {

    const matchingItem = itemsList.find(item => item.slug === params.slug);
    console.log(itemsList);
    const firstItemName = matchingItem ? matchingItem.name : "Brak nazwy";


    return (
        <>
            <tr className="tr-add">
                <td colSpan={3} className="training-plan">
                    <h1 className="h1-plan">{firstItemName}</h1>
                </td>
                <td className="dots" colSpan={1}>
                    <IconContext.Provider value={{className: 'react-icons-dots'}}>
                        <Link to={`/details/${params.slug}`}><TbDotsVertical/></Link>
                    </IconContext.Provider>
                </td>
            </tr>
        </>
    );
};

export default PartsOfPlanTableHeader;