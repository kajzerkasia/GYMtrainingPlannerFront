import React from 'react';
import RedirectLink from "../RedirectLink";
import {TbDotsVertical} from "react-icons/tb";
import {useParams} from "react-router-dom";
import IconProvider from "../IconProvider/IconProvider";

const PartsOfPlanTableHead = () => {
    const params = useParams();

    return (
        <thead>
        <tr>
            <td colSpan={3}>
                <h1>Nazwa planu</h1>
            </td>
            <td colSpan={1}>
                <IconProvider>
                    <RedirectLink
                        icon={React.createElement(TbDotsVertical)}
                        path={`/details/${params.slug}`}
                    />
                </IconProvider>
            </td>
        </tr>
        </thead>
    );
};

export default PartsOfPlanTableHead;