import React, {useEffect, useState} from 'react';
import {Table} from "./Table";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchExercises} from "../store/actions/exercises/fetching/fetching-action";
import UseExercisesActions from "../hooks/useExercisesActions";
import {ExerciseEntity} from 'types';
import {IconContext} from "react-icons";
import {TbLink} from "react-icons/tb";
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

    const initialValues = {
        order: '',
        name: '',
        series: '',
        repetitions: '',
        pause: '',
        tips: '',
        url: '',
    }

    const [values, setValues] = useState<ExerciseEntity>(() => initialValues);

    const handleChange: (field: keyof ExerciseEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    const {isEdited} = useSelector((state: RootState) => state.items);

    const inputs = (
        <>
            <td className="exercise-order">
                <input
                    placeholder="Kolejność"
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="order"
                    value={values.order}
                    onChange={(event) => handleChange('order', event.target.value)}
                />
            </td>
            <td className="exercise-name">
                <input
                    placeholder="Ćwiczenie"
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
            </td>
            <td className="exercise-series">
                <input
                    placeholder="Serie"
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="series"
                    value={values.series}
                    onChange={(event) => handleChange('series', event.target.value)}
                />
            </td>
            <td className="exercise-repetitions">
                <input
                    placeholder="Powtórzenia"
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="repetitions"
                    value={values.repetitions}
                    onChange={(event) => handleChange('repetitions', event.target.value)}
                />
            </td>
            <td className="exercise-pause">
                <input
                    placeholder="Długość przerwy"
                    className={isEdited ? 'edited-input-exercise' : 'input-exercise'}
                    type="text"
                    name="pause"
                    value={values.pause}
                    onChange={(event) => handleChange('pause', event.target.value)}
                />
            </td>
            <td className="exercise-tips">
                <textarea
                    placeholder="Wskazówki dotyczące ćwiczenia"
                    className={isEdited ? 'edited-exercise-textarea' : 'exercise-textarea'}
                    name="tips"
                    value={values.tips}
                    onChange={(event) => handleChange('tips', event.target.value)}
                />
            </td>
            <td className="exercise-url">
                <input
                    placeholder="RedirectLink do filmu instruktażowego"
                    className={isEdited ? 'edited-input-exercise-url' : 'input-exercise input-url'}
                    type="url"
                    name="url"
                    value={values.url}
                    onChange={(event) => handleChange('url', event.target.value)}
                />
                <div className="exercise-link">
                    <label htmlFor="url"></label>
                    <a
                        href={values.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {/*{actionType === Status.Add || !values.url ? '' :*/}
                            <IconContext.Provider value={{className: 'react-icons-link'}}>
                                <TbLink/>
                            </IconContext.Provider>
                        {/*}*/}
                    </a>
                </div>
            </td>
        </>
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