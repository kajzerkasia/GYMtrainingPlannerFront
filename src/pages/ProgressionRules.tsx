import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressionRules} from "../store/actions/progression-rules/fetching-action";
import {RootState} from "../store";
import UseProgressionRulesActions from "../hooks/actionHooks/useProgressionRulesActions";
import {DemoSign} from "../components/DemoSign/DemoSign";
import {TableBody} from "../components/Table/TableBody";
import BackButton from "../components/BackButton/BackButton";
import {RuleEntity} from 'types';
import ProgressionRulesTableHead from "../components/Table/ProgressionRulesTableHead";

const ProgressionRules = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const {itemsList} = useSelector((state: RootState) => state.items);

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchProgressionRules(params) as any);
        }
    }, [dispatch, params]);

    const {handleSubmit, handleUpdate, handleDelete} = UseProgressionRulesActions();

    const availableFields = itemsList && itemsList.length > 0
        ? ['rule']
        : ['rule'];

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <ProgressionRulesTableHead/>
                    <TableBody
                        onSubmit={async (values, reset) => handleSubmit((values as unknown as RuleEntity), reset)}
                        onUpdate={async (values, reset) => handleUpdate((values as unknown as RuleEntity), reset)}
                        onDelete={handleDelete}
                        availableFields={availableFields}
                    />
                </table>
                <BackButton/>
            </div>
        </div>
    )
};

export default ProgressionRules;