import React from 'react';
import {IconContext} from "react-icons";
import RedirectLink from "../RedirectLink";
import {TbDotsVertical} from "react-icons/tb";
import {useParams} from "react-router-dom";

const PartsOfPlanTableHead = () => {
    const params = useParams();

    return (
        <thead>
        <tr className="tr-add">
            <td colSpan={3} className="training-plan">
                <h1 className="h1-plan">Nazwa planu</h1>
            </td>
            <td className="dots" colSpan={1}>
                <IconContext.Provider value={{className: 'react-icons-dots'}}>
                    <RedirectLink
                        icon={React.createElement(TbDotsVertical)}
                        path={`/details/${params.slug}`}
                    />
                </IconContext.Provider>
            </td>
        </tr>
        </thead>
    );
};

export default PartsOfPlanTableHead;