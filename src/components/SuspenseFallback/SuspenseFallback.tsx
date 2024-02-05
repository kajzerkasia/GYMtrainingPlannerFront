import React from 'react';
import {MoonLoader} from "react-spinners";

const SuspenseFallback = () => {
    return (
        <tr className="suspense-tr">
            <td className="suspense-td">
                <div className="div_loading">Ładowanie...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
            </td>
        </tr>
    );
};

export default SuspenseFallback;