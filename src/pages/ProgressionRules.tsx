import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressionRules} from "../store/actions/progression-rules/fetching-action";
import {RootState} from "../store";
import useProgressionRulesActions from "../hooks/actionHooks/useProgressionRulesActions";
import {DemoSign} from "../components/DemoSign/DemoSign";
import {TableBody} from "../components/Table/TableBody";
import BackButton from "../components/BackButton/BackButton";
import ProgressionRulesTableHead from "../components/Table/ProgressionRulesTableHead";
import Table from "../components/Table/Table/Table";
import {RuleEntity} from "../constants/types";
import FlexContainer from "../components/FlexContainer/FlexContainer";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";

const ProgressionRules = () => {

    const params = useParams();
    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const {itemsList} = useSelector((state: RootState) => state.items);

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchProgressionRules(params));
        }
    }, [dispatch, params]);

    const {handleSubmit, handleUpdate, handleDelete} = useProgressionRulesActions();

    const availableFields = itemsList && itemsList.length > 0
        ? ['rule']
        : ['rule'];

    return (
        <FlexContainer>
            <DemoSign/>
            <Table>
                <ProgressionRulesTableHead/>
                <TableBody
                    onSubmit={async (values, reset) => handleSubmit((values as unknown as RuleEntity), reset)}
                    onUpdate={async (values, reset) => handleUpdate((values as unknown as RuleEntity), reset)}
                    onDelete={handleDelete}
                    availableFields={availableFields}
                />
            </Table>
            <BackButton/>
        </FlexContainer>
    )
};

export default ProgressionRules;