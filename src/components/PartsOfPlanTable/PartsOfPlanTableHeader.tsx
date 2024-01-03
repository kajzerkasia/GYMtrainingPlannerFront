import React from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbDotsVertical} from "react-icons/tb";

interface PartsOfPlanTableHeaderProps {
    params: Record<string, string | undefined>;
}
const PartsOfPlanTableHeader = ({params}: PartsOfPlanTableHeaderProps) => {
    return (
        <>
            <tr className="tr-add">
                <td colSpan={3} className="training-plan">
                    <h1 className="h1-plan">Nazwa planu treningowego (TODO)</h1>
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