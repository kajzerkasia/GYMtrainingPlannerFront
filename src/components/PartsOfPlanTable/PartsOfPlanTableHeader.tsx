import React from 'react';
import {IconContext} from "react-icons";
import {Link, useParams} from "react-router-dom";
import {TbDotsVertical} from "react-icons/tb";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
const PartsOfPlanTableHeader = () => {

    const {itemsList} = useSelector((state: RootState) => state.items);

    const params = useParams();

    const matchingItem = itemsList.find(item => item.slug === params.slug);
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