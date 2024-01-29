import React, {useEffect} from 'react';
import {Table} from "./Table";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "../store/actions/exercises/fetching/fetching-action";
import UseExercisesActions from "../hooks/useExercisesActions";
import {ExerciseEntity} from 'types';
import {RootState} from "../store";

const Exercises = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchExercises(params) as any);
        }
    }, [dispatch, params]);

    const {handleSubmit, handleUpdate, handleDelete} = UseExercisesActions();

    const tableHeader = (
        <tr>
            <td className="hidden"></td>
            <th className="tr-add">
                Kolejność
            </th>
            <th className="tr-add">
                Ćwiczenie
            </th>
            <th className="tr-add">
                Serie
            </th>
            <th className="tr-add">
                Powtórzenia
            </th>
            <th className="tr-add">
                Przerwa między seriami
            </th>
            <th className="tr-add">
                Wskazówki dotyczące ćwiczenia
            </th>
            <th className="tr-add">
                Poprawne wykonanie ćwiczenia (prawidłowy link)
            </th>
        </tr>
    )

    const {itemsList} = useSelector((state: RootState) => state.items);
    const availableFields = itemsList && itemsList.length > 0
        ? ['order', 'name', 'series', 'repetitions', 'pause', 'tips', 'url']
        : [];

    return (
        <Table
            onSubmit={async (values, reset) => handleSubmit((values as unknown as ExerciseEntity), reset)}
            onUpdate={async (values, reset) => handleUpdate((values as unknown as ExerciseEntity), reset)}
            onDelete={handleDelete}
            tableHeader={tableHeader}
            availableFields={availableFields}
        />
    );
};

export default Exercises;