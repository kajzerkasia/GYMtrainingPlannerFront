import './Table.css';
import {DemoSign} from "../components/DemoSign/DemoSign";
import TableElements from "../components/Table/TableElements";
import AddTableElements from "../components/Table/AddTableElements";
import TableHeader from "../components/Table/TableHeader";
import React from "react";
import RedirectLink from "../components/RedirectLink";
import {PartOfPlanEntity, ExerciseEntity} from 'types';

export interface LinkProps {
    icon: React.ComponentType<any>;
    path: string;
}

interface TableProps {
    links?: LinkProps[];
    onSubmit: (values: PartOfPlanEntity | ExerciseEntity, reset: () => void) => void | Promise<void>;
    onUpdate: (values: PartOfPlanEntity | ExerciseEntity, reset: () => void) => void | Promise<void>;
    onDelete: () => void;
    firstLinkPath?: string;
    tableHeader?: any;
}

export const Table = ({links, onSubmit, onUpdate, onDelete, firstLinkPath, tableHeader}: TableProps) => {

    const renderLink = (link: LinkProps) => (
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
                        {tableHeader}
                    </TableHeader>
                    </thead>
                    <tbody>
                    <AddTableElements
                        handleSubmit={onSubmit}
                    >
                        {links && renderLink(links[1])}
                    </AddTableElements>
                    <TableElements
                        handleUpdate={onUpdate}
                        handleDelete={onDelete}
                        firstLinkPath={firstLinkPath}
                    >
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

