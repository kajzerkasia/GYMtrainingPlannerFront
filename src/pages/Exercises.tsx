import React, {useEffect} from 'react';
import {TableBody} from "../components/Table/TableBody";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "../store/actions/exercises/fetching-action";
import UseExercisesActions from "../hooks/actionHooks/useExercisesActions";
import {RootState} from "../store";
import {DemoSign} from "../components/DemoSign/DemoSign";
import BackButton from "../components/BackButton/BackButton";
import ExercisesTableHead from "../components/Table/ExercisesTableHead";
import Table from "../components/Table/Table/Table";
import {ExerciseEntity} from "../constants/types";
import FlexContainer from "../components/FlexContainer/FlexContainer";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";

const Exercises = () => {

    const params = useParams();
    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchExercises(params));
        }
    }, [dispatch, params]);

    const {handleSubmit, handleUpdate, handleDelete} = UseExercisesActions();

    const {itemsList} = useSelector((state: RootState) => state.items);

    const availableFields = itemsList && itemsList.length > 0
        ? ['order', 'name', 'series', 'repetitions', 'pause', 'tips', 'url']
        : ['order', 'name', 'series', 'repetitions', 'pause', 'tips', 'url'];

    return (
        <FlexContainer>
            <DemoSign/>
            <Table>
                <ExercisesTableHead/>
                <TableBody
                    onSubmit={async (values, reset) => handleSubmit((values as unknown as ExerciseEntity), reset)}
                    onUpdate={async (values, reset) => handleUpdate((values as unknown as ExerciseEntity), reset)}
                    onDelete={handleDelete}
                    availableFields={availableFields}
                />
            </Table>
            <BackButton/>
        </FlexContainer>
    );
};

export default Exercises;