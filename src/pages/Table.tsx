import './Table.css';
import {DemoSign} from "../components/DemoSign/DemoSign";
import TableElements from "../components/Table/TableElements";
import AddTableElements from "../components/Table/AddTableElements";
import TableHeader from "../components/Table/TableHeader";
import React from "react";
import RedirectLink from "../components/RedirectLink";
import {PartOfPlanEntity} from 'types';

interface Link {
    icon: React.ComponentType<any>;
    path: string;
}

interface TableProps {
    links: Link[];
    onSubmit: (values: PartOfPlanEntity, reset: () => void) => void | Promise<void>;
}

export const Table = ({links, onSubmit}: TableProps) => {

    const renderLink = (link: Link) => (
        <RedirectLink
            icon={React.createElement(link.icon)}
            path={link.path}
        />
    );

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <thead>
                    <TableHeader>
                        {renderLink(links[0])}
                    </TableHeader>
                    </thead>
                    <tbody>
                    <AddTableElements
                        handleSubmit={onSubmit}
                    >
                        {renderLink(links[1])}
                    </AddTableElements>
                    <TableElements>
                        {renderLink(links[2])}
                    </TableElements>
                    </tbody>
                </table>
                <button className="btn-back-exercises" onClick={() => window.history.back()}>
                    Powrót
                </button>
            </div>
        </div>
    )
}

