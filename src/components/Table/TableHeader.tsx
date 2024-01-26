import React from 'react';
import {IconContext} from "react-icons";
const TableHeader = ({children}: any) => {

    return (
        <>
            <tr className="tr-add">
                <td colSpan={3} className="training-plan">
                    <h1 className="h1-plan">Nazwa planu/części planu-TODO</h1>
                </td>
                <td className="dots" colSpan={1}>
                    <IconContext.Provider value={{className: 'react-icons-dots'}}>
                        {children}
                    </IconContext.Provider>
                </td>
            </tr>
        </>
    );
};

export default TableHeader;