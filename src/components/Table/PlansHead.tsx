import React from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbUserCircle} from "react-icons/tb";

const PlansHead = () => {
    return (
        <thead>
        <tr className="tr-add">
            <td className="training-plans" align="center" colSpan={3}>
                <h1 className="h1-plan">Plany treningowe</h1>
            </td>
            <td>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <Link to="/auth"><TbUserCircle/></Link>
                </IconContext.Provider>
            </td>
        </tr>
        </thead>
    );
};

export default PlansHead;